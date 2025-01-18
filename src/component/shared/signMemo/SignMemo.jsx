/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "../../../assets/styles/signMemo.module.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import SignatureView from "./SignatureView";
import { MdSaveAlt } from "react-icons/md";
import {
  Modal,
  Result,
  Button as AntButton,
  ConfigProvider,
  Input,
} from "antd";
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import StarLoader from "../../core/loaders/StarLoader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useCheckSignature } from "../../../services/API/signature";
import { uploadFileData } from "../../../utils/uploadFile";
import { useApproveMemo } from "../../../services/API/memo";
import { errorToast, successToast } from "../../../utils/toastPopUp";
import { useViewMemoHook } from "../../../hooks/useViewMemoHook";
import EditMemo from "./EditMemo";
import { useReactToPrint } from "react-to-print";
import PrintableContent from "./PrintableContent";

const TextArea = Input.TextArea;

const SignMemo = ({
  getMemoLoading,
  isError,
  memoDetail,
  memoApprovers,
  selfMemo,
  is_approve,
  memo,
}) => {
  const { userData } = useCurrentUser();

  const { data: getSignature } = useCheckSignature({
    approving_staff_id: userData?.data?.STAFF_ID,
  });

  const maxRecipientDisplay = 2;

  const displayedNames = memoDetail?.RECIPIENT?.slice(
    0,
    maxRecipientDisplay
  ).map((recipient) => `${recipient?.FIRST_NAME} ${recipient?.LAST_NAME}`);

  const extraCount = memoDetail?.RECIPIENT?.length - maxRecipientDisplay;

  const formattedRecipients =
    extraCount > 0
      ? `${displayedNames?.join(", ")} and +${extraCount} others`
      : displayedNames?.join(", ");

  const contentRef = useRef();


  const [isLoading, setIsLoading] = useState(false);


  const [isEdit, setIsEdit] = useState(false);

  const [activeTab, setActiveTab] = useState("");

  const [signatureFileString, setSignatureFileString] = useState(null);

  const hasSignature = getSignature?.SIGNATURE;

  const [openApprove, setOpenApprove] = useState(false);

  const [confirmationNote, setConfirmationNote] = useState("");
  const [memoContent, setMemoContent] = useState(
    memoDetail?.MEMO_CONTENT || ""
  );
  const [memoSubject, setMemoSubject] = useState(memoDetail?.SUBJECT || "");
  const [isApprove, setIsApprove] = useState(null);

  useEffect(() => {
    if (memoDetail) {
      setMemoSubject(memoDetail.SUBJECT);
      setMemoContent(memoDetail?.MEMO_CONTENT);
    }
  }, [memoDetail]);

  const { mutateAsync } = useApproveMemo(isApprove);
  const { handleCloseMemo } = useViewMemoHook();

  const sigCanvas = useRef({});

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  const confirmApproveOrDecline = async (signatureID) => {
    const payload = {
      decline: {
        staff_id: userData?.data?.STAFF_ID,
        memo_id: memoDetail?.MEMO_ID,
        note: confirmationNote,
      },
      approve: {
        staff_id: userData?.data?.STAFF_ID,
        memo_id: memoDetail?.MEMO_ID,
        memo_content: memoContent,
        memo_subject: memoSubject,
        memo_signature: signatureID,
        note: confirmationNote,
      },
    };
    if (!signatureID) {
      errorToast("Please provide a signature");
      return;
    }

    try {
      const res = await mutateAsync(
        isApprove ? payload.approve : payload.decline
      );
      successToast(res?.message);
      if (!hasSignature) {
        clear();
      }
      setIsApprove(false)
      setConfirmationNote("");
      setSignatureFileString(null);

      handleCloseDrawer();
      handleCloseMemo();
      setIsEdit(false);
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message;
      errorToast(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /* a function that uses the canvas ref to trim the canvas
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = async () => {
    setIsLoading(true);
    if (hasSignature) {
      confirmApproveOrDecline(hasSignature);
    } else {
      const base64String = sigCanvas.current
        ?.getTrimmedCanvas()
        ?.toDataURL("image/png");
      // // Convert data URL to Blob
      const blob = dataURItoBlob(activeTab==="create"? base64String : activeTab==="upload" &&signatureFileString);

      const file = new File([blob], "signature.png", { type: "image/png" });

      const res = await uploadFileData(file, userData?.token);


      confirmApproveOrDecline(res?.file_url_id);
    }
  };

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    return blob;
  }



  const downloadPDF = useReactToPrint({ contentRef })

  // const downloadPDF = () => generatePDF(contentRef, options);

  const handleCloseDrawer = () => {
    setOpenApprove(false);
  };

  const approveStatus = memoApprovers?.find(
    (item) => item?.APPROVER === userData?.data?.STAFF_ID
  );
  const isApprovedOrDeclined =
    approveStatus?.IS_APPROVED || approveStatus?.IS_DECLINED;


  return (
    <>
      {getMemoLoading ? (
        <main className="h-32 flex items-center justify-center">
          <StarLoader />
        </main>
      ) : isError ? (
        <Result
          status={"error"}
          title={<p className="font-[300] text-[18px]">An error occurred</p>}
        />
      ) : (
        <>
          <div
            className={`flex-1 p-3 mb-5 overflow-y-scroll ${styles.custom_scrollbar}`}
          >
            <div className="bg-white relative">
              <div className="absolute top-2 right-2 mb-3 flex gap-3">
                {is_approve && !isApprovedOrDeclined && (
                  <button
                    className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[4px] mx-2 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    {isEdit ? "Undo" : "Edit"}
                  </button>
                )}
                {selfMemo && (
                  <>
                      <ConfigProvider theme={{
                        token: {
                          
                            colorPrimary: "#5A6ACF",
                          
                        }
                      }}>
                        <AntButton
                          size="sm"
                          onClick={downloadPDF}
                          className="bg-purple-100 hover:!bg-purple-100 hover:!text-purple-600 text-purple-600"
                          icon={<MdSaveAlt size={"1.3rem"} />}
                        />
                      </ConfigProvider>
                  </>
                )}
              </div>
              {isEdit ? (
                <EditMemo
                  memoContent={memoContent}
                  memoSubject={memoSubject}
                  setMemoContent={setMemoContent}
                  setMemoSubject={setMemoSubject}
                />
              ) : (
                <>
                <PrintableContent contentRef={contentRef} memoDetail={memoDetail} memoApprovers={memoApprovers} formattedRecipients={formattedRecipients}/>
                <PrintableContent contentRef={contentRef} memoDetail={memoDetail} memoApprovers={memoApprovers} formattedRecipients={formattedRecipients} toPrint={true}/>
                </>
              )}
            </div>
          </div>

          {is_approve && !isApprovedOrDeclined && (
            <div className="flex justify-between">
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "red",
                  },
                }}
              >
                <AntButton
                  type="primary"
                  onClick={() => {
                    setOpenApprove(true);
                  }}
                >
                  Decline
                </AntButton>
              </ConfigProvider>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#5A6ACF",
                  },
                }}
              >
                <AntButton
                  type="primary"
                  onClick={() => {
                    setIsApprove(true);
                    setOpenApprove(true);
                  }}
                >
                  Approve
                </AntButton>
              </ConfigProvider>
            </div>
          )}
        </>
      )}

      <ExpandedDrawer
        isOpen={openApprove}
        onClose={handleCloseDrawer}
        maxWidth={500}
        title={
          <div className="text-center">
            Confirm {isApprove ? "Approve" : "Decline"}
          </div>
        }
      >
        <div>
          {(isApprove && !hasSignature) && (
            <>
              <SignatureView save={save} clear={clear} sigCanvas={sigCanvas} setSignatureFileString={setSignatureFileString} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </>
          )}
          <div className="mt-3">
            <TextArea
              placeholder="Add Note here"
              onChange={(e) => setConfirmationNote(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end mt-5 w-full">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5A6ACF",
              },
            }}
          >
            <AntButton
              size="large"
              type="primary"
              onClick={save}
              loading={isLoading}
            >
              Confirm
            </AntButton>
          </ConfigProvider>
        </div>
      </ExpandedDrawer>
    </>
  );
};

export default SignMemo;
