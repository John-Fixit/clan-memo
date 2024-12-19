import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { EyeIcon } from "../../component/shared/svg_icons"
import MemoTopCards from "../../component/shared/topCards/MemoTopCards"

const MyApproval = () => {
  return (
    <>
        <main>
            <MemoTopCards
                    //   memos={data}
                    //   setSelected={setSelected}
                    //   selected={selected}
                      grid={4}
                    />
        <div className="bg-white shadow rounded-xl p-3 mt-5">
            <Table aria-label="Example static collection table" className="w-full">
            <TableHeader>
                <TableColumn className="text-sm opacity-70">NAME</TableColumn>
                <TableColumn className="text-sm opacity-70">FOLDER</TableColumn>
                <TableColumn className="text-sm opacity-70">DATE CREATED</TableColumn>
                <TableColumn className="text-sm opacity-70">ACTION</TableColumn>
            </TableHeader>
            <TableBody>
                {[1, 2, 3, 4, 5].map((item, index) => (
                <TableRow key={index}>
                    <TableCell className="text-[0.85rem] opacity-65">Tony Reichert</TableCell>
                    <TableCell className="text-[0.85rem] opacity-65">General</TableCell>
                    <TableCell className="text-[0.85rem] opacity-65">2024-11-06</TableCell>
                    <TableCell>
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                  <EyeIcon />
                                </span>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
        </main>
    </>
  )
}

export default MyApproval