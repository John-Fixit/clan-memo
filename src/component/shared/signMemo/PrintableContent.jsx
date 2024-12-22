import moment from "moment";
import logo from "../../../assets/images/ncaa_logo.png";
import Stamp from "../../core/memo/stamp";
import PropTypes from "prop-types";
const PrintableContent = ({
  contentRef,
  formattedRecipients,
  memoDetail,
  memoApprovers,
  toPrint,
}) => {
  return (
    <main className={toPrint ? "hidden" : ""}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${logo})`,
          backgroundSize: "600px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        ref={contentRef}
        className={toPrint ? "py-20 px-12" : ""}
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
                {
                    toPrint ? (
                    <tr>
                        <td className="font-semibold uppercase ">To: </td>
                        <td className="leading-5">{formattedRecipients}</td>
                    </tr>
                    ): null
                }
              <tr>
                <td className="font-semibold uppercase">From: </td>
                <td className="font-medium">{memoDetail?.MEMO_FROM}</td>
              </tr>
              <tr>
                <td className="font-semibold uppercase ">Date: </td>
                <td className="font-medium">
                  {moment(memoDetail?.DATE_CREATED)?.format("MMMM DD, YYYY")}
                </td>
              </tr>
              <tr>
                <td className="font-semibold uppercase ">Subject: </td>
                <td className="font-bold text-base ">{memoDetail?.SUBJECT}</td>
              </tr>
            </tbody>
          </table>
          <hr className="my-3 border-t-2 border-gray-500 w-full" />
        </div>
        <div className="body_of_memo !text-black !text-md transition-all duration-700 ease-in-out">
          <div
            className="text-[0.9rem] leading-6 text-justify text-default-900 rendered-html-content"
            dangerouslySetInnerHTML={{
              __html: memoDetail?.MEMO_CONTENT,
            }}
          />

          <br />
        </div>
        <div className="mt-10 mb-5">
          <div className="flex gap-x-9 gap-y-14 flex-wrap items-end">
            {memoApprovers?.map((item, index) =>
              item?.IS_APPROVED ? (
                <div
                  className="flex flex-col items-center justify-start gap-y-1 mt-2 relative"
                  key={index + "_"}
                >
                  <div className="border-b-1 flex justify-center border-b-black w-full min-w-48">
                    {item?.APPROVERS?.SIGNATURE && (
                      <img
                        src={item?.APPROVERS?.SIGNATURE}
                        alt=""
                        style={{
                          height: "50%",
                          width: "50%",
                        }}
                      />
                    )}
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
                    {item?.APPROVERS?.FIRST_NAME} {item?.APPROVERS?.LAST_NAME}
                  </span>

                  <div className="absolute bottom-[4.1rem]">
                    <Stamp
                      designation={
                        item?.APPROVERS?.RANK || item?.APPROVERS?.DEPARTMENT
                      }
                      date={moment(item?.DATE_DONE)?.format("DD MMM YYYY")}
                    />
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

PrintableContent.propTypes = {
  contentRef: PropTypes.any,
  formattedRecipients: PropTypes.any,
  memoDetail: PropTypes.any,
  memoApprovers: PropTypes.array,
  toPrint: PropTypes.bool,
};

export default PrintableContent;
