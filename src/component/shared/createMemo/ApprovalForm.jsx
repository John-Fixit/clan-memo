/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
// import { Avatar } from "@nextui-org/react";
import { Avatar, Button, ConfigProvider, Input, Select, Space } from "antd";
import { useGetAllStaff, useGetApprovalStaff } from "../../../services/get_data";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { filePrefix } from "../../../utils/filePrefix";
import { errorToast } from "../../../utils/toastPopUp";
import { IoIosClose } from "react-icons/io";

const ApprovalForm = ({
  register,
  getValues,
  setValue,
  watch,
  errors,
  touchedFields,
  handleSubmit,
  handleSaveAsDraft,
  goToNextTab,
  isPending,
  isDraft,
}) => {
  const [currentValue, setCurrentValue] = useState("");

  const { userData } = useCurrentUser();

  const { data: allStaff, isLoading: getStaffLoading } = useGetAllStaff(
    userData?.data?.COMPANY_ID
  );

  const { data: approvalStaff, isLoading: approvalLoading } = useGetApprovalStaff(
    {
      company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        selection: "DEPARTMENT HEAD"
    }
  );





  const designationSelection = [
    { value: "Head of Department", label: "HEAD OF DEPARTMENT" },
    { value: "Head of Region", label: "HEAD OF REGION" },
    { value: "Head of Unit", label: "HEAD OF UNIT" },
    { value: "Head of Directorate", label: "HEAD OF DIRECTORATE" },
    { value: "General Manager", label: "GENERAL MANAGER" },
    { value: "Deputy General Manager", label: "DEPUTY GENERAL MANAGER" },
    { value: "Assistant General Manager", label: "ASSISTANT GENERAL MANAGER" },
  ];

  const staff =
    approvalStaff?.length > 0
      ? approvalStaff?.map((current) => {
          return {
            ...current,
            value: current?.STAFF_ID,
            label: `${current.FIRST_NAME} ${current.LAST_NAME}`,
          };
        })
      : [];

  let approvals = watch("approvalDetail");

  const handleSelectApprovals = (e, result) => {

    let existed = approvals?.find(
      (approval) => approval.STAFF_ID === result.STAFF_ID
    );

    if (existed) {
      errorToast("Already selected");
    } else {
      setValue("approvalDetail", [
        ...approvals,
        { ...result, designation: currentValue },
      ]);

      setCurrentValue("");
    }
  };

  // deleting an already selected staff member
  const handleDelete = (approval) => {
    const filteredData = approvals.filter(
      (current, i) => current.STAFF_ID !== approval.STAFF_ID
    );

    setValue("approvalDetail", filteredData);
  };

  return (
    <>
      <main className="w-full bg-white p-8 shadow rounded">
        <div>
          <div>
            <div className="my-4 items-center gap-1">
              <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
                Designation
              </label>
              <div className="w-full">
              <Select
              placeholder="Select Designation"
              defaultValue={currentValue}
              value={currentValue}
              onChange={(value) => {
                setCurrentValue(value);
              }}
              size="large"
              style={{
                width: "100%",
              }}
              options={designationSelection}
            />
              </div>
            </div>
            <div className="my-4 items-center gap-1">
              <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
                Staff
              </label>
              <div className="relative col-span-2">
                <Select
                  size={"large"}
                  labelInValue
                  loading={getStaffLoading}
                  placeholder="Select Staff Name"
                  onChange={handleSelectApprovals}
                  disabled={!currentValue}
                  className="rounded-md"
                  style={{
                    width: "100%",
                  }}
                  optionFilterProp="label"
                  showSearch
                  value={currentValue?.label && null}
                  options={staff}
                  optionRender={(user) => (
                    <Space className="cursor-pointer  w-full  px-2 rounded-xl">
                      {
                        <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                          {user?.data?.FILE_NAME ? (
                            <Avatar
                              alt={user?.data?.name}
                              className="flex-shrink-0"
                              size="sm"
                              src={filePrefix + user?.data?.FILE_NAME}
                            />
                          ) : (
                            <Avatar
                              alt={user?.data?.name}
                              className="flex-shrink-0"
                              size="sm"
                              name={user?.data?.label?.trim()[0]}
                            >{user?.data?.label?.trim()[0]}</Avatar>
                          )}

                          <div className="flex flex-col">
                            <span className="font-medium uppercase font-helvetica">
                              {user?.data?.label}
                            </span>
                            <span className="text-xs font-medium text-gray-400 uppercase font-helvetica">
                              {user?.data?.DEPARTMENT}
                            </span>
                          </div>
                        </div>
                      }
                    </Space>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        {approvals?.length > 0 && (
          <div className="mt-2">
            <div className="px-4 border-b border-slate-400 font-helvetica flex items-center gap-2">
              <p className="text-[#00BCC2] text-medium font-helvetica">
                {approvals?.length > 1 ? "Approvals" : " Approval"}
              </p>{" "}
              <span className="bg-[#00BCC2] rounded-full h-[14px] w-[14px] text-white text-xs font-medium text-center">
                {approvals?.length}
              </span>
            </div>
            <div>
              {approvals
                ?.slice()
                ?.reverse()
                ?.map((approval, index) => (
                  <div
                    className="flex justify-between my-4 items-center py-2 px-3 rounded bg-slate-100"
                    key={index}
                  >
                    <div className="flex items-center gap-5">
                      {approval?.FILE_NAME ? (
                        <Avatar
                          alt={approval?.name}
                          className="flex-shrink-0"
                          size="sm"
                          src={
                            approval?.FILE_NAME
                              ? filePrefix + approval?.FILE_NAME
                              : ""
                          }
                        >{approval?.label?.trim()[0]}</Avatar>
                      ) : (
                        <Avatar
                          alt={approval?.name}
                          className="flex-shrink-0"
                          size="md"
                          name={approval?.label?.trim()[0]}
                        >{approval?.label?.trim()[0]}</Avatar>
                      )}
                      <div className="">
                        <p className="m-0 font-medium font-helvetica uppercase">
                          {approval?.FIRST_NAME} {approval?.LAST_NAME}
                        </p>
                        <p className="m-0 text-xs font-helvetica uppercase text-gray-500">
                          {approval?.DEPARTMENT}
                        </p>
                      </div>
                    </div>
                    <IoIosClose
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleDelete(approval)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-end"></div>
          </div>
        )}

        <div className="flex justify-between pt-5">
          <ConfigProvider
          className="flex justify-between pb-5"
            theme={{
              token: {
                colorPrimary: "#5A6ACF"
              }
            }}
          >
            <Button size="large" onClick={handleSaveAsDraft} loading={isDraft && isPending}>Save as draft</Button>
            <Button size="large" type="primary" onClick={handleSubmit} loading={!isDraft && isPending}>
              Save
            </Button>
          </ConfigProvider>
        </div>
      </main>
    </>
  );
};

export default ApprovalForm;

ApprovalForm.propTypes = {
  setInformation: PropTypes.func,
  information: PropTypes.object,
  goToNextTab: PropTypes.func,
};
