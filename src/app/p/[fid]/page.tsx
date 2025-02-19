import { getPublicFileById } from "@/db/queries"
import { CodeEditor } from "../../../components/code-editor";
import {cache} from "react";
const getPublicFileByIdCached = cache(async(fid : number)=>{
  return await getPublicFileById(fid);
});


export async function generateMetadata(props: { params: Promise<{ fid: string }> }) {
  const { fid } = await props.params

  const parsedFid = parseInt(fid)
  if (isNaN(parsedFid)) {
    return {
      title : "fileNotFound"
    }
  }

  const f = await getPublicFileByIdCached(parsedFid);
  
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
    
    const parsedFid = parseInt(fid)
    if (isNaN(parsedFid)) {
        return <div>Invalid file id</div>
    }

    const f = await getPublicFileByIdCached(parsedFid);

    if(f.length === 0){
        return <div>File not found</div>
    }

    const file = f[0]
    return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <CodeEditor value={file.code} file={file} height="500px" publicFile={true}/>
    </div>
  )
}