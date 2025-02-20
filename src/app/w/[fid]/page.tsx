import { getFileById } from "@/db/queries"
import { auth } from "@clerk/nextjs/server";
import { CodeEditor } from "../../../components/code-editor";
import {cache} from "react";
const getFileByIdCached = cache(async(fid : number,userId : string)=>{
  return await getFileById(fid,userId);
});

const authCached = cache(async()=>{
  return await auth();
});

export async function generateMetadata(props: { params: Promise<{ fid: string }> }) {
  const { fid } = await props.params
  const user = await authCached();

  if(!user.userId){
    return {
      title : "Log in !!"
    }
  }
  const parsedFid = parseInt(fid)
  if (isNaN(parsedFid)) {
    return {
      title : "fileNotFound"
    }
  }

  const f = await getFileByIdCached(parsedFid,user.userId);
  
  if(f.length === 0){
      return {
        title : "fileNotFound"
      }
  }

  return {
    title: "CodeDrive - " + f[0].name,
  }
}


export default async function (props: { params: Promise<{ fid: string }> }) {
    const { fid } = await props.params
    const user = await authCached();

    if(!user.userId){
        return <div>Not logged in</div>
    }
    const parsedFid = parseInt(fid)
    if (isNaN(parsedFid)) {
        return <div>Invalid file id</div>
    }

    const f = await getFileByIdCached(parsedFid,user.userId);

    if(f.length === 0){
        return <div>File not found</div>
    }

    const file = f[0]
    return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <CodeEditor value={file.code} file={file} height="500px" />
    </div>
  )
}