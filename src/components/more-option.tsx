'use client';
import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { file_type, folder_type } from "@/db/schema";
import { deleteAction } from "@/db/action";


export default function MoreOptions(props :{
    f : folder_type | file_type,
    folder : boolean ,
    par : number
}){

    return(
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async() => {
                deleteAction(props.f.id,props.folder,props.par);
              }}
            >
            <span className="flex gap-2 align-middle text-red-500"><Trash2 width={12} height={12}/> Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}