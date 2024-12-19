/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input, Select } from "antd";
import { useForm } from "react-hook-form";
import MemoRecipient from "./MemoRecipient";

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

const recipientOptions = [
  { label: "CEO", value: "ceo" },
  { label: "HR", value: "HR" },
  { label: "Product Manager", value: "product manager" },
  { label: "COO", value: "COO" },
  { label: "CTO", value: "CTO" },
];

const MemoForm = () => {
  const quillRef = useRef(null);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      from: "personal",
      senderName: "",
      recipient_type: "",
      recipient: "",
      subject: "",
      approval: [],
      body: "",
      folder: "general",
      recipient_value_array: null,
      recipients: [],
      to_value: null,
    },
  });

  const onSubmit = (data) => {
    console.log("data: ", data);
  };

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

  const handleSaveAsDraft = () => {
    // localStorage.setItem(`DRAFT_MEMO`, JSON.stringify(data));
    // setSubject("");
    // setRecipients([]);
    // setMemo_body("");
    // handleCloseDrawer();
    console.log("Memo saved as draft");
    // showSuccess("Memo saved as draft");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="flex gap-3">
            <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
              From
            </label>
            <Select
              placeholder="Search Recipient"
              size={"small"}
              defaultValue={getValues("from")}
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
              <Input
                size="large"
                placeholder="Enter Name"
                status={errors.senderName ? "error" : ""}
                {...register("senderName", {
                  required:
                    watch("from") === "personal"
                      ? "This field is required"
                      : false,
                })}
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
            {...register("subject", {
              required: "This field is required",
            })}
            onChange={(e) => setValue("subject", e.target.value)}
          />
          <small className="text-danger-500">{ touchedFields.subject && errors?.subject?.message}</small>
        </div>
        <div className="mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Folder
          </label>
          <Select
            size={"large"}
            placeholder="Select folder"
            className="border-gray-300 rounded-md"
            style={{
              width: "100%",
            }}
            status={errors.folder ? "error" : ""}
            {...register("folder", {
              required: "This field is required",
            })}
            options={[
              { label: "General", value: "general" },
              { label: "Office", value: "office" },
              { label: "New", value: "new" },
            ]}
            onChange={(value)=>setValue("folder", value)}
          />
          {watch("folder") === "new" && (
            <Input
              size="large"
              placeholder="Enter name of your folder"
              status={errors.new_folder ? "error" : ""}
              className="mt-2"
              // {...register("subject", {
              //   required: "This field is required",
              // })}
              onChange={(e) => setValue("new_folder", e.target.value)}
            />
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Approval
          </label>
          <Select
            mode="multiple"
            size={"large"}
            placeholder="Select Approvals"
            className="border-1 border-gray-300 rounded-md"
            style={{
              width: "100%",
            }}
            variant="borderless"
            options={recipientOptions}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Body
          </label>
          <div className="flex flex-col rounded mb-4">
            <ReactQuill
              ref={quillRef}
              theme="snow"
              // value={memo_body}
              placeholder="Write Something Here..."
              onChange={(e) => {
                setValue("body", e.target.value);
              }}
              style={{ height: "500px" }}
              className="flex-1 border-none h-[280px] rounded-md w-full"
              modules={quillModules}
            />
          </div>
        </div>
        <div className="flex justify-between pb-5">
          <button
            type="button"
            className={`header_btnStyle bg-[#fff] rounded text-[#5A6ACF] border border-[#5A6ACF] font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
            onClick={handleSaveAsDraft}
          >
            Save as draft
          </button>

          <button
            type="submit"
            className={`bg-[#5A6ACF] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase `}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default MemoForm;
