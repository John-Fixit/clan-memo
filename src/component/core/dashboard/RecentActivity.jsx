import { Avatar, Button, ConfigProvider } from "antd"
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
const RecentActivity = () => {
  return (
    <>
        <div className="border w-full rounded-[5px] flex flex-col gap-y-5 pt-3">
            <div className="flex justify-between items-center px-5">
              <div>
                <h3 className="text-[14px] text-black tracking-[0.5px] leading-[22px]">
                  <span>Last Activity</span>
                </h3>
                <p className="text-[12px] tracking-[0.5px] leading-[22px] text-[#000000] opacity-50">
                  Summary of your latest activities
                </p>
              </div>
              <div className="flex gap-x-1">
                <ConfigProvider theme={{
                  token: {
                    colorPrimary: "#5A6ACF",
                  }
                }}>
                  <Button shape="circle" type="primary" icon={<IoChevronBackOutline color="white" size={20}/>} />
                  <Button shape="circle" type="primary" icon={<IoChevronForwardOutline color="white" size={20}/>} />
                </ConfigProvider>
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
              {[
                { color: "#f56a00", initial: "U" },
                { color: "#F2383A", initial: "F" },
                { color: "#5A6ACF", initial: "AP" },
                { color: "#F99C30", initial: "UT" },
              ].map((item, index) => (
                <div
                  key={index + "__activities"}
                  className={`flex items-start gap-x-3 py-4 ${
                    index !== 0 && "border-t"
                  } border-[#DBE5EB] cursor-pointer hover:bg-[#f1f1f1] transition-all px-5`}
                >
                  <div>
                    <Avatar
                      size={"large"}
                      className={`${item?.color}`}
                      style={{
                        backgroundColor: `${item.color}`,
                        opacity: 0.7
                      }}
                    >
                      {item.initial}
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#273240] leading-[20px] tracking-[0.5px]">
                      sojiaye@yahoo.com from Lagos viewed this memo
                    </p>
                    <p className="text-[#273240] opacity-70 leading-[20px] tracking-[0.5px] text-[12px]">
                      {" "}
                      Today at 10:57 AM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
    </>
  )
}

export default RecentActivity