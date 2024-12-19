/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
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
import MemoNote from "../../component/shared/createMemo/MemoNote";
import SignMemo from "../../component/shared/signMemo/SignMemo";

const Memo = () => {
  const [selected, setSelected] = useState("all");

  const [open, setOpen] = useState({ status: false, role: null, memo: null });
  const [openDrawer, setOpenDrawer] = useState({ status: false, type: null });
  const [selectedMemo, setSelectedMemo] = useState("");

  const modifiedData = useMemo(() => {
    if (selected === "all") {
      return data;
    } else if (selected === "pending") {
      return data?.filter(
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
      <main>
        {/* <PageHeader
          header_text={"Memos"}
          //   breadCrumb_data={[{ name: "Home" }, { name: "Memos" }]}
          buttonProp={[
            {
              button_text: "Create Memo",
              //   fn: () => openDrawerFn("create_memo"),
            },
          ]}
        /> */}
        {/* <div className="mt-5">
          <hr />
        </div>
        */}
        <MemoTopCards memos={data} setSelected={setSelected} grid={4}/>

        <section className="memos_section mt-3">
          <div className="flex items-center flex-col md:flex-row gap-4 mt-12 mb-4 md:w-[80%]">
            <DatePicker
              placeholder="Start date"
              className="border rounded-md focus:outline-none font-medium"
            />
            <DatePicker
              placeholder="End date"
              className="border rounded-md focus:outline-none font-medium"
            />
            <ConfigProvider theme={{
              token: {
                colorPrimary: "#5A6ACF"
              }
            }}>
              <Button type="primary" className="">Search</Button>
            </ConfigProvider>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-7 lg:gap-5 mt-3">
            {modifiedData?.map((item, index) => (
              <MemoCard
                key={index + "_memo"}
                memo={item}
                handleOpenDrawer={handleOpenDrawer}
                openDrawerFn={openDrawerFn}
              />
            ))}
          </div>
        </section>
      </main>

      <ExpandedDrawer
        isOpen={openDrawer.status}
        onClose={closeDrawerFn}
        maxWidth={"47rem"}
      >
        {
          // openDrawer.type === "viewMemo" || openDrawer === "viewNote" ? (
          //   <div className="mt-5 mb-5">
          //     {openDrawer.type === "viewNote" ? (
          //       <ViewNotes />
          //     ) : (
          //       <SignMemo
          //         memo={selectedMemo}
          //         openDrawerFn={openDrawerFn}
          //         handleOpenDrawer={handleOpenDrawer}
          //       />
          //     )}
          //   </div>
          // ) :
          <DrawerSideTab
            tabs={
              openDrawer?.type === "create_memo"
                ? [
                    {
                      title: "Create Memo",
                      component: <MemoForm handleCloseDrawer={closeDrawerFn} />,
                      header_text: "Create Memo",
                      subText: "",
                    },
                    {
                      title: "Add Attachment",
                      component: <Attachment />,
                      header_text: "Attachment",
                    },
                    // {
                    //   title: "Add Approval",
                    //   component: <MemoApproval />,
                    //   header_text: "Approvals",
                    // },
                    // {
                    //   title: "Add Note",
                    //   component: <AddNote />,
                    //   header_text: "Add Note",
                    // },
                  ]
                : openDrawer?.type === "edit_memo"
                ? [
                    {
                      title: "Edit Memo",
                      component: <MemoForm />,
                      header_text: "Edit Memo",
                      sub_text: "",
                    },
                    {
                      title: "Attachment",
                      component: <Attachment />,
                      header_text: "Attachment",
                      sub_text: "",
                    },
                    // {
                    //   title: "Approval",
                    //   component: <MemoApproval />,
                    //   header_text: "Approval History",
                    // },
                    // { title: "Note", component: <AddNote /> }
                  ]
                : openDrawer.type === "addNote"
                ? [
                    {
                      title: "Add Note",
                      component: <AddNote />,
                      header_text: "Add Note",
                    },
                  ]
                : openDrawer.type === "viewNote"
                ? [
                    {
                      title: "Notes",
                      component: <MemoNote />,
                      header_text: "Notes",
                    },
                    // { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                    // { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                  ]
                : openDrawer.type === "approval_history" && [
                    //   { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                    {
                      title: "Notes",
                      component: <MemoNote />,
                      header_text: "Notes",
                    },
                    // { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                  ]
            }
          >
            <MemoForm />
          </DrawerSideTab>
        }
      </ExpandedDrawer>

      <ExpandedDrawer isOpen={open.status} onClose={handleCloseDrawer}>
        <SignMemo memo={selectedMemo} handleOpenDrawer={openDrawerFn} />
      </ExpandedDrawer>
    </>
  );
};

export default Memo;
