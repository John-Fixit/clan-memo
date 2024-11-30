import "../../../assets/styles/sidebar.css";
import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import PropTypes from "prop-types";
import useWindowSize from "../../../hooks/useWindowSize";
import { MenuIcon } from "../../shared/svg_icons";
import SidebarHeader from "./SidebarHeader";
import { CiMemoPad } from "react-icons/ci";

const Sidebar = ({ visible, show })=> {


  const activePath = useLocation().pathname;

  const current_page = activePath.split("/").pop()?.replace(/_/g, " ");

  const menus = [
    { path: "/memo", name: "Memo", icon: CiMemoPad },
  ];

  const screenWidth = useWindowSize().width;

  

  useEffect(() => {
    if (screenWidth >= 900) {
      show(true);
    }
  }, [screenWidth, show]);

  const mdScreenRange = useMemo(() => {
    return screenWidth < 900 && screenWidth > 450;
  }, [screenWidth]);

  return (
    <>
      <div className="mobile-nav lg:ps-[18%] md:py-3 py-4 ps-3 md:ps-0 pe-3 md:shadow-sm shadow">
        <div
          className={`flex items-center ${
            mdScreenRange && !visible ? "ms-[10vh]" : ""
          }`}
        >
          {screenWidth < 451 && (
            <button className="mobile-nav-btn" onClick={() => show(!visible)}>
              <MenuIcon clicked={visible} size={40} />
            </button>
          )}
          <div className="w-full md:ps-5 ps-8">
            <div className="md:block hidden">
              <SidebarHeader />
            </div>
          </div>
        </div>
      </div>
      <nav className={`sidebar_nav ${visible ? "" : "sidebar"}`}>
        <div className="flex flex-col mt-5">
          <div className="flex justify-between ps-3">
            <div className="flex gap-3 items-center pb-3">
              <div
                style={{
                  height: "46px",
                  width: "46px",
                  borderRadius: "50%",
                  backgroundColor: "#5A6ACF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFF",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                KI
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className="font-bold my-auto line-clamp-1 uppercase text-[16px] text-[#5A6ACF]"
                >
                  FIXIT
                </p>
              </div>
            </div>
            {screenWidth < 900 && (
              <button className="mobile-nav-btn" onClick={() => show(!visible)}>
                <MenuIcon clicked={visible} size={40} />
              </button>
            )}
          </div>
          <hr className="border-0 h-[1px] bg-[#7D83984D] my-3" />
          <div
            className={`flex flex-col ${
              mdScreenRange && !visible ? "px-1" : "px-3"
            }`}
          >
            <Link
              to={""}
              className={`p-3 rounded no-underline ${ activePath === "/" ? "text-[#5A6ACF] bg-[#e2e4eb] font-medium" : "text-[#A6ABC8]" } flex ${
                mdScreenRange && !visible ? "flex-row-reverse" : ""
              } items-center gap-2 font-medium text-[16px]`}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
              onClick={() => {
                window.innerWidth < 768 && show(!visible);
              }}
            >
              <RiDashboardHorizontalFill
                size={"3vh"}
                sx={{ color: "#ACA9BB" }}
              />
              {mdScreenRange && !visible ? "" : "Dashboard"}
            </Link>
          </div>
          <hr className="border-0 h-[1px] bg-[#7D83984D] my-3" />
          <div
            className={`flex flex-col mt-3 mb-3 ${
              mdScreenRange && !visible ? "px-1" : "px-3"
            }`}
          >
            {menus?.map((item, index) => (
              <Link
                key={index + "__menu__"}
                to={item?.path}
                className={`p-3 rounded no-underline ${ activePath === item?.path ? "text-[#5A6ACF] bg-[#e2e4eb] font-medium" : "text-[#A6ABC8]" } tracking-wider font-[300] text-[16px] flex ${
                  mdScreenRange && !visible ? "flex-row-reverse" : ""
                } items-center gap-2 `}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
                onClick={() => {
                  window.innerWidth < 768 && show(!visible);
                }}
              >
                <item.icon size={20} style={{ color: "#A6ABC8" }} />
                {mdScreenRange && !visible ? "" : item?.name}
              </Link>
            ))}
          </div>
        </div>
        
      </nav>

    </>
  );
}



export default Sidebar;



Sidebar.propTypes = {
    visible: PropTypes.bool,
    show: PropTypes.func
}