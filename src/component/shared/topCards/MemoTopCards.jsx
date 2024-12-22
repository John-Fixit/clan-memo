/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { IoDocumentOutline } from "react-icons/io5";
import StarLoader from "../../core/loaders/StarLoader";
import { MdOutlineCancel, MdOutlineCheckCircle, MdOutlinePending } from "react-icons/md";
import { LiaFirstdraft } from "react-icons/lia";
import { RiFileCheckLine } from "react-icons/ri";

const MemoTopCards = ({ setSelected, selected, grid, statusData }) => {
  const handleSelect = (val) => {
    setSelected(val);
  };

  const memoData = [
    {
      name: "Total",
      key: "",
      icon: IoDocumentOutline,
      b_color: "bg-amber-100",
      t_color: "text-amber-600",
    },
    {
      name: "Pending",
      key: "pending",
      icon: MdOutlinePending,
      b_color: "bg-cyan-100",
      t_color: "text-cyan-600",
    },

    {
      name: "Draft",
      key: "draft",
      icon: LiaFirstdraft,
      b_color: "bg-purple-100",
      t_color: "text-purple-600",
    },
    {
      name: "Approved",
      key: "approved",
      icon: RiFileCheckLine,
      b_color: "bg-green-100",
      t_color: "text-green-600",
    },
    {
      name: "Declined",
      key: "declined",
      icon: MdOutlineCancel,
      b_color: "bg-red-100",
      t_color: "text-red-600",
    },
  ];


  return (
    <>
      <div
        className={`grid grid-cols-1 gap-4 ${
          grid === 4 ? "lg:grid-cols-4 md:grid-cols-2" : "lg:grid-cols-2"
        } lg:gap-6`}
      >
        {memoData?.map((item, index) => {
          return (
            statusData?.[item?.key] &&
            <motion.div
              key={index}
              className={`py-4 -top border-[1px] border-[#dfe2e6] transition-background ${
                selected === item?.key ? "bg-default-100" : "bg-white"
              } shadow flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3 cursor-pointer`}
              onClick={() => handleSelect(item?.key)}
              style={{
                boxShadow:
                  "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${item?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <item.icon
                    size={25}
                    className={`!font-bold ${item.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                  {item?.name}
                </span>
              </div>
              <span className="text-[15px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                {
                  statusData?.[item?.key]?.loading ? (
                    <StarLoader size={20}/>
                  ): statusData?.[item?.key]?.count || 0
                }
              </span>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default MemoTopCards;