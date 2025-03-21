import { auth } from "@clerk/nextjs/server";
import GoogleDriveClone from "../../Drive-ui"
import { getFiles, getFolders,getParentFolder } from "@/db/queries"
import { Suspense } from "react";
import { cache } from "react";
import Link from "next/link";
import FolderSkeleton from "@/components/Folder-Skeleton";

const authCached = cache(async()=>{
  return await auth();
});

const getParentFolderCached = cache(async(folderId : number,userId : string)=>{
  return await getParentFolder(folderId,userId);
});

export async function generateMetadata(props: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await props.params
  const user = await authCached();

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
  const parents = await getParentFolderCached(parsedFolderId,user.userId);
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

  const user = await authCached();
  if(!user.userId){
    return <div className="p-50 flex justify-center">Not logged in Go {" "} <Link href={"/"} className="text-blue-700 underline">Here !!</Link></div>
  }

  const { folderId } = await props.params
  const parsedFolderId = parseInt(folderId)

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder id</div>
  }
  // same time at parallel
  const [files, folders , parents] = await Promise.all([getFiles(parsedFolderId,user.userId), getFolders(parsedFolderId,user.userId), getParentFolderCached(parsedFolderId,user.userId)]);
  
  return (
    <Suspense fallback={<FolderSkeleton/>}>
      <GoogleDriveClone files={files} folders={folders} parents={parents} user={user.userId} currentFolder={parsedFolderId}/>
    </Suspense>
  )
}
