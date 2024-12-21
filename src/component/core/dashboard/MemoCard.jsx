/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, ConfigProvider } from "antd";

import { Avatar } from "antd";
import { removeHTMLTagsAndStyles } from "../../../utils/removeHTMLTagsAndStyles";
import AvatarGroup from "../../shared/avatar_group/AvatarGroup";
import moment from "moment";
import { useViewMemoHook } from "../../../hooks/useViewMemoHook";
import { useHandleMemo } from "../../../hooks/useHandleMemo";
import { motion } from "framer-motion";

export default function MemoCard({
  is_approve,
  memo,
  handleOpenDrawer,
  openDrawerFn,
}) {
  const { handleOpenMemo } = useViewMemoHook();

  const {handleOpenCreateMemo} = useHandleMemo()

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

  const handleOpenViewMemo = () => {
    handleOpenMemo({ memo, is_approve });
  };

  const handleEditDraftedMemo=(draftedMemo)=>{
    handleOpenCreateMemo({draftedMemo})
  }

  return (
    <>
    {
      // (
      // <div
      //   className="card group py-[18px] px-[20px] h-[400] border-[1px] border-[#ededed] bg-[#fff] rounded-[6px] relative flex justify-between flex-col transition-all duration-700"
      //   style={{ boxShadow: "0 1px 1px rgba(0,0,0,.2)" }}
      //   onMouseEnter={handleMouseEnter}
      //   onMouseLeave={handleMouseLeave}
      // >
      //   <div>
      //     <h4 className="font-[500] text-[16px] text-[#333] font-[circularstd, sans-serif] leading-[21.6px] mb-[5px] text-start">
      //       {memo?.SUBJECT?.length < 30
      //         ? memo?.SUBJECT
      //         : memo?.SUBJECT?.substring(0, 30) + "..."}
      //     </h4>
      //     <div className="!text-[#8e8e8e] mb-[1rem] font-[circularstd, sans-serif] font-[500] leading-[22px] text-xs">
      //       <p
      //         dangerouslySetInnerHTML={{
      //           __html:
      //             removeHTMLTagsAndStyles(memo?.MEMO_CONTENT)?.substring(
      //               0,
      //               200
      //             ) + "...",
      //         }}
      //       />
      //     </div>
      //   </div>
      //   <div>
      //     <div className="flex gap-x-8 flex-wrap gap-y-3">
      //       <div className="mb-[5px] text-[15px]">
      //         <p className="font-medium text-[0.83rem] text-[#333] leading-[22px] my-auto">
      //           Created At:
      //         </p>
      //         <p className="text-[#8e8e8e] text-xs font-[500] leading-[22px] my-auto">
      //           {moment(memo?.DATE_CREATED).format("DD MMM YYYY")}
      //         </p>
      //       </div>
      //       {/* <div className="mb-[5px] text-[15px]">
      //         <p className="font-medium text-[0.83rem] text-[#333] leading-[22px] my-auto">
      //           Memo Creator:
      //         </p>
      //         <div className="text-[#8e8e8e] font-[500] text-xs leading-[22px] my-auto flex gap-2 items-center">
      //           <Avatar
      //             src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-16.jpg"
      //             className="h-[26px] w-[26px]"
      //           />
      //           <span>{memo?.created_by}</span>
      //         </div>
      //       </div> */}
      //     </div>
      //     <div className="mb-[10px] flex justify-between gap-y-3 flex-wrap">
      //       {/* <div>
      //         <p className="font-medium text-[0.83rem] text-[#333] leading-[22px] my-auto">
      //           Approval:
      //         </p>
      //         <Avatar.Group
      //           max={{ count: 3 }}
      //           total={memo?.approval?.length - 3}
      //           classNames={{
      //             base: "border-none border-0 border-red-500",
      //           }}
      //           size="sm"
      //           isBordered={true}
      //           className="justify-normal mt-2"
      //         >
      //           <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg" />
      //           <Avatar src="	https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg" />
      //           <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg" />
      //           <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg" />
      //           {memo?.approval?.map((memo, index) => {
      //             return (
      //               <Avatar
      //                 key={index + "_approval"}
      //                 src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg"
      //               />
      //             );
      //           })}
      //         </Avatar.Group>
      //       </div> */}
      //       {isHovered && (
      //         <motion.div
      //         initial={{opacity: 0 }}
      //         animate={{opacity: 1, duration: 2 }}
      //         exit={{opacity: 0.5, duration: 2 }}

      //          className="flex gap-2 ease-in-out duration-700 h-full items-center transition-all">
      //           {memo?.IS_DRAFT ? (
      //             <ConfigProvider
      //               theme={{
      //                 token: {
      //                   colorPrimary: "#5A6ACF",
      //                 },
      //               }}
      //             >
      //               <Button
      //                 className="text-[#5A6ACF] border-[#5A6ACF] bg-white fw-semibold"
      //                 onClick={() => handleEditDraftedMemo(memo)}
      //               >
      //                 Edit
      //               </Button>
      //             </ConfigProvider>
      //           ) : null}
      //           <ConfigProvider
      //             theme={{
      //               components: {
      //                 Button: {
      //                   defaultHoverBg: "#5A6ACF",
      //                   defaultHoverColor: "#fff",
      //                 },
      //               },
      //             }}
      //           >
      //             <Button
      //               className="bg-[#5A6ACF] hover:bg-[#5A6ACF] text-[#fff] fw-semibold transition-all duration-700"
      //               onClick={handleOpenViewMemo}
      //             >
      //               View
      //             </Button>
      //           </ConfigProvider>
      //         </motion.div>
      //       )}
      //     </div>
      //   </div>
      // </div>
      // )
    }


<div 
      className={`
        relative flex flex-col justify-between p-5
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:-translate-y-1
        bg-white border border-gray-200 rounded-lg
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content Section */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-800 truncate">
          {memo?.SUBJECT?.length < 30
            ? memo?.SUBJECT
            : memo?.SUBJECT?.substring(0, 30) + "..."}
        </h4>
        
        <div 
          className="text-sm text-gray-600 line-clamp-5"
          dangerouslySetInnerHTML={{
            __html: removeHTMLTagsAndStyles(memo?.MEMO_CONTENT)?.substring(0, 200) + "..."
          }}
        />
      </div>

      {/* Footer Section */}
      <div className="space-y-4 mt-2">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm font-medium text-gray-800">Created At:</p>
            <p className="text-xs text-gray-600">
              {moment(memo?.DATE_CREATED).format("DD MMM YYYY")}
            </p>
          </div>
        </div>

        {/* Buttons Container */}
        <div className={`
          flex justify-end gap-2 transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
        `}>
          {memo?.IS_DRAFT ? (
            <button
              className="px-4 py-2 text-sm font-medium text-[#5A6ACF] border border-[#5A6ACF] rounded-md
                hover:bg-[#5A6ACF] hover:text-white transition-colors duration-300"
              onClick={() => handleEditDraftedMemo(memo)}
            >
              Edit
            </button>
          ):null}
          
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-[#5A6ACF] rounded-md
              hover:bg-[#4A5ABF] transition-colors duration-300"
            onClick={handleOpenViewMemo}
          >
            View
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
