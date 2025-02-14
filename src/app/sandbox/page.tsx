import { addFile, addFolder } from "@/db/queries";
import { file_type } from "@/db/schema";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server"


export default async function Sandbox() {
    const user = await auth();
    if(!user.userId){
        return <SignedOut>
        <SignUpButton />
        <SignInButton />
    </SignedOut>
    }

  return (
    <div>
        <h1>Sandbox</h1>
        <form action={
            async (formData)=>{
                "use server";
                const name = formData.get("name") ?? ""; 
                const code = formData.get("code") ?? "";
                const language = formData.get("language") ?? "javascript";
                const parent = formData.get("parent") ?? "0";
                const ownerId = user.userId ?? "";
                // console.log(name,code,language,parent,ownerId);
                const a : any = {
                    name: name,
                    code: code,
                    language: language,
                    parent: parent,
                    ownerId: ownerId,
                    size: "2 MB"
                }
                await addFile(a);
            }
        }
        className="flex flex-col gap-4 m-10 border-2 border-black"
        >
        <input type="text" name="name" placeholder="Name" />
        <textarea name="code" placeholder="code"/>
        <select name="language">
            <option value="javascript">Javascript</option>
            <option value="python">Python</option>
            <option value="java">java</option>
        </select>
        <input type="number" name="parent" placeholder="parent"/> 
        <button type="submit">Submit</button>
        </form>
        <hr className="border-2 border-black my-5"></hr>
        <form action={
            async (formData)=>{
                "use server";
                const name = formData.get("name") ?? ""; 
                const parent = formData.get("parent") ?? "0";
                const ownerId = user.userId ?? "";
                const a : any = {
                    name: name,
                    parent: parent,
                    ownerId: ownerId,
                    size: "--"
                }
                await addFolder(a);
            }
        }
        className="flex flex-col gap-4 m-10 border-2 border-black"
        >
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="parent" placeholder="parent"/> 
        <button type="submit">Submit</button>
        </form>
        <hr className="border-2 border-black my-5"></hr>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </div>
  )
}
