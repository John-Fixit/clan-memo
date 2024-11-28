import { useState } from "react";
import { Button, ConfigProvider } from "antd";
import RecentMemo from "../../component/core/dashboard/RecentMemo";
import RecentActivity from "../../component/core/dashboard/RecentActivity";
import MemoTopCards from "../../component/shared/topCards/MemoTopCards";
import { data } from "../../component/core/dashboard/memoDoomyData";
import ExpandedDrawer from "../../component/shared/drawer/ExpandedDrawer";
import MemoForm from "../../component/shared/createMemo/MemoForm";

const Dashboard = () => {
  const [selected, setSelected] = useState("all");

  const [openDrawer, setOpenDrawer] = useState("")


  const handleOpenCreateMemo = () => {
    setOpenDrawer(true)
  }
  const handleCloseCreateMemo = () => {
    setOpenDrawer(false)
  }



  return (
    <>
      <main>
        <section className="grid grid-cols-3 gap-x-5 gap-y-2">
          <div className="col-span-2">
            <div className="grid grid-cols-3 gap-5 items-stretch">
              <div className="col-span-2">
                <MemoTopCards memos={data} setSelected={setSelected} />
              </div>
              <div className="col-span-1">
                <div className="p-3 flex flex-col gap-y-4 border rounded text-center items-center">
                  <h4 className="text-[18px] font-medium tracking-[0.5px] leading-[23px] text-[#1F384C]">
                    Create Memo
                  </h4>
                  <p className="text-[12px] tracking-[0.5px] leading-[22px] text-[#000000] opacity-50">
                    Create memo to grow their business and serve their customers
                    better. Use this tool to generate reports.
                  </p>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#5A6ACF",
                      },
                      components: {
                        Button: {
                          defaultBg: "#5A6ACF",
                          colorText: "#D8D9DB",
                        },
                      },
                    }}
                  >
                    <Button onClick={handleOpenCreateMemo}>Create Memo</Button>
                  </ConfigProvider>
                </div>
              </div>
            </div>
            <RecentMemo />
          </div>
          <div className="col-span-1">
            {/* <DoughnutChart /> */}
            <RecentActivity />
          </div>
        </section>
        <div className="my-5">
          <hr />
        </div>
        <section className="grid grid-cols-3 gap-x-5 gap-y-2 ">
          <RecentMemo />
          <RecentActivity />
        </section>
      </main>




                    <ExpandedDrawer isOpen={openDrawer} onClose={handleCloseCreateMemo} maxWidth={620}>
                        <MemoForm />
                      {/* <DrawerSideTab>
                      </DrawerSideTab> */}
                    </ExpandedDrawer>




    </>
  );
};

export default Dashboard;
