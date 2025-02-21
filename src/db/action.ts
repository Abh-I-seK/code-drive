"use server"
import { db } from "@/db/drizzle"
import { file_Table } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function updateVisibility(isPublic : boolean , fileId : number) {
    await db.update(file_Table).set({isPublic : isPublic}).where(eq(file_Table.id,fileId));
}

export async function saveFile(code : string , fileId : number) {
    await db.update(file_Table).set({code : code}).where(eq(file_Table.id,fileId));
}