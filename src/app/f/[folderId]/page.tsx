import { db } from "@/db/drizzle"
import { file_Table, folder_Table } from "@/db/schema"
import GoogleDriveClone from "../../Drive-ui"
import { eq } from "drizzle-orm"
import { Folder as FolderType } from "@/lib/mock-data"

async function getParentFolder(folderId: number) {
  const parents : FolderType[] = []
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

export default async function (props: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await props.params
  const parsedFolderId = parseInt(folderId)

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder id</div>
  }

  const filesPromise = db.select().from(file_Table).where(eq(file_Table.parent,parsedFolderId));
  const folderPromise = db.select().from(folder_Table).where(eq(folder_Table.parent,parsedFolderId));
  const parentPromise = getParentFolder(parsedFolderId);

  // same time at parallel
  const [files, folders , parents] = await Promise.all([filesPromise, folderPromise,parentPromise]);
  
  return (
    <>
      <GoogleDriveClone files={files} folders={folders} parents={parents} />
    </>
  )
}
