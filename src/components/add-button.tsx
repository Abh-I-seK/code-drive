import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { PlusSquare } from "lucide-react";
import NewFileButton from "./new-file";
import NewFolderButton from "./new-folder";

export default function AddButton(props:{currentFolder : number, user : string}) {

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <PlusSquare className="w-5"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <NewFileButton currentFolder={props.currentFolder} user={props.user}/>
            <DropdownMenuSeparator/>
            {/* <DropdownMenuItem> */}
            <NewFolderButton currentFolder={props.currentFolder} user={props.user}/>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
    )
}