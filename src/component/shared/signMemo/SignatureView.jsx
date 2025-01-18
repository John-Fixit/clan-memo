/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { PiSignatureLight } from "react-icons/pi";
import SignaturePad from "react-signature-canvas";
import { Button, ConfigProvider } from "antd";
import { ImCancelCircle } from "react-icons/im";

const SignatureView = ({ sigCanvas, clear, save, setSignatureFileString, activeTab, setActiveTab }) => {
 

  const [fileSelected, setFileSelected] = useState(null);

  /// tabs
  const tabData = [
    {
      id: "create",
      label: "Create Signature",
      content: "Requiring Promotion",
    },
    {
      id: "upload",
      label: "Upload Signature",
      content: "Requiring Promotion",
    },
  ];
  const handleTabChange = (item) => {
    setActiveTab(item);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

  const handleSelectFile=async(e)=>{
    const file = e.target.files[0];

    if (file) {

      const base64 = await toBase64(file);

      setSignatureFileString(base64);
      setFileSelected(base64);
    }

  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center flex-col">
          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Dynamic tabs"
              items={tabData}
              color="primary"
              variant="underlined"
              fullWidth={true}
              onSelectionChange={handleTabChange}
              classNames={{
                tabList:
                  "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#22d3ee]",
                tabContent: "group-data-[selected=true]:text-[#06b6d4]",
              }}
            >
              {(item) => (
                <Tab
                  key={item.id}
                  title={item.label}
                  className="px-0 font-medium font-Exotic text-base leading-3"
                >
                </Tab>
              )}
            </Tabs>
          </div>
          {activeTab === tabData[0].id ? (
            <div>
              <div className="flex justify-end mt-3">
                {
                  sigCanvas?.current && (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "",
                    },
                  }}
                >
                  <Button
                    className="mb-2"
                    onClick={clear}
                    icon={<ImCancelCircle color="red" size={15} />}
                  >
                  </Button>
                </ConfigProvider>
                  )
                }
              </div>
              <SignaturePad
                ref={sigCanvas}
                canvasProps={{
                  width: "425",
                  height: 200,
                  className: "border border-gray-500 rounded",
                  style: {
                    cursor: "grabbing",
                  },
                }}
              />
              {/* Button to trigger save canvas image */}
            </div>
          ) : (
            <div className="flex justify-center flex-col gap-4 mt-4 min-h-32 items-center">
              <label htmlFor="signatureFileID">
                <div className="p-2 rounded border text-center cursor-pointer">
                  Upload Signature
                </div>
                <input type="file" accept="image/*" id="signatureFileID" onChange={handleSelectFile} className="hidden"/>
              </label>
              {
                fileSelected && (
                  <img src={fileSelected} width={70} height={70} alt="" />
                )
              }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignatureView;
