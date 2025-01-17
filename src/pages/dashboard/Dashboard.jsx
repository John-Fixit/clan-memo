import { useState } from "react";
import RecentMemo from "../../component/core/dashboard/RecentMemo";
import RecentActivity from "../../component/core/dashboard/RecentActivity";
import MemoTopCards from "../../component/shared/topCards/MemoTopCards";
import CreateMemoSvg from "../../component/shared/svg_icons/create_memo";
import CreateMemoButton from "../../component/shared/createMemoButton/CreateMemoButton";
import ScrollableFolders from "../../component/core/memo/folder";
import CreateFolderButton from "../../component/shared/createFolderButton";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetFileStatus } from "../../services/API/memo";

const Dashboard = () => {


  const {userData} = useCurrentUser();

  const [selected, setSelected] = useState("all");


   const {data:fileStatus, isLoading: fileStatusLoading}  =  useGetFileStatus({
      staff_id:userData?.data?.STAFF_ID
    })



  return (
    <>
      <main>
      <ScrollableFolders/>
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-2">
          <div className="lg:col-span-2 md:col-span-1 col-span-3">
            <div className="grid grid-cols-3 gap-5 items-stretch">
              <div className="col-span-3">
                <MemoTopCards
          setSelected={setSelected}
          selected={selected}
          statusData={
            {
              pending: {loading: fileStatusLoading, count: fileStatus?.PENDING},
              approved: {loading: fileStatusLoading, count: fileStatus?.APPROVED},
              declined: {loading: fileStatusLoading, count: fileStatus?.DECLINED},
              draft: {loading: fileStatusLoading, count: fileStatus?.DRAFT},
            }
          }
        />
              </div>
              <div className="col-span-3">
                <div className="flex lg:flex-nowrap flex-wrap justify-center items-center p-5 gap-x-5 gap-y-4 border rounded text-center">
                  <div>
                    <CreateMemoSvg />
                  </div>
                  <div className="py-3 flex flex-col gap-y-8 items-center">
                    <div className="flex flex-col gap-y-3">
                      <h4 className="text-[18px] font-medium tracking-[0.5px] leading-[23px] text-[#1F384C]">
                        Create Memo
                      </h4>
                      <p className="text-[12px] tracking-[0.5px] leading-[20px] text-[#000000] opacity-50">
                        Create memo to grow their business and serve their customers
                        better. Use this tool to generate reports.
                      </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <CreateMemoButton />
                      <CreateFolderButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1 col-span-3">
            <RecentActivity userData={userData}/>
          </div>
        </section>
        <div className="my-5">
          <hr />
        </div>
        <section className="">
          <RecentMemo userData={userData}/>
        </section>
      </main>

    </>
  );
};

export default Dashboard;
