/* eslint-disable react/prop-types */
import { useEffect} from "react"
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import DrawerSideTab from "../drawer/DrawerSideTab";
import MemoForm from "../createMemo/MemoForm";
import { useForm } from "react-hook-form";
import { useCreateMemo } from "../../../services/API/createMemo";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ApprovalForm from "../createMemo/ApprovalForm";
import { errorToast } from "../../../utils/toastPopUp";

const CreateMemoDrawer = ({ openDrawer, handleClose }) => {
  const { mutate, isPending } = useCreateMemo();

  const { userData } = useCurrentUser();

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
      from: "personal",
      senderName: "",
      recipient_type: "",
      recipient: "",
      subject: "",
      approvalDetail: [],
      approval: [],
      body: "",
      folder: "General",
      recipient_value_array: null,
      recipients: [],
      to_value: null,
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

  const onSubmit = ({ is_draft }) => {
    const values = { ...getValues(), is_draft };
    const approval = values?.approvalDetail?.map((item) => {
      return {
        staff_id: item?.STAFF_ID,
        designation: item?.designation,
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
    };

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
