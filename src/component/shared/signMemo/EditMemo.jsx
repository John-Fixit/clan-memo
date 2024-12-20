import { Input } from "antd";
import ReactQuill from "react-quill";
import PropTypes from 'prop-types';

const quillModules = {
  // Add any custom modules if needed
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const EditMemo = ({memoContent, memoSubject, setMemoContent, setMemoSubject}) => {

  return (
    <>
      <div className="mb-4">
        <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
          Subject
        </label>
        <Input
          size="large"
          placeholder="Subject"
          // status={errors.subject ? "error" : ""}
          // defaultValue={getValues("subject")}
          // {...register("subject", {
          //   required: "This field is required",
          // })}
          value={memoSubject}
          onChange={(e) => {
           setMemoSubject(e.target.value)
          }}
        />
        {/* <small className="text-danger-500">{ touchedFields.subject && errors?.subject?.message}</small> */}
      </div>
      <div className="mb-4">
        <label htmlFor="" className="tracking-[0.5px] leading-[22px]">
          Body
        </label>
        <div className="flex flex-col rounded mb-4">
          <ReactQuill
            //   ref={quillRef}
            theme="snow"
              value={memoContent}
            placeholder="Write Something Here..."
              onChange={(value) => {
                setMemoContent(value);
              }}
            style={{ height: "500px" }}
            className="flex-1 border-none h-[280px] rounded-md w-full"
            modules={quillModules}
          />
        </div>
      </div>
    </>
  );
};

EditMemo.propTypes = {
  memoContent: PropTypes.string.isRequired,
  memoSubject: PropTypes.string.isRequired,
  setMemoContent: PropTypes.func.isRequired,
  setMemoSubject: PropTypes.func.isRequired,
};

export default EditMemo;
