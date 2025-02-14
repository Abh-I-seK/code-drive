"server-only";
import { db } from "@/db/drizzle"
import { file_Table, folder_Table } from "@/db/schema"
import { eq } from "drizzle-orm"
import { folder_type } from "@/db/schema";


export function getFiles(folderId: number) {
    return db.select().from(file_Table).where(eq(file_Table.parent,folderId));
}

export function getFolders(folderId: number) {
    return db.select().from(folder_Table).where(eq(folder_Table.parent,folderId));
}

export async function getParentFolder(folderId: number) {
    const parents : folder_type[] = []
    let currentId : number | null = folderId
    while (currentId !== 0) {
      if(currentId === null){
        return parents;
      }
      const folder = await db.select().from(folder_Table).where(eq(folder_Table.id,currentId));
      if (folder.length > 0) {
        parents.unshift(folder[0])
        currentId = folder[0].parent
      }else{
          throw new Error("Parent Folder Not Found !!");
      }
    }
    return parents
}
