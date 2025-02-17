import { getFileById } from "@/db/queries"
import { auth } from "@clerk/nextjs/server";
import { CodeEditor } from "../../../components/code-editor";

export default async function (props: { params: Promise<{ fid: string }> }) {
    const { fid } = await props.params
    const user = await auth();

    if(!user.userId){
        return <div>Not logged in</div>
    }

    const parsedFid = parseInt(fid)
    if (isNaN(parsedFid)) {
        return <div>Invalid file id</div>
    }

    const f = await getFileById(parsedFid,user.userId);

    if(f.length === 0){
        return <div>File not found</div>
    }

    const file = f[0]
    return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <CodeEditor value={file.code} file={file} height="500px" />
    </div>
  )
}