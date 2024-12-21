/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useCallback } from "react";
import { data } from "../../component/core/dashboard/memoDoomyData";
import PageHeader from "../../component/shared/pageHeader/PageHeader";
import MemoTopCards from "../../component/shared/topCards/MemoTopCards";
import { Button, ConfigProvider, DatePicker } from "antd";
import MemoCard from "../../component/core/dashboard/MemoCard";
import ExpandedDrawer from "../../component/shared/drawer/ExpandedDrawer";
import DrawerSideTab from "../../component/shared/drawer/DrawerSideTab";
import MemoForm from "../../component/shared/createMemo/MemoForm";
import Attachment from "../../component/shared/createMemo/Attachment";
import AddNote from "../../component/shared/createMemo/AddNote";
import SignMemo from "../../component/shared/signMemo/SignMemo";
import CreateMemoButton from "../../component/shared/createMemoButton/createMemoButton";
import {
  FolderCard,
} from "../../component/core/memo/folder";
import CreateFolderButton from "../../component/shared/createFolderButton";
import { useSearchParams } from "react-router-dom";
import MemoApprovalHistory from "../../component/shared/createMemo/MemoApprovalHistory";
import { useViewFolder, useViewFolderByStatus } from "../../services/API/memo.js"
import useCurrentUser from "../../hooks/useCurrentUser";
import { useListFolderStatus } from "../../services/API/folder";
import StarLoader from "../../component/core/loaders/StarLoader.jsx";

const Memo = () => {
  const [selected, setSelected] = useState("total");

  const [open, setOpen] = useState({ status: false, role: null, memo: null });
  const [openDrawer, setOpenDrawer] = useState({ status: false, type: null });
  const [selectedMemo, setSelectedMemo] = useState("");
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const {userData} = useCurrentUser()
  const {data:folders}  =  useListFolderStatus({
    staff_id:userData?.data?.STAFF_ID
  })



  const [searchParams] = useSearchParams();

  // Get a specific query parameter
  const folder = searchParams.get("folder");

  // const { mutate: mutateAllMemo, data: getAllMemo} = useViewFolder()
  const { mutate: mutateMemoByStatus, data: getFolderMemo, isPending } = useViewFolderByStatus()

  const defaultPayload = {
    "staff_id": userData?.data?.STAFF_ID,
    "folder_id": folder,
    "status": "",
    "start_date": "",
    "end_date": ""
}

  const {data:allMemo, isLoading: totalLoading} = useViewFolder(
    {...defaultPayload, status: ""}
  );
  const {data:pendingMemo, isLoading: pendingLoading} = useViewFolder(
    {...defaultPayload, status: "pending"}
  );
  const {data:approvedMemo, isLoading: approvedLoading} = useViewFolder(
    {...defaultPayload, status: "approved"}
  );
  const {data:declinedMemo, isLoading: declinedLoading} = useViewFolder(
    {...defaultPayload, status: "declined"}
  );
  const {data:draftMemo, isLoading: draftLoading} = useViewFolder(
    {...defaultPayload, status: "draft"}
  );


  useEffect(()=>{
    mutateMemoByStatus(
      {
        "staff_id": userData?.data?.STAFF_ID,
        "folder_id": folder,
        "status": selected,
        "start_date": startDate,
        "end_date": endDate
    })
  }, [userData?.data?.STAFF_ID, folder, mutateMemoByStatus, selected, startDate, endDate])




  const folderMemo=useMemo(()=>(
    getFolderMemo?.data?.requests
  ), [getFolderMemo?.data?.requests])






  const modifiedData = useMemo(() => {
    if (selected === "total") {
      return folderMemo;
    } else if (selected === "pending") {
      return folderMemo?.filter(
        (memo) => memo?.created_by === "me" && memo?.status === "pending"
      );
    } else if (selected === "approved") {
      return data?.filter((memo) => memo?.created_by !== "me");
    } else if (selected === "declined") {
      return data?.filter(
        (memo) => memo?.created_by === "me" && memo?.status === "declined"
      );
    }
  }, [selected]);

  const handleOpenDrawer = (role, memo) => {
    setOpen({ status: true, role: role });
    setSelectedMemo(memo);
  };
  const handleCloseDrawer = () => {
    setOpen({ status: false });
  };

  //second drawer
  const openDrawerFn = (type, memo) => {
    setSelectedMemo(memo);
    setOpenDrawer({ ...openDrawer, status: true, type: type });
  };
  const closeDrawerFn = () => {
    setOpenDrawer({ ...openDrawer, status: false });
  };

  return (
    <>
      <main className="mb-10">
        <div>
          <div className="flex gap-x-3 justify-end mb-4">
            <CreateFolderButton />
            <CreateMemoButton />
          </div>
          {/* <ScrollableFolders /> */}
        </div>
        <MemoTopCards
          setSelected={setSelected}
          selected={selected}
          grid={4}
          statusData={
            {
              "": {loading: totalLoading, count: allMemo?.length},
              pending: {loading: pendingLoading, count: pendingMemo?.length},
              approved: {loading: approvedLoading, count: approvedMemo?.length},
              declined: {loading: declinedLoading, count: declinedMemo?.length},
              draft: {loading: draftLoading, count: draftMemo?.length},
            }
          }
        />

        <section className="memos_section mt-3">
          <div className="flex items-center flex-wrap gap-4 mt-12 mb-4 md:w-[80%]">
            <DatePicker
              placeholder="Start date"
              className="border rounded-md focus:outline-none font-medium"
              onChange={(date, dateString)=>setStartDate(dateString)}
            />
            <DatePicker
              placeholder="End date"
              className="border rounded-md focus:outline-none font-medium"
              onChange={(date, dateString)=>setEndDate(dateString)}
            />
            {/* <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#5A6ACF",
                },
              }}
            >
              <Button type="primary" className="">
                Search
              </Button>
            </ConfigProvider> */}
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-5 gap-y-2">
            <div className="lg:col-span-3 md:col-span-2 col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-7 lg:gap-5 mt-3">
                {
                isPending? (
                  <div className="h-32 flex justify-center items-center col-span-4">
                    <StarLoader />
                  </div>
                ):
                folderMemo?.length ? (
                  folderMemo?.map((item, index) => (
                    <MemoCard
                      key={index + "_memo"}
                      memo={item}
                      handleOpenDrawer={handleOpenDrawer}
                      openDrawerFn={openDrawerFn}
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
            </div>
            <div className="md:col-span-1 col-span-3">
              <div className="border w-full rounded-[5px] flex flex-col gap-y-5 pt-3 lg:px-5 px-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[14px] text-black tracking-[0.5px] leading-[22px]">
                      <span>Folders</span>
                    </h3>
                  </div>
                </div>
                <div className="min-h-[50vh] overflow-y-auto flex flex-col items-center scrollbar-hid">
                  {folders?.map((folder) => (
                    <div key={folder?.ID} className="snap-start">
                      <FolderCard
                        name={folder?.NAME}
                        fileCount={folder?.MEMO_COUNT}
                        folderID={folder?.ID}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ExpandedDrawer
        isOpen={openDrawer.status}
        onClose={closeDrawerFn}
        maxWidth={700}
      >
        <DrawerSideTab
          tabs={
            // openDrawer?.type === "create_memo"
            //   ? [
            //       {
            //         title: "Create Memo",
            //         component: <MemoForm handleCloseDrawer={closeDrawerFn} />,
            //         header_text: "Create Memo",
            //         subText: "",
            //       },
            //       {
            //         title: "Add Attachment",
            //         component: <Attachment />,
            //         header_text: "Attachment",
            //       },
            //     ]
            //   : openDrawer?.type === "edit_memo"
            //   ? [
            //       {
            //         title: "Edit Memo",
            //         component: <MemoForm />,
            //         header_text: "Edit Memo",
            //         sub_text: "",
            //       },
            //       {
            //         title: "Attachment",
            //         component: <Attachment />,
            //         header_text: "Attachment",
            //         sub_text: "",
            //       },
            //     ]
            //   : openDrawer.type === "addNote"
            //   ? [
            //       {
            //         title: "Add Note",
            //         component: <AddNote />,
            //         header_text: "Add Note",
            //       },
            //     ]
            //   : 
              openDrawer.type === "viewNote"
              ? [
                  // {
                  //   title: "Notes",
                  //   component: <MemoNote />,
                  //   header_text: "Notes",
                  // },
                  // { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                  { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                ]
              : openDrawer.type === "approval_history" && [
                    { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                 
                  // { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                ]
          }
        >
          <MemoForm />
        </DrawerSideTab>
      </ExpandedDrawer>

      <ExpandedDrawer isOpen={open.status} onClose={handleCloseDrawer} maxWidth={700}>
        <SignMemo memo={selectedMemo} handleOpenDrawer={openDrawerFn} />
      </ExpandedDrawer>



    </>
  );
};

export default Memo;
