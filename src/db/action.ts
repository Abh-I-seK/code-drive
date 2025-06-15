"use server"
import { db } from "@/db/drizzle"
import { file_Table, folder_Table } from "@/db/schema"
import { validateAndAddExtension } from "@/lib/utils"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { addFile, addFolder } from "./queries"
import {filesize} from "filesize"

export async function updateVisibility(isPublic: boolean, fileId: number) {
  await db
    .update(file_Table)
    .set({ isPublic: isPublic })
    .where(eq(file_Table.id, fileId))
}

export async function saveFile(code: string, fileId: number) {
  const bytes = Buffer.from(code).length;
  const newSize = filesize(bytes,{standard: "jedec"})
  await db
    .update(file_Table)
    .set({ code: code , size : newSize})
    .where(eq(file_Table.id, fileId))
}

export async function addFileAction(
  formData: FormData,
  currentFolder: number,
  user: string
) {
  const lang = formData.get("language")
  const name = formData.get("name")

  if (!lang || !name) {
    return
  }

  let filename = ""
  try {
    filename = validateAndAddExtension(name.toString(), lang.toString())
  } catch (e) {
    console.log(e)
    return
  }

  if(filename.includes(".py") && lang.toString().toLowerCase() !== "python"){
    return;
  }
  if(filename.includes(".java") && lang.toString().toLowerCase() !== "java"){
    return;
  }
  if(filename.includes(".js") && lang.toString().toLowerCase() !== "javascript"){
    return;
  }
  if(filename.includes(".cpp") && lang.toString().toLowerCase() !== "c++"){
    return;
  }

  // fix type here
  const a: any = {
    name: filename,
    language: lang.toString(),
    parent: currentFolder,
    code: "",
    ownerId: user,
    size: "1 B",
  }
  // console.log(a);
  await addFile(a)
  revalidatePath("/f/" + currentFolder)
}

export async function addFolderAction(
  formData: FormData,
  currentFolder: number,
  user: string
) {
  const name = formData.get("name")

  if (!name) {
    return
  }

  // fix type here
  const a: any = {
    name: name.toString(),
    parent: currentFolder,
    ownerId: user,
    size: "--",
  }
  // console.log(a);
  await addFolder(a)
  revalidatePath("/f/" + currentFolder)
}

function deleteAllFilesForParent(folderId: number) {
  return db.delete(file_Table).where(eq(file_Table.parent, folderId))
}

function deleteAllFoldersForParent(folderId: number) {
  return db.delete(folder_Table).where(eq(folder_Table.parent, folderId))
}

function deleteFolder(folderId: number) {
  return db.delete(folder_Table).where(eq(folder_Table.id, folderId))
}

export async function deleteAction(id: number , folder : boolean , par:number){

  if(folder){
    await Promise.all([deleteAllFilesForParent(id),deleteAllFoldersForParent(id)])
    await deleteFolder(id)
  }else{
    await db.delete(file_Table).where(eq(file_Table.id, id))
  }

  revalidatePath("/f/" + par)
}

const getExtension = (filename:string) => {
  const parts = filename.split('.');
  if (parts.length <= 1 || (parts.length === 2 && parts[0] === '')) {
    return '';
  }
  return parts[parts.length - 1].toLowerCase();
};

export async function updateFileName(id: number, newName: string ,par:number,oldName:string) {
  if(getExtension(newName) !== getExtension(oldName)){
    return 3;
  }

  const filenameRegex = /^[A-Za-z_][A-Za-z0-9_]*\.(java|cpp|cc|cxx|h|hpp|hxx|py|js|jsx|mjs|cjs)$/;

  if (!filenameRegex.test(newName)) {
    // throw new Error("Enter a valid filename.");
    return 2;
  }

  await db
    .update(file_Table)
    .set({ name: newName })
    .where(eq(file_Table.id, id))
  
  revalidatePath("/f/" + par);
  return 1;
    
}