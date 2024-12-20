import { Avatar, Button, ConfigProvider } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useGetActivities } from "../../../services/API/memo";
import PropTypes from "prop-types";
import StarLoader from "../loaders/StarLoader";
import moment from "moment";
const RecentActivity = ({ userData }) => {
  const { data: activities, isLoading } = useGetActivities({
    staff_id: userData?.data?.STAFF_ID,
  });


  const colors = [
    { color: "#f56a00" },
    { color: "#F2383A" },
    { color: "#5A6ACF" },
    { color: "#F99C30" },
  ];

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
          <div className={`flex gap-x-1 ${isLoading && "hidden"}`}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#5A6ACF",
                },
              }}
            >
              <Button
                shape="circle"
                type="primary"
                icon={<IoChevronBackOutline color="white" size={20} />}
              />
              <Button
                shape="circle"
                type="primary"
                icon={<IoChevronForwardOutline color="white" size={20} />}
              />
            </ConfigProvider>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <StarLoader />
            </div>
          ) : activities?.length ? (
            activities.map((item, index) => {
              const randomIndex = Math.floor(Math.random() * colors.length);
              return (
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
                        backgroundColor: `${colors?.[randomIndex]?.color}`,
                        opacity: 0.7,
                      }}
                    >
                      {item?.FIRST_NAME?.trim()[0]}
                      {item?.LAST_NAME?.trim()[0]}
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-[#273240] opacity-70 leading-[15px] tracking-[0.5px] text-[10px]">
                      {item?.FIRST_NAME} {item?.LAST_NAME}
                    </p>
                    <p className="text-[13px] text-[#273240] leading-[20px] tracking-[0.5px]">
                      {item?.ACTIVITY}
                    </p>
                    <p className="text-[#273240] opacity-70 leading-[20px] tracking-[0.5px] text-[12px]">
                      {moment(item?.DATE_CREATED)?.calendar()}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-32 flex justify-center items-center">
              <h2 className="text-default-500">
                <i>No Recent Activity</i>
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentActivity;

RecentActivity.propTypes = {
  userData: PropTypes.object.isRequired,
};
