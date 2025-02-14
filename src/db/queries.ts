"server-only";
import { db } from "@/db/drizzle"
import { file_Table, folder_Table } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { folder_type,file_type } from "@/db/schema";


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

export function getFileById(fileId: number , ownerId: string) {
    return db.select().from(file_Table).where(and(eq(file_Table.id,fileId),eq(file_Table.ownerId,ownerId)));
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
