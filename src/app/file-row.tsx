import {file_type} from "../db/schema";
import {
  FileIcon,
} from "lucide-react"
import Link from "next/link"
import PythonIcon from "../../public/Python";
import JavaIcon from "../../public/Java";
import JavascriptIcon from "../../public/Javascript";
import CppIcon from "../../public/Cpp";

export function IconSelector(props: { icon: string }) {
  switch (props.icon) {
    case "python":
      return <PythonIcon />
    case "java":
      return <JavaIcon />
    case "javascript":
      return <JavascriptIcon />
    case "c++":
      return <CppIcon />
  }
}

export function FileRow(props: { f: file_type }) {
    const file = props.f
    return (
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6 flex items-center">
          <Link
            target="_blank"
            href={`/w/${file.id}`}
            className="flex items-center text-foreground hover:text-blue-400"
          >
            <span className="mr-3">
            <IconSelector icon={file.language} />
            </span>
            {/* <FileIcon className="mr-3" size={20} /> */}
            {file.name}
          </Link>
        </div>
        <div className="col-span-3 text-muted-foreground">{"File"}</div>
        <div className="col-span-3 text-muted-foreground">{"2 MB"}</div>
      </div>
    )
}