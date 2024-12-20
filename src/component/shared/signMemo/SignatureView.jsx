/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { PiSignatureLight } from "react-icons/pi";
import SignaturePad from "react-signature-canvas";
import { Button, ConfigProvider } from "antd";
import { ImCancelCircle } from "react-icons/im";

const SignatureView = ({ sigCanvas, clear, save, setUploadData }) => {
  const [activeTab, setActiveTab] = useState("");

  /// tabs
  const tabData = [
    {
      id: "create",
      label: "Create Signature",
      content: "Requiring Promotion",
    },
    // {
    //   id: "upload",
    //   label: "Upload Signature",
    //   content: "Requiring Promotion",
    // },
  ];
  const handleTabChange = (item) => {
    setActiveTab(item);
  };

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
                // tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#06b6d4]",
              }}
            >
              {(item) => (
                <Tab
                  key={item.id}
                  title={item.label}
                  className="px-0 font-medium font-Exotic text-base leading-3"
                >
                  {/* {activeTab === tabData[0].id && (
                    <div className="flex justify-center items-center">
                      <PiSignatureLight size={25} />
                      <span className="text-l font-bold ml-3">
                        Create signature
                      </span>
                    </div>
                  )} */}
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
            <>
              Add your signature
              {/* <AttachmentApproval setInformation={setUploadData}  /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SignatureView;
