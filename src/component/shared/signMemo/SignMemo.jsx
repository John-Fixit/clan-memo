/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Tooltip } from "@nextui-org/react";
import styles from "../../../assets/styles/signMemo.module.css";
import React, { useState, useRef, useEffect, useMemo } from "react";
import SignatureView from "./SignatureView";
import generatePDF, { Margin } from "react-to-pdf";
import { MdSaveAlt } from "react-icons/md";

import { useDisclosure } from "@nextui-org/react";
import {
  Modal,
  Result,
  Button as AntButton,
  ConfigProvider,
  Input,
} from "antd";
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import AddNote from "../createMemo/AddNote";
import StarLoader from "../../core/loaders/StarLoader";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useCheckSignature } from "../../../services/API/signature";
import { uploadFileData } from "../../../utils/uploadFile";
import { useApproveMemo } from "../../../services/API/memo";
import { errorToast, successToast } from "../../../utils/toastPopUp";
import { useViewMemoHook } from "../../../hooks/useViewMemoHook";
import EditMemo from "./EditMemo";
import Stamp from "../../core/memo/stamp";
import logo from "../../../assets/images/ncaa_logo.png";
import moment from "moment";
import { removeHTMLTagsAndStyles } from "../../../utils/removeHTMLTagsAndStyles";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const [approvals, setApprovals] = useState(memoApprovers || []);
  const [open, setOpen] = useState({ status: false, type: "" });

  const [isEdit, setIsEdit] = useState(false);

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
      console.log(isApprove ? payload.approve : payload.decline)
      const res = await mutateAsync(
        isApprove ? payload.approve : payload.decline
      );
      successToast(res?.message);
      if (!hasSignature) {
        clear();
      }
      setIsApprove(false)
      setConfirmationNote("");

      handleCloseDrawer();
      handleCloseMemo();
      setIsEdit(false);
    } catch (error) {
      console.log(error)
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
        .getTrimmedCanvas()
        .toDataURL("image/png");

      // Convert data URL to Blob
      const blob = dataURItoBlob(base64String);

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


    console.log(memoApprovers)

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
                    <Tooltip
                      content="Download as PDF"
                      className="text-xs"
                    >
                      <AntButton
                        size="sm"
                        onClick={downloadPDF}
                        className="bg-blue-100 text-cyan-600"
                        icon={<MdSaveAlt size={"1.5rem"} />}
                      />
                    </Tooltip>
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
                  {/* <div
                    style={{
                      backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${logo})`,
                      backgroundSize: "600px",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    ref={contentRef}
                    className="px-12 py-20"
                  >
                    <div className="header_address">
                      <div className="flex justify-center items-center gap-x-2">
                        <img
                          src={logo}
                          alt="communeety logo"
                          width={40}
                          className="cursor-pointer"
                        />
                        <span className="font-bold leading-3">
                          Nigeria Civil Aviation Authority
                        </span>
                      </div>
                      <p className="font-semibold  text-2xl my-2 text-center uppercase">
                        Internal Memo
                      </p>
                      <table border={0} className="leading-7 relative">
                        <tbody>
                          <tr>
                            <td className="font-semibold uppercase ">To: </td>
                            <td className="leading-5">{formattedRecipients}</td>
                          </tr>
                          <tr>
                            <td className="font-semibold uppercase">From: </td>
                            <td className="font-medium">
                              {memoDetail?.MEMO_FROM}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold uppercase ">Date: </td>
                            <td className="font-medium">
                              {moment(memoDetail?.DATE_CREATED)?.format(
                                "MMMM DD, YYYY"
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="font-semibold uppercase ">
                              Subject:{" "}
                            </td>
                            <td className="font-bold text-base ">
                              {memoDetail?.SUBJECT}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr className="my-3 border-t-2 border-gray-500 w-full" />
                    </div>
                    <div className="body_of_memo !text-black !text-md">
                      <div
                        className="text-[0.9rem] leading-6 text-justify text-default-900 rendered-html-content"
                        dangerouslySetInnerHTML={{
                          __html: memoDetail?.MEMO_CONTENT,
                        }}
                      />

                      <br />
                    </div>
                    <div className="mt-7 mb-5">
                      <div className="flex gap-x-9 gap-y-14 flex-wrap items-end">
                        {memoApprovers?.map((item, index) =>
                          item?.IS_APPROVED ? (
                            <div
                              className="flex flex-col items-center gap-y-2 relative border"
                              key={index + "_"}
                            >
                              <div className="border-b-1 flex justify-center border-b-black w-full">
                                <img
                                  src={item?.APPROVERS?.SIGNATURE}
                                  alt=""
                                  style={{
                                    height: "50%",
                                    width: "50%",
                                  }}
                                />
                              </div>
                              <div className="mt-2">
                                {item?.APPROVERS?.RANK ? (
                                  <span className="text-xs text-default-700 flex">
                                    {item?.APPROVERS?.RANK}
                                  </span>
                                ) : (
                                  <div className="h-3.5"></div>
                                )}
                              </div>

                              <span className="text-xs text-default-700 flex capitalize">
                                {item?.APPROVERS?.DEPARTMENT?.toLowerCase()}
                              </span>

                              <span className=" text-default-700 flex">
                                {item?.APPROVERS?.FIRST_NAME}{" "}
                                {item?.APPROVERS?.LAST_NAME}
                              </span>

                              <div className="absolute bottom-[4.5rem]">
                                <Stamp
                                  designation={
                                    item?.APPROVERS?.RANK ||
                                    item?.APPROVERS?.DEPARTMENT
                                  }
                                  date={moment(item?.DATE_DONE)?.format(
                                    "DD MMM YYYY"
                                  )}
                                />
                              </div>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div> */}
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
              <SignatureView save={save} clear={clear} sigCanvas={sigCanvas} />
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
