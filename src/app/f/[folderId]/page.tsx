import { auth } from "@clerk/nextjs/server";
import GoogleDriveClone from "../../Drive-ui"
import { getFiles, getFolders,getParentFolder } from "@/db/queries"

export default async function (props: {
  params: Promise<{ folderId: string }>
}) {

  const user = await auth();
  if(!user.userId){
    return <div>Not logged in</div>
  }

  const { folderId } = await props.params
  const parsedFolderId = parseInt(folderId)

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder id</div>
  }
  // same time at parallel
  const [files, folders , parents] = await Promise.all([getFiles(parsedFolderId,user.userId), getFolders(parsedFolderId,user.userId), getParentFolder(parsedFolderId,user.userId)]);
  
  return (
    <>
      <GoogleDriveClone files={files} folders={folders} parents={parents} />
    </>
  )
}
