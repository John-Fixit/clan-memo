import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Button, ConfigProvider } from "antd";
import { DeleteIcon, EditIcon, EyeIcon } from "../../shared/svg_icons";

const Action = () => {
  return (
    <div className="relative flex items-center gap-2">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EyeIcon />
        </span>
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span>
    </div>
  );
};

const RecentMemo = () => {
  return (
    <>
     <div className="col-span-2 py-3 mt-4">
        <div className="flex justify-between items-center px-5">
            <div>
            <h3 className="text-[14px] text-black tracking-[0.5px] leading-[22px]">
                <span>Recent Memo</span>
            </h3>
            </div>
            <ConfigProvider
            theme={{
                components: {
                Button: {
                    defaultHoverBorderColor: "#DDE4F0",
                    defaultBg: "#FBFCFE",
                    defaultHoverBg: "#FBFCFE",
                    defaultHoverColor: "#5A6ACF",
                },
                },
            }}
            >
            <Button className="text-[13px] text-[#5A6ACF] tracking-[0.5px] leading-[20px] font-medium rounded-[5px]">
                See All
            </Button>
            </ConfigProvider>
        </div>

        <div>
            <Table aria-label="Example static collection table" className="w-full">
            <TableHeader>
                <TableColumn className="text-sm opacity-70">NAME</TableColumn>
                <TableColumn className="text-sm opacity-70">DATE CREATED</TableColumn>
                <TableColumn className="text-sm opacity-70">ACTION</TableColumn>
            </TableHeader>
            <TableBody>
                {[1, 2, 3, 4, 5].map((item, index) => (
                <TableRow key={index}>
                    <TableCell className="text-[0.85rem]">Tony Reichert</TableCell>
                    <TableCell className="text-[0.85rem]">2024-11-06</TableCell>
                    <TableCell>
                    <Action />
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
     </div>
    </>
  );
};

export default RecentMemo;
