import { auth } from "@clerk/nextjs/server";
import GoogleDriveClone from "../../Drive-ui"
import { getFiles, getFolders,getParentFolder } from "@/db/queries"
import { Suspense } from "react";

export async function generateMetadata(props: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await props.params
  const user = await auth();

  if(!user.userId){
    return {
      title : "Log in !!"
    }
  }
  const parsedFolderId = parseInt(folderId)

  if (isNaN(parsedFolderId)) {
    return {
      title : "folderNotFound"
    }
  }
  const parents = await getParentFolder(parsedFolderId,user.userId);
  if(parents.length === 0){
    return {
      title : "CodeDrive"
    }
  }
  return {
    title: "CodeDrive - " + parents[parents.length-1].name,
  }
}

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
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleDriveClone files={files} folders={folders} parents={parents} user={user.userId} currentFolder={parsedFolderId}/>
    </Suspense>
  )
}
