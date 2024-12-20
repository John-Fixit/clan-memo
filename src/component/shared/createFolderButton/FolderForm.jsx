/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Input } from "antd";
import { useForm } from "react-hook-form";
import { useCreateFolder } from "../../../services/API/folder";
import { errorToast, successToast } from "../../../utils/toastPopUp";
import useCurrentUser from "../../../hooks/useCurrentUser";


const FolderForm = () => {
    const { mutate, isPending } = useCreateFolder();
    const {userData} = useCurrentUser()


  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        folderName: "",
      },
    }
  );

  const onSubmit = (data) => {
      const json = {
          "staff_id":userData?.data?.STAFF_ID,
          "folder":data?.folderName
        }
        // console.log(json);
        mutate(data, {
       onError:(error)=>{
        const errMessage = error?.response?.data?.message || error?.message;

        errorToast(errMessage);

       },
       onSuccess:(response)=>{
        console.log(response);
        successToast('Folder created successfuly')
        reset()
        setValue("folderName", "")
       }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
            <div className="mt-2">
            <label>Folder Name</label>
              <Input
                size="large"
                placeholder="Enter Folder Name"
                status={errors.folderName ? "error" : ""}
                {...register("folderName", {
                  required: "This field is required",
                })}
                onChange={(e) => setValue("folderName", e.target.value)}
              />
            </div>
          
        </div>
        <div className="flex justify-between pb-5">
          {/* <Button
            type="submit"
            className={`bg-[#5A6ACF] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase ml-auto `}
            loading={isPending}
          >
            Save
          /> */}
          <ConfigProvider theme={{
                token: {
                    colorPrimary: "#5A6ACF",
                },
            }}>
                <Button htmlType="submit" type="primary" size="large" className="ml-auto" loading={isPending}>
                Save
                </Button>
            </ConfigProvider>
        </div>
      </form>
    </>
  );
};

export default FolderForm;
