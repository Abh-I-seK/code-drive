"use client";
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { updateFileName } from "@/db/action";

export default function UpdateButton(props: { oldName: string, id:number , par:number }) {
    const [name , setName] = useState(props.oldName);
    const [updating , setUpdating] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        type="button"
        className="px-1 py-0 mr-1 text-muted-foreground hover:text-foreground flex gap-2 items-center"
      >
        <span className="flex gap-2 align-middle">
          <Edit width={12} height={12} /> Rename
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename</DialogTitle>
          <DialogDescription>write the new name</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              File Name
            </Label>
            <Input
              name="name"
              id="name"
              className="col-span-3"
              required={true}
              defaultValue={props.oldName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={async()=>{
            setUpdating(true)
            const res = await updateFileName(props.id,name,props.par,props.oldName)
            setUpdating(false)
            if(res === 2){
                alert("Invalid filename !!")
                return;
            }
            if(res === 3){
                alert("Do not change the language !!")
                return;
            }
          }}
          className={`${updating ? "cursor-not-allowed" : "cursor-pointer"}`}
          >Rename
          {updating && "..."} 
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
