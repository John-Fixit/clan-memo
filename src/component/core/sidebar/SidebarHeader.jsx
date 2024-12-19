// import { Avatar, Badge } from "antd";
// import { IoNotifications } from "react-icons/io5";

// const SidebarHeader = () => {

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="relative">
//             <label htmlFor="Search" className="sr-only">
//               Search
//             </label>
//             <input
//               type="text"
//               id="Search"
//               placeholder="Search"
//               className="w-96 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm outline-none bg-[#F6F6FB] px-4 placeholder:text-[12px] placeholder:text-[#1F384C]"
//             />

//             <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
//               <button
//                 type="button"
//                 className="text-[#627B87] hover:text-[#627B87]"
//               >
//                 <span className="sr-only">Search</span>

//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="1.5"
//                   stroke="currentColor"
//                   className="size-4"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//                   />
//                 </svg>
//               </button>
//             </span>
//           </div>
//         </div>
//         <div className="flex items-center gap-x-4 pe-5">
//           <div className="flex items-center gap-x-2">
//                 <Avatar
//               style={{
//                 backgroundColor: '#fde3cf',
//                 color: '#f56a00',
//               }}
//             >
//               U
//             </Avatar>
//             <span>John Doe</span>
//           </div>
//           <Badge dot>
//               <IoNotifications className="text-[#B0C3CC]" size={20}/>
//           </Badge>
//         </div>

//       </div>
//     </>
//   );
// };

// export default SidebarHeader;

import { Avatar, Badge, Button, ConfigProvider } from "antd";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/ncaa_logo.png";

const SidebarHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center py-3 shadow lg:px-28 px-5">
        <div className="flex gap-x-2 items-center">
          <img
            src={logo}
            alt="communeety logo"
            width={50}
            onClick={() => navigate("/")}
          />
          <div className="relative hidden md:block">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="Search"
              placeholder="Search"
              className="w-96 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm outline-none bg-[#F6F6FB] px-4 placeholder:text-[12px] placeholder:text-[#1F384C]"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-[#627B87] hover:text-[#627B87]"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4 pe-5">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBorderColor: "#DDE4F0",
                  defaultBg: "#FBFCFE",
                  defaultHoverBg: "#FBFCFE",
                  defaultHoverColor: "#5A6ACF",
                },
              },
            }}
          >
            <Button
              onClick={() => navigate("/memo")}
              className="text-[13px] tracking-[0.5px] leading-[20px] font-medium rounded-[5px]"
            >
              Memo
            </Button>
          </ConfigProvider>

          <div className="flex items-center gap-x-2">
            <Avatar
              style={{
                backgroundColor: "#fde3cf",
                color: "#f56a00",
              }}
            >
              U
            </Avatar>
            <span>John Doe</span>
          </div>
          <Badge dot>
            <IoNotifications className="text-[#B0C3CC]" size={20} />
          </Badge>
        </div>
      </div>
    </>
  );
};

export default SidebarHeader;
