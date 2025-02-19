import { updateVisibility } from "@/db/queries";
import { Button } from "./ui/button";

export async function ButtonVisibility({isPublic,fileId} : {isPublic : boolean,fileId : number}){

    return(
        <form action={async(e)=>{
            "use server";
            console.log("ok hi from bv")
            await updateVisibility(isPublic,fileId);
        }}>
        <Button type="submit">Done</Button>
        </form>
    )
}