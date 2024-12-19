/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, ConfigProvider } from "antd";

import { Avatar } from "antd";
import { removeHTMLTagsAndStyles } from "../../../utils/removeHTMLTagsAndStyles";
import AvatarGroup from "../../shared/avatar_group/AvatarGroup";

export default function MemoCard({ memo, handleOpenDrawer, openDrawerFn }) {
  //icon class
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  //

  // Function to remove HTML tags and retain inline styles

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        className="card group  py-[18px] px-[20px] h-[400] border-[1px] border-[#ededed] bg-[#fff] rounded-[6px] relative flex justify-between flex-col transition-all duration-700"
        style={{ boxShadow: "0 1px 1px rgba(0,0,0,.2)" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <div className="absolute top-5 right-2">
            {/* <Dropdown showArrow radius="sm" shadow="sm">
              <DropdownTrigger>
                <span className="cursor-pointer">
                  <BsThreeDotsVertical size={"1.3rem"} />
                </span>
              </DropdownTrigger>
              <DropdownMenu
                variant="flat"
                aria-label="Dropdown menu with icons"
              >
                <DropdownItem
                  key="edit"
                  startContent={<BsPencil className={iconClasses} />}
                  onClick={() => handleOpenDrawer("edit_memo", memo)}
                >
                  {memo?.created_by === "me" ? "Edit" : "Add Note"}
                </DropdownItem>
                <DropdownItem
                  key="view"
                  startContent={<GrView className={cn(iconClasses)} />}
                  onClick={() => openDrawerFn('viewMemo', memo)}
                >
                  View Memo
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
          <h4 className="font-[500] text-[16px] text-[#333] font-[circularstd, sans-serif] leading-[21.6px] mb-[5px] text-start">
            {memo?.subject.length < 30
              ? memo?.subject
              : memo?.subject.substring(0, 30) + "..."}
          </h4>
          <div className="!text-[#8e8e8e] mb-[1rem] font-[circularstd, sans-serif] font-[500] leading-[22px] text-xs">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  removeHTMLTagsAndStyles(memo.body).substring(0, 200) + "...",
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-x-8 flex-wrap gap-y-3">
            <div className="mb-[5px] text-[15px]">
              <p className="font-medium text-xs text-[#333] leading-[22px] my-auto">
                Created At:
              </p>
              <p className="text-[#8e8e8e] text-sm font-[500] leading-[22px] my-auto">
                {memo?.created_at}
              </p>
            </div>
            <div className="mb-[5px] text-[15px]">
              <p className="font-medium text-xs text-[#333] leading-[22px] my-auto">
                Memo Creator:
              </p>
              <div className="text-[#8e8e8e] font-[500] leading-[22px] my-auto flex gap-2 items-center">
                <Avatar
                  src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-16.jpg"
                  className="h-[26px] w-[26px]"
                />
                <span>{memo?.created_by}</span>
              </div>
            </div>
          </div>
          <div className="mb-[10px] flex justify-between">
            <div>
              <p className="font-medium text-xs text-[#333] leading-[22px] my-auto">
                Approval:
              </p>
              <Avatar.Group
                max={{ count: 3 }}
                total={memo?.approval?.length - 3}
                classNames={{
                  base: "border-none border-0 border-red-500",
                }}
                size="sm"
                isBordered={true}
                className="justify-normal mt-2"
              >
                <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg" />
                <Avatar src="	https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg" />
                <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg" />
                <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg" />
                {memo?.approval?.map((memo, index) => {
                  return (
                    <Avatar
                      key={index + "_approval"}
                      src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg"
                    />
                  );
                })}
              </Avatar.Group>
            </div>
            {isHovered && (
              <div className="flex gap-2  transition ease-in-out duration-700h-full items-center">
                {memo?.created_by === "me" && memo?.status === "draft" && (
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#5A6ACF",
                      },
                    }}
                  >
                    <Button
                      className="text-[#5A6ACF] border-[#5A6ACF] bg-white fw-semibold"
                      onClick={() => openDrawerFn("edit_memo", memo)}
                    >
                      Edit
                    </Button>
                  </ConfigProvider>
                )}
                <ConfigProvider
                  theme={{
                    components: {
                      Button: {
                        defaultHoverBg: "#5A6ACF",
                        defaultHoverColor: "#fff",
                      },
                    },
                  }}
                >
                  <Button
                    className="bg-[#5A6ACF] hover:bg-[#5A6ACF] text-[#fff] fw-semibold"
                    onClick={() => handleOpenDrawer("viewMemo", memo)}
                  >
                    View
                  </Button>
                </ConfigProvider>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
