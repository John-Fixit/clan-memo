import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { EyeIcon } from "../../component/shared/svg_icons";
import MemoTopCards from "../../component/shared/topCards/MemoTopCards";
import ExpandedDrawer from "../../component/shared/drawer/ExpandedDrawer";
import SignMemo from "../../component/shared/signMemo/SignMemo";
import { useState } from "react";
import { data } from "../../component/core/dashboard/memoDoomyData";

const MyApproval = () => {
  const [open, setOpen] = useState({ status: false, role: null, memo: null });
  const [selectedMemo, setSelectedMemo] = useState("");

  const handleOpenDrawer = (role, memo) => {
    setOpen({ status: true, role: role });
    setSelectedMemo(memo);
  };

  const handleCloseDrawer = () => {
    setOpen({ status: false });
  };

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
          <Table
            aria-label="Example static collection table"
            className="w-full"
          >
            <TableHeader>
              <TableColumn className="text-sm opacity-70">Subject</TableColumn>
              <TableColumn className="text-sm opacity-70">FOLDER</TableColumn>
              <TableColumn className="text-sm opacity-70">
                DATE CREATED
              </TableColumn>
              <TableColumn className="text-sm opacity-70">ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[0.85rem] opacity-65">
                    {item?.subject}
                  </TableCell>
                  <TableCell className="text-[0.85rem] opacity-65">
                    General
                  </TableCell>
                  <TableCell className="text-[0.85rem] opacity-65">
                    2024-11-06
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => handleOpenDrawer("viewMemo", item)}
                    >
                      <EyeIcon />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <ExpandedDrawer
        isOpen={open.status}
        onClose={handleCloseDrawer}
        maxWidth={700}
      >
        <SignMemo
          memo={selectedMemo}
          // handleOpenDrawer={openDrawerFn}
        />
      </ExpandedDrawer>
    </>
  );
};

export default MyApproval;
