
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { EditIcon, EyeIcon } from "../../shared/svg_icons";
import { useGetLatestMemo } from "../../../services/API/memo";
import PropTypes from "prop-types"
import { useViewMemoHook } from "../../../hooks/useViewMemoHook";
import { useHandleMemo } from "../../../hooks/useHandleMemo";

const Action = ({memo}) => {
const { handleOpenMemo } = useViewMemoHook()

const {handleOpenCreateMemo} = useHandleMemo()



  return (
    <div className="relative flex items-center justify-end gap-2">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={()=>handleOpenMemo({memo})}>
          <EyeIcon />
        </span>
        {
          memo?.IS_DRAFT ? (
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={()=>handleOpenCreateMemo({draftedMemo: memo})}>
            <EditIcon />
          </span>
          ): null
}
        {/* <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span> */}
    </div>
  );
};

const RecentMemo = ({userData}) => {

  

  const {data: latestMemo, isLoading} = useGetLatestMemo({
    staff_id: userData?.data?.STAFF_ID
  });



  return (
    <>
     <div className="col-span-2 py-3 mt-4">
        <div className="flex justify-between items-center px-5">
            <div>
            <h3 className="text-[14px] text-black tracking-[0.5px] leading-[22px]">
                <span>Recent Memo</span>
            </h3>
            </div>
            {/* <ConfigProvider
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
            </ConfigProvider> */}
        </div>

        <div>
            <Table aria-label="Example static collection table" className="w-full">
            <TableHeader>
                <TableColumn className="text-sm opacity-70">SUBJECT</TableColumn>
                <TableColumn className="text-sm opacity-70">FOLDER</TableColumn>
                <TableColumn className="text-sm opacity-70">DATE CREATED</TableColumn>
                <TableColumn className="text-sm opacity-70 text-end">ACTION</TableColumn>
            </TableHeader>
            <TableBody isLoading={isLoading}>
                {latestMemo?.map((item, index) => (
                <TableRow key={index}>
                    <TableCell className="text-[0.85rem] opacity-65">{item?.SUBJECT}</TableCell>
                    <TableCell className="text-[0.85rem] opacity-65">{item?.FOLDER_NAME}</TableCell>
                    <TableCell className="text-[0.85rem] opacity-65">{item?.DATE_CREATED}</TableCell>
                    <TableCell>
                    <Action memo={item}/>
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


RecentMemo.propTypes = {
  userData: PropTypes.object.isRequired
}
Action.propTypes = {
  memo: PropTypes.object.isRequired
}
