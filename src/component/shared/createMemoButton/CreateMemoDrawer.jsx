/* eslint-disable react/prop-types */
import { useEffect, useState} from "react"
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import DrawerSideTab from "../drawer/DrawerSideTab";
import MemoForm from "../createMemo/MemoForm";
import { useForm } from "react-hook-form";
import { useCreateMemo } from "../../../services/API/createMemo";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ApprovalForm from "../createMemo/ApprovalForm";
import { errorToast } from "../../../utils/toastPopUp";
import toast from "react-hot-toast";
import { useHandleMemo } from "../../../hooks/useHandleMemo";

const CreateMemoDrawer = ({ openDrawer, handleClose }) => {
  const { mutate, isPending } = useCreateMemo();

  const [isDraft, setIsDraft] = useState(false)

  const { userData } = useCurrentUser();

  const { data: {draftMemoData}} = useHandleMemo()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    trigger,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      from: draftMemoData?.for===userData?.data?.STAFF_ID? "personal":"others",
      senderName: draftMemoData?.for || "",
      recipient_type: draftMemoData?.recipient_type || "",
      recipient: draftMemoData?.recipient || "",
      subject: draftMemoData?.memo_subject || "",
      approvalDetail: draftMemoData?.approval || [],
      approval: draftMemoData?.approval || [],
      body: draftMemoData?.content || "",
      folder: draftMemoData?.folder || "General",
      recipient_value_array: draftMemoData?.recipient_value || null,
      recipients: draftMemoData?.recipients || [],
      to_value: null,
      isDraftMemo: draftMemoData ? true: false
    },
  });

  useEffect(() => {
    trigger();
  }, [])

  const formatFieldName = (fieldName) => {
    // Replace underscores with spaces and capitalize the first letter
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter
  };

  console.log(errors)

  const onSubmit = ({ is_draft }) => {

    trigger()

    const values = { ...getValues(), is_draft };
    const approval = values?.approvalDetail?.map((item) => {
      return {
        STAFF_ID: item?.STAFF_ID,
        DESIGNATION: item?.designation,
      };
    });

    const payload = {
      memo_subject: values.subject,
      content: values.body,
      staff_id: userData?.data?.STAFF_ID,
      company_id: userData?.data.COMPANY_ID,
      for: values?.senderName || userData?.data?.STAFF_ID, //"5678",
      recipient_type: values?.recipient_type,
      recipient_value: values?.recipient_value, //DirectorateID, deparmentID, regionID, unitID
      recipients: values?.recipients, // If staff is picked as recipient type
      approvals: approval,
      is_draft: values?.is_draft || 0, // 1 means save as draft, 0 means submit for approval
      folder: values?.folder, // or whatever name of folder chosen or created
      "memo_id": "56"
    };


    console.log(values)


    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors).map(([field]) => {
        const formattedField = formatFieldName(field);
        return `${formattedField} is required.`;
      });

      errorToast(errorMessages.join("\n"));
    } else {
      console.log("payload: ", payload);
      // mutate(payload, {
      //  onError:(error)=>{
      //   const errMessage = error?.response?.data?.message || error?.message;

      //   errorToast(errMessage);

      //  },
      //  onSuccess:(response)=>{
      //   console.log(response);
      //  }
      // });
    }
  };

  const handleSaveAsDraft = () => {
    setIsDraft(true)
    // trigger();
    onSubmit({ is_draft: 1 }); // 1 means it will save as draft
  };

  return (
    <>
      <ExpandedDrawer isOpen={openDrawer} onClose={handleClose} maxWidth={720}>
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
