import { Avatar } from "@nextui-org/react";
import moment from "moment";

import propTypes from "prop-types";
import { BsEnvelopePaper } from "react-icons/bs";
import { filePrefix } from "../../../utils/filePrefix";

const MemoNoteHistory = ({ memoNote }) => {
  console.log(memoNote);
  return (
    <div>
      {memoNote?.length > 0 ? (
        memoNote.map((note, i) => (
          <div
            key={i}
            className="p-6 pb-3 rounded border bg-white shadow mt-4 min-h-[5rem]"
          >
            <div className="flex gap-3 mb-2">
              <Avatar
                isBordered
                src={note?.FILE_NAME ? filePrefix + note?.FILE_NAME : null}
              />
              <div className="">
                <p className="text-md leading-3 font-medium">
                  {note?.LAST_NAME} {note?.FIRST_NAME}
                </p>

                <span className=" text-xs tracking-wider text-gray-400">
                  {moment(note?.TIME_REQUESTED).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </span>
              </div>
            </div>

            {note?.NOTE_CONTENT ? (
              <p
              className="text-default-800"
              >{note?.NOTE_CONTENT}</p>
            ) : (
              <p>...</p>
            )}
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-2  items-center justify-center h-full pt-5 ">
          <BsEnvelopePaper className="text-gray-300" size={40} />
          <span className=" text-default-400 font-bold text-lg">
            Empty Note Records
          </span>
        </div>
      )}
    </div>
  );
};

MemoNoteHistory.propTypes = {
  memoNote: propTypes.any,
};
export default MemoNoteHistory;
