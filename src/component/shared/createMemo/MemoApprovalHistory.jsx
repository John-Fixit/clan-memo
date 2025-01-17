/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { filePrefix } from "../../../utils/filePrefix";

const MemoApprovalHistory = ({ memoApprovers, currentView, role }) => {


  const data = {
    _id: 3,
    type: "Casual",
    from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    returned_on:
      "Thu Jun 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
    duration: "37",
    reason: "Personal",
    over_shoot: "-3",
    status: "pending",
    hand_over: {
      name: "Ajayi Adeosun",
      role: "Section Head",
      abbr: "SH",
      main: false,
      img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },

    internal_approval: [
      {
        name: "Emmanuel Oluwatayese",
        role: "Section Head",
        abbr: "SH",
        main: false,
        img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg",
      },
      {
        name: "Adeoye John",
        role: "Head of Department",
        abbr: "HD",
        main: false,
        img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg",
      },
    ],
    hr_approval: [
      {
        name: "Olaitan Okunade",
        role: "Section Head",
        abbr: "SH",
        main: false,
        img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg",
      },
      {
        name: "Kayode Adeyinka",
        role: "Head of Department",
        abbr: "HD",
        main: false,
        img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg",
      },
    ],
  };

  const notes = [
    {
      name: "Emmanuel Oluwatayese",
      text: "I am pleased to present the quarterly sales review for our company. Despite challenging market conditions, our team has achieved remarkable results.",
      img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg",
      duration: "2 days ago",
    },
    {
      name: "John Ngozi",
      text: "continue this momentum and strive for even greater success in the upcoming quarters.",

      img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg",
      duration: "3 days ago",
    },
    {
      name: "John Doe",
      text: "I wanted to provide an update on our preparations for the upcoming annual conference.",

      img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg",
      duration: "3 days ago",
    },
    // {
    //   name: "Adelabi Kunde",
    //   text: "I wanted to provide an update on our preparations for the upcoming annual conference.",

    //   img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg",
    //   duration: "3 days ago"
    // },
  ];

  return (
    <Fragment>
      <div className="shadow border rounded p-4 bg-white">
        <div className="my-4 w-full">
          <ol className="ms-12 my-4 text-gray-500 border-s-2 border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {memoApprovers?.map((item, index) => (
              <li key={index + "___note"} className="mb-10 ms-4 relative group">
                {/* <p className="font-medium text-xs uppercase">Handover</p> */}
                <div className="border p-2 rounded">
                  <Avatar
                    src={filePrefix + item?.APPROVERS?.FILE_NAME}
                    classNames={{
                      base: "rounded-full",
                      img: "rounded-full",
                    }}
                    className="absolute -start-[62px] rounded-full"
                  />
                  <span className="absolute w-[12px] h-[12px] group-hover:bg-btnColor bg-gray-200 border-2 border-white rounded-full -start-[24px] top-5"></span>
                  <div className="">
                    <div className="flex justify-between items-between">
                      <p className=" text-blue-500">
                        {item.APPROVERS?.FIRST_NAME} {item?.APPROVERS?.LAST_NAME}
                      </p>
                    </div>
                    <p className="flex flex-col gap-2">
                      {/* <span className="text-[0.82rem]">{item?.text}</span> */}
                      <span className="text-xs">{item?.DATE_DONE}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Fragment>
  );
};

export default MemoApprovalHistory;
