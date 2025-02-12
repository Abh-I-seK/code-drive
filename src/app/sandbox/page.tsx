// import { db } from "@/db/drizzle"
// import { file_Table, folder_Table } from "@/db/schema"
// // import { mockFiles, mockFolders } from "@/lib/mock-data"


// export default function Sandbox() {
//   return (
//     <div>
//         <h1>Sandbox</h1>
//         <form action={
//             async ()=>{
//                 "use server";
//             mockFiles.forEach(async(file)=>{
//                 const a = {
//                     name: file.name,
//                     url: file.url,
//                     parent: parseInt(file.parent) === 1 ? 1 : 0,
//                     size: file.size
//                 }
//                 await db.insert(file_Table).values(a);
//             })
//             mockFolders.forEach(async(folder)=>{
//                 const a = {
//                     name: folder.name,
//                     parent: parseInt(folder.parent) === 1 ? 1 : 0
//                 }
//                 await db.insert(folder_Table).values(a);
//             })
//         }}>
//         <button type="submit">Submit</button>
//         </form>
//     </div>
//   )
// }
