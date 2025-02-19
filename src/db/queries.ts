"server-only";
import { db } from "@/db/drizzle"
import { file_Table, folder_Table } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { folder_type,file_type } from "@/db/schema";
import axios from "axios";

export async function addFile(file: file_type) {
  return await db.insert(file_Table).values(file);
}

export async function addFolder(folder: folder_type) {
  return await db.insert(folder_Table).values(folder);
}

export function getFiles(folderId: number , ownerId: string) {
    return db.select().from(file_Table).where(and(eq(file_Table.parent,folderId),eq(file_Table.ownerId,ownerId)));
}

export function getFolders(folderId: number , ownerId: string) {
    return db.select().from(folder_Table).where(and(eq(folder_Table.parent,folderId),eq(folder_Table.ownerId,ownerId)));
}

export const getPublicFileById = (fileId:number)=>{
  return db.select().from(file_Table).where(and(eq(file_Table.id,fileId),eq(file_Table.isPublic,true)));
}

// should I cache ??
export const getFileById = ((fileId: number , ownerId: string) => {
    return db.select().from(file_Table).where(and(eq(file_Table.id,fileId),eq(file_Table.ownerId,ownerId)));
})

export async function updateVisibility(isPublic : boolean , fileId : number) {
  return await db.update(file_Table).set({isPublic : isPublic}).where(eq(file_Table.id,fileId));
}

export async function getParentFolder(folderId: number , ownerId: string) {
    const parents : folder_type[] = []
    let currentId : number | null = folderId
    while (currentId !== 0) {
      if(currentId === null){
        return parents;
      }
      const folder = await db.select().from(folder_Table).where(and(eq(folder_Table.id,currentId),eq(folder_Table.ownerId,ownerId)));
      if (folder.length > 0) {
        parents.unshift(folder[0])
        currentId = folder[0].parent
      }else{
          throw new Error("Parent Folder Not Found !!");
      }
    }
    return parents
}

export async function Code_Runner(code : string , language : string) {
  const src_code = btoa(code);
  let langId = 0;
  switch(language){
    case "java":
      langId = 91
      break;
    case "c++":
      langId = 53
      break;
    case "python":
      langId = 92
      break;
    case "javascript":
      langId = 93
      break;
  }
  const rapidAPI = options(langId , src_code);
  const response = await axios.request(rapidAPI);
  const output : string = atob(response.data.stdout);
  return output; 
}

function options(language_id: number, source_code: string, stdin? : string ) {
  stdin = stdin ?? "";
  const opt ={
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
      base64_encoded: 'true',
      wait: 'true'
      },
      headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RapidAPI_KEY,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RapidAPI_HOST
      },
      data: {
      language_id: language_id,
      source_code: source_code,
      stdin: stdin
      }
  };
  return opt;
}