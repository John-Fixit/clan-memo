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
import { useEffect, useMemo, useState } from "react";
import { data } from "../../component/core/dashboard/memoDoomyData";
import {
  useGetLatestMemo,
  useGetMyApprovals,
  useGetMyApprovalsByStatus,
} from "../../services/API/memo";
import useCurrentUser from "../../hooks/useCurrentUser";
import moment from "moment";
import { useViewMemoHook } from "../../hooks/useViewMemoHook";
import MemoCard from "../../component/core/dashboard/MemoCard";

const MyApproval = () => {
  const [open, setOpen] = useState({ status: false, role: null, memo: null });
  const [selectedMemo, setSelectedMemo] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const { handleOpenMemo } = useViewMemoHook();

  const { userData } = useCurrentUser();

  const {
    mutate,
    data: getApprovalMemo,
    isPending,
    isError,
  } = useGetMyApprovalsByStatus();


  const defaultPayload = {
    staff_id: userData?.data?.STAFF_ID,
    status: selectedStatus, // Pending, Declined, Approved
    start_date: "",
    end_date: "",
  };

  const { data: allMemo, isLoading: totalLoading } = useGetMyApprovals({
    ...defaultPayload,
    status: "",
  });
  const { data: pendingMemo, isLoading: pendingLoading } = useGetMyApprovals({
    ...defaultPayload,
    status: "pending",
  });
  const { data: approvedMemo, isLoading: approvedLoading } = useGetMyApprovals({
    ...defaultPayload,
    status: "approved",
  });
  const { data: declinedMemo, isLoading: declinedLoading } = useGetMyApprovals({
    ...defaultPayload,
    status: "declined",
  });

  useEffect(() => {
    mutate({
      staff_id: userData?.data?.STAFF_ID,
      status: selectedStatus, // Pending, Declined, Approved
      start_date: "",
      end_date: "",
    });
  }, [mutate, selectedStatus, userData]);

  const approvalMemo = useMemo(
    () => getApprovalMemo?.data?.requests,
    [getApprovalMemo?.data?.requests]
  );

  const handleCloseDrawer = () => {
    setOpen({ status: false });
  };

  return (
    <>
      <main>
        <MemoTopCards
          setSelected={setSelectedStatus}
          selected={selectedStatus}
          grid={4}
          statusData={{
            "": { loading: totalLoading, count: allMemo?.length },
            pending: { loading: pendingLoading, count: pendingMemo?.length },
            approved: { loading: approvedLoading, count: approvedMemo?.length },
            declined: { loading: declinedLoading, count: declinedMemo?.length },
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-7 lg:gap-5 mt-3">
          {approvalMemo?.length ? (
            approvalMemo?.map((item, index) => (
              <MemoCard
                is_approve={true}
                key={index + "_memo"}
                memo={item}
                // handleOpenDrawer={handleOpenDrawer}
                // openDrawerFn={openDrawerFn}
              />
            ))
          ) : (
            <div className="h-64 flex justify-center items-center col-span-4">
              <h3 className="text-default-500 text-xl font-medium tracking-wide">
                <i>Empty memo found</i>
              </h3>
            </div>
          )}
        </div>
        {/* <div className="bg-white shadow rounded-xl p-3 mt-5">
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
              {approvalMemo?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-[0.85rem] opacity-65">
                    {item?.SUBJECT}
                  </TableCell>
                  <TableCell className="text-[0.85rem] opacity-65">
                    {item?.FOLDER_NAME}
                  </TableCell>
                  <TableCell className="text-[0.85rem] opacity-65">
                    {moment( item?.DATE_CREATED).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                      onClick={() => handleOpenMemo({memo: item, is_approve: true})}
                    >
                      <EyeIcon />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div> */}
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
