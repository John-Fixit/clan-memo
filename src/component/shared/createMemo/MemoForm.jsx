/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input, Select, Space } from "antd";
import MemoRecipient from "./MemoRecipient";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Avatar } from "antd";
import { filePrefix } from "../../../utils/filePrefix";
import { useGetAllStaff } from "../../../services/get_data";
import { useListFolder } from "../../../services/API/folder";

const quillModules = {
  // Add any custom modules if needed
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const MemoForm = ({
  register,
  getValues,
  setValue,
  watch,
  errors,
  touchedFields,
  trigger,
}) => {
  const quillRef = useRef(null);

  const { userData } = useCurrentUser();

  const { data: allStaff, isLoading: getStaffLoading } = useGetAllStaff(
    userData?.data?.COMPANY_ID
  );

  const { data: getFolderList, isLoading: getFolderLoading } = useListFolder({
    staff_id: userData?.data?.STAFF_ID,
  });

  const folderList = getFolderList?.map((folder) => {
    return {
      ...folder,
      value: folder?.ID,
      label: folder?.NAME,
    };
  });

  const staff =
    allStaff?.length > 0
      ? allStaff?.map((current) => {
          return {
            ...current,
            value: current?.STAFF_ID,
            label: `${current.FIRST_NAME} ${current.LAST_NAME}`,
          };
        })
      : [];

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    // Access the Quill instance
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        // Set the height of the editor
        editor.root.style.height = "150px"; // Adjust the height as needed
        // editor.root.style.overflowY = "auto";
      }
    }
  }, []);

  return (
    <>
      <main>
        <div className="mb-4">
          <div className="flex gap-3">
            <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
              From
            </label>
            <Select
              placeholder="Search Recipient"
              size={"small"}
              value={getValues("from")}
              onChange={(value) => {
                setValue("from", value);
              }}
              options={[
                { label: "Personal", value: "personal" },
                { label: "Others", value: "others" },
              ]}
            />
          </div>

          {watch("from") === "others" && (
            <div className="mt-2">
              <Select
                size={"large"}
                loading={getStaffLoading}
                placeholder="Select Staff Name"
                value={watch("senderName")}
                
                className="rounded-md"
                style={{
                  width: "100%",
                }}
                {...register("senderName", {
                  required: "This field is required",
                })}
                onChange={(value) => setValue("senderName", value)}
                optionFilterProp="label"
                showSearch
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
                          >
                            {user?.data?.label?.trim()[0]}
                          </Avatar>
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
          )}
        </div>
        <MemoRecipient
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          register={register}
        />
        <div className="mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Subject
          </label>
          <Input
            size="large"
            placeholder="Subject"
            status={errors.subject ? "error" : ""}
            value={watch("subject") || ""} // Use watch to bind the value
            onChange={(e) => {
              setValue("subject", e.target.value, { shouldValidate: true }); // Update value and trigger validation
            }}
          />
          <small className="text-danger-500">
            {touchedFields.subject && errors?.subject?.message}
          </small>
        </div>
        <div className="mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Folder
          </label>
          <Select
          labelInValue
            size={"large"}
            placeholder="Select folder"
            className="border-gray-300 rounded-md"
            style={{
              width: "100%",
            }}
            loading={getFolderLoading}
            status={errors.folder ? "error" : ""}
            value={watch("folder")}
            {...register("folder", {
              required: "This field is required",
            })}
            options={folderList}
            onChange={(e, value) => setValue("folder", value?.NAME)}
          />
          {watch("folder") === "new" && (
            <Input
              size="large"
              placeholder="Enter name of your folder"
              status={errors.new_folder ? "error" : ""}
              className="mt-2"
              value={getValues("mew_folder")}
              // {...register("subject", {
              //   required: "This field is required",
              // })}
              onChange={(e) => setValue("new_folder", e.target.value)}
            />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Body
          </label>
          <div className="flex flex-col rounded mb-4">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={getValues("body")}
              placeholder="Write Something Here..."
              onChange={(value) => {
                setValue("body", value);
              }}
              style={{ height: "500px" }}
              className="flex-1 border-none h-[280px] rounded-md w-full"
              modules={quillModules}
            />
          </div>
        </div>
        <div className="flex justify-end pb-5">
          {/* <button
            type="submit"
            className={`bg-[#5A6ACF] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase `}
          >
            Continue
          </button> */}
        </div>
      </main>
    </>
  );
};

export default MemoForm;
