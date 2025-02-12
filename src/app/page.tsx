import { db } from "@/db/drizzle"
import { file_Table,folder_Table } from "@/db/schema"
import { Folder as FolderType, File as FileType } from "@/lib/mock-data"
import GoogleDriveClone from "./Drive-ui"

export default async function(){
    const mockFiles : FileType[] = await db.select().from(file_Table);
    const mockFolders : FolderType[] = await db.select().from(folder_Table);

    return(
        <>
        <GoogleDriveClone files={mockFiles} folders={mockFolders} />
        </>
    )

}
