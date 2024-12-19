/* eslint-disable no-unused-vars */
import { Input } from "antd";
import { useForm } from "react-hook-form";


const FolderForm = () => {


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(
    {
      defaultValues: {
        folderName: "",
      },
    }
  );

  const onSubmit = (data) => {
    console.log(data);
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
                status={errors.senderName ? "error" : ""}
                {...register("senderName", {
                  required: "This field is required",
                })}
              />
            </div>
          
        </div>
        <div className="flex justify-between pb-5">
          <button
            type="submit"
            className={`bg-[#5A6ACF] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase ml-auto `}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default FolderForm;
