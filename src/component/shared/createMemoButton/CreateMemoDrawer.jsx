/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import DrawerSideTab from "../drawer/DrawerSideTab";
import MemoForm from "../createMemo/MemoForm";
import { useForm } from "react-hook-form";
import { useCreateMemo } from "../../../services/API/createMemo";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ApprovalForm from "../createMemo/ApprovalForm";
import { errorToast, successToast } from "../../../utils/toastPopUp";
import { useHandleMemo } from "../../../hooks/useHandleMemo";
import { useViewMemo } from "../../../services/API/memo";

const CreateMemoDrawer = () => {
  const [isDraft, setIsDraft] = useState(false);

  const { userData } = useCurrentUser();

  const {
    isOpen,
    data: { draftedMemo },
    handleCloseCreateMemo,
  } = useHandleMemo();



  const { mutate, isPending } = useCreateMemo({
    updateDraft: draftedMemo ? true : false,
  });

  const { data: getMemoDetail, mutate:mutateViewMemo } = useViewMemo({
    memo_id: draftedMemo?.MEMO_ID,
  });


  useEffect(()=>{
    mutateViewMemo({
      memo_id: draftedMemo?.MEMO_ID,
    })
  }, [draftedMemo?.MEMO_ID, mutateViewMemo])


  const memoData = useMemo(() => getMemoDetail?.data, [getMemoDetail?.data]);
  const memoApprovers = useMemo(
    () => getMemoDetail?.approvers,
    [getMemoDetail?.approvers]
  );


  const approvers = useMemo(
    () => memoApprovers?.map((item) => item.APPROVER),
    [memoApprovers]
  );
  const recipients = useMemo(
    () => memoData?.RECIPIENT?.map((item) => item.STAFF_ID),
    [memoData?.RECIPIENT]
  );
  const approvalDetail = useMemo(
    () =>
      memoApprovers?.map((item) => ({
        DEPARTMENT: item.APPROVERS.DEPARTMENT,
        FILE_NAME: item.APPROVERS.FILE_NAME,
        FIRST_NAME: item.APPROVERS.FIRST_NAME,
        LAST_NAME: item.APPROVERS.LAST_NAME,
        STAFF_ID: item.APPROVER,
        STAFF_NUMBER: item.APPROVERS.STAFF_NUMBER,
        designation: item.DESIGNATION,
        label: `${item.APPROVERS.FIRST_NAME} ${item.APPROVERS.LAST_NAME}`,
        value: item.APPROVER,
      })),
    [memoApprovers]
  );

 

  const {
    register,
    getValues,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      from: "personal", //draftedMemo?.for===userData?.data?.STAFF_ID? "personal":"others",
      senderName: memoData?.for || "",
      recipient_type: memoData?.RECIPIENT_TYPE || "",
      subject: memoData?.SUBJECT || "",
      approvalDetail: approvalDetail || [],
      approval: approvers || [],
      body: memoData?.MEMO_CONTENT || "",
      folder: draftedMemo?.FOLDER_NAME || "General",
      recipient_value_array: draftedMemo?.recipient_value || null,
      recipient_value: memoData?.RECIPIENT_VALUE || null,
      recipients: recipients || [],
      to_value: null,
      isDraftMemo: draftedMemo ? true : false,
    },
  });

  useEffect(() => {
    reset({
      from: "personal", //draftedMemo?.for===userData?.data?.STAFF_ID? "personal":"others",
      senderName: memoData?.for || "",
      recipient_type: memoData?.RECIPIENT_TYPE || "",
      subject: memoData?.SUBJECT || "",
      approvalDetail: approvalDetail || [],
      approval: [],
      body: memoData?.MEMO_CONTENT || "",
      folder: draftedMemo?.FOLDER_NAME || "General",
      recipient_value_array: draftedMemo?.recipient_value || null,
      recipient_value: String(memoData?.RECIPIENT_VALUE) || null,
      recipients: recipients || [],
      to_value: null,
      isDraftMemo: draftedMemo ? true : false,
    });
  }, [
    approvalDetail,
    approvers,
    draftedMemo,
    memoData,
    recipients,
    reset,
    trigger,
  ]);



  const onSubmit = ({ is_draft }) => {
    const values = { ...getValues(), is_draft };

    // Mapping approval details
    const approval = values?.approvalDetail?.map((item) => {
      return {
        STAFF_ID: item?.STAFF_ID,
        DESIGNATION: item?.designation,
      };
    });

    // Construct the payload
    const payload = {
      memo_subject: values.subject,
      content: values.body,
      staff_id: userData?.data?.STAFF_ID,
      company_id: userData?.data.COMPANY_ID,
      for: values?.senderName || userData?.data?.STAFF_ID,
      recipient_type: values?.recipient_type,
      recipient_value: values?.recipient_value,
      recipients: values?.recipients,
      approvals: approval,
      is_draft: values?.is_draft || 0,
      folder: values?.folder,
      memo_id: memoData?.MEMO_ID || null,
    };


    // Validation rules and error messages
    const validationRules = [
      {
        condition: !values.subject,
        message: "Subject is required.",
      },
      {
        condition: !isValidContent(values.body),
        message: "Content is required.",
      },
      {
        condition: values.from === "others" && !values.senderName,
        message: "Please select owner of the memo",
      },
      {
        condition: !values.folder,
        message: "Folder is required.",
      },
      {
        condition: !approval || approval.length === 0,
        message: "Approval details are required.",
      },
      {
        condition:
          values?.recipient_type === "STAFF" && !values?.recipients?.length,
        message: "Recipient is required",
      },
      {
        condition:
          values?.recipient_type !== "STAFF" && !values?.recipient_value,
        message: "Recipient is required.",
      },
    ];

    // Function to check if content is valid (not just empty HTML tags)
    function isValidContent(content) {
      const strippedContent = content?.replace(/<[^>]*>/g, "").trim(); // Remove HTML tags
      return strippedContent.length > 0; // Check if there's meaningful content
    }

    // Collect error messages
    const errorMessages = validationRules
      .filter((rule) => rule.condition)
      .map((rule) => rule.message);

    // If validation fails, show errors
    if (errorMessages.length > 0) {
      errorToast(errorMessages.join("\n"));
    } else {
      // Proceed with mutation or form submission
      mutate(payload, {
        onError: (error) => {
          const errMessage = error?.response?.data?.message || error?.message;
          errorToast(errMessage);
        },
        onSuccess: (response) => {
          const resMsg = response?.data?.message;
          successToast(resMsg);
          reset();
          handleCloseCreateMemo();
        },
      });
    }
  };

  const handleSaveAsDraft = () => {
    setIsDraft(true);
    onSubmit({ is_draft: 1 }); // 1 means it will save as draft
  };

  return (
    <>
      <ExpandedDrawer
        isOpen={isOpen}
        onClose={handleCloseCreateMemo}
        maxWidth={720}
      >
        <DrawerSideTab
          tabs={[
            {
              title: "Create Memo",
              component: (
                <MemoForm
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  touchedFields={touchedFields}
                  trigger={trigger}
                />
              ),
            },
            {
              title: "Approval",
              component: (
                <ApprovalForm
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  touchedFields={touchedFields}
                  handleSaveAsDraft={handleSaveAsDraft}
                  handleSubmit={onSubmit}
                  isPending={isPending}
                  isDraft={isDraft}
                />
              ),
            },
          ]}
        >
          <MemoForm />
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  );
};

export default CreateMemoDrawer;
