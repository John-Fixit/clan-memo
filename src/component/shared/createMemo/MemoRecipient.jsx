import { Avatar, Select, Space } from "antd";
import PropTypes from "prop-types"


const selectData = [{"STAFF_ID":1,"FIRST_NAME":"Admin","LAST_NAME":"Africacodes","STAFF_NUMBER":null,"DESIGNATION":null,"FILE_NAME":"315814496_230283670043609_6530875609273764186_n.jpg","value":1,"label":"Admin Africacodes "},{"STAFF_ID":4645,"FIRST_NAME":"Oluwasanmi","LAST_NAME":"Ajayi","STAFF_NUMBER":"NCAA/P.2291","DESIGNATION":null,"FILE_NAME":"Passport Photo 1.jpg","value":4645,"label":"Oluwasanmi Ajayi "},{"STAFF_ID":4621,"FIRST_NAME":"Saleh","LAST_NAME":"Usman","STAFF_NUMBER":"NCAA/P.2260","DESIGNATION":null,"FILE_NAME":null,"value":4621,"label":"Saleh Usman "},{"STAFF_ID":4638,"FIRST_NAME":"Barbara ","LAST_NAME":"Ajenge","STAFF_NUMBER":"NCAA/P.2281","DESIGNATION":null,"FILE_NAME":null,"value":4638,"label":"Barbara  Ajenge "},{"STAFF_ID":4651,"FIRST_NAME":"Fadimatu","LAST_NAME":"Abubakar","STAFF_NUMBER":"NCAA/P.2297","DESIGNATION":null,"FILE_NAME":null,"value":4651,"label":"Fadimatu Abubakar "},{"STAFF_ID":4652,"FIRST_NAME":"Shuibu","LAST_NAME":"Ibrahim","STAFF_NUMBER":"NCAA/P.2318","DESIGNATION":null,"FILE_NAME":null,"value":4652,"label":"Shuibu Ibrahim "},{"STAFF_ID":4654,"FIRST_NAME":"Salim","LAST_NAME":" Balarabe","STAFF_NUMBER":"NCAA/P.2304","DESIGNATION":null,"FILE_NAME":null,"value":4654,"label":"Salim  Balarabe "},{"STAFF_ID":4657,"FIRST_NAME":"Musa","LAST_NAME":"Fannami","STAFF_NUMBER":"NCAA/P.2293","DESIGNATION":null,"FILE_NAME":null,"value":4657,"label":"Musa Fannami "},{"STAFF_ID":4660,"FIRST_NAME":"Abdulrahman","LAST_NAME":"Ahmad","STAFF_NUMBER":"NCAA/P.2302","DESIGNATION":null,"FILE_NAME":null,"value":4660,"label":"Abdulrahman Ahmad "},{"STAFF_ID":4661,"FIRST_NAME":"Sani","LAST_NAME":"Hussein","STAFF_NUMBER":"NCAA/P.2315","DESIGNATION":null,"FILE_NAME":null,"value":4661,"label":"Sani Hussein "},{"STAFF_ID":4663,"FIRST_NAME":"Israel","LAST_NAME":"Tayani","STAFF_NUMBER":"NCAA/P.2319","DESIGNATION":null,"FILE_NAME":null,"value":4663,"label":"Israel Tayani "},{"STAFF_ID":4664,"FIRST_NAME":"Aisha","LAST_NAME":"Abubakar","STAFF_NUMBER":"NCAA/P.2300","DESIGNATION":null,"FILE_NAME":null,"value":4664,"label":"Aisha Abubakar "},{"STAFF_ID":4665,"FIRST_NAME":"Queen","LAST_NAME":"Okoro","STAFF_NUMBER":"NCAA/P.2307","DESIGNATION":null,"FILE_NAME":null,"value":4665,"label":"Queen Okoro "},{"STAFF_ID":4666,"FIRST_NAME":"Zacharia ","LAST_NAME":"Ahmadu","STAFF_NUMBER":"NCAA/P.2301","DESIGNATION":null,"FILE_NAME":null,"value":4666,"label":"Zacharia  Ahmadu "},{"STAFF_ID":4669,"FIRST_NAME":"Foluseke","LAST_NAME":"Olujimi","STAFF_NUMBER":"NCAA/P.2320","DESIGNATION":null,"FILE_NAME":null,"value":4669,"label":"Foluseke Olujimi "},{"STAFF_ID":4670,"FIRST_NAME":"Lateefa","LAST_NAME":"Onuche","STAFF_NUMBER":"NCAA/P.2314","DESIGNATION":null,"FILE_NAME":null,"value":4670,"label":"Lateefa Onuche "},{"STAFF_ID":4671,"FIRST_NAME":"Rebeccah","LAST_NAME":"Timothy","STAFF_NUMBER":"NCAA/P.2311","DESIGNATION":null,"FILE_NAME":null,"value":4671,"label":"Rebeccah Timothy "},{"STAFF_ID":4672,"FIRST_NAME":"Ibrahim","LAST_NAME":"Abubakar","STAFF_NUMBER":"NCAA/P.2308","DESIGNATION":null,"FILE_NAME":null,"value":4672,"label":"Ibrahim Abubakar "},{"STAFF_ID":4673,"FIRST_NAME":"Joy","LAST_NAME":"Adeleye","STAFF_NUMBER":"NCAA/P.2322","DESIGNATION":null,"FILE_NAME":null,"value":4673,"label":"Joy Adeleye "},{"STAFF_ID":4675,"FIRST_NAME":"Abdulrazak","LAST_NAME":"Sani","STAFF_NUMBER":"NCAA/P.2317","DESIGNATION":null,"FILE_NAME":null,"value":4675,"label":"Abdulrazak Sani "}]

const MemoRecipient = ( {watch, setValue, getValues, register} ) => {
  const recipientOptions = [
    { label: "STAFF", value: "STAFF" },
    { label: "DEPARTMENT", value: "DEPARTMENT" },
    { label: "UNIT", value: "UNIT" },
    { label: "DIRECTORATE", value: "DIRECTORATE" },
    { label: "REGION", value: "REGION" },
  ];


  const recipient_type = watch("recipient_type");

  return (
    <>
      <div className="mb-4">
        <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
          Recipient Category
        </label>
        <Select
          size={"large"}
          placeholder="Select Recipient"
          value={getValues("recipient_type")}
            {
                ...register("recipient_type", {
                    required: "This field is required",
                })
            }
            onChange={(value)=>setValue("recipient_type", value)}
          className="border-1 border-gray-300 rounded-md"
          style={{
            width: "100%",
          }}
          variant="borderless"
          options={recipientOptions}
        />
      </div>

      { watch("recipient_type") && (
        <div className="_compose_to mb-4">
          <label htmlFor="" className="tracking-[0.5px] leading-[22px]">Select Recipient</label>
          <Select
            labelInValue
            mode={recipient_type === "STAFF" ? "multiple" : ""}
            // maxCount={selectedRecipient === 'STAFF' ? 100 : 1}
            size={"large"}
            placeholder="Search Recipient"
            // onChange={onSelectrecipient}
            className="border-1 border-gray-300 rounded-md"
            style={{
              width: "100%",
            }}
            // value={watch("recipient_type") === "STAFF" ? data?.recipients : data?.recipient_value}
            optionFilterProp="label"
            // loading={isLoading}
            variant="borderless"
            options={selectData}
            optionRender={(user) => (
              <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
                {recipient_type === "STAFF" ? (
                  <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                    {user?.data?.FILE_NAME?.includes("http") ? (
                      <Avatar
                        alt={user?.data?.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={user?.data?.FILE_NAME}
                      />
                    ) : (
                      <Avatar
                        alt={user?.data?.name}
                        className="flex-shrink-0"
                        size="sm"
                        name={user?.data?.label?.trim()[0]}
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {user?.data?.label}
                      </span>
                    </div>
                  </div>
                ) : recipient_type === "UNIT" ||
                  recipient_type === "DIRECTORATE" ||
                  recipient_type === "DEPARTMENT" ||
                  recipient_type === "REGION" ? (
                  <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {user?.data?.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center text-gray-600"></div>
                )}
              </Space>
            )}
          />
        </div>
      )}



    </>
  );
};

export default MemoRecipient;


MemoRecipient.propTypes = {
    watch: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    getValues: PropTypes.func.isRequired,
    register: PropTypes.any,
}
