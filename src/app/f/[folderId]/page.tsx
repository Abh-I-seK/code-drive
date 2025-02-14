import GoogleDriveClone from "../../Drive-ui"
import { getFiles, getFolders,getParentFolder } from "@/lib/queries"

export default async function (props: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await props.params
  const parsedFolderId = parseInt(folderId)

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder id</div>
  }
  // same time at parallel
  const [files, folders , parents] = await Promise.all([getFiles(parsedFolderId), getFolders(parsedFolderId), getParentFolder(parsedFolderId)]);
  
  return (
    <>
      <GoogleDriveClone files={files} folders={folders} parents={parents} />
    </>
  )
}
