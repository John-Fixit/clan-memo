import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../assets/styles/mainLayout.css";
import useWindowSize from "../../hooks/useWindowSize";
import SidebarHeader from "../../component/core/sidebar/SidebarHeader";
import MemoDrawer from "../../component/core/memo/MemoDrawer";

const MainLayout = () => {
  const [navIsOpen, setNavIsOpen] = useState(true);
  const windowSize = useWindowSize({});
  const handleOpenNav = (param) => {
    setNavIsOpen(param);
  };
  useEffect(() => {
    if (window.innerWidth < 768) {
      setNavIsOpen(false);
    }
  }, []);

  const activePath = useLocation().pathname;

  const current_page = activePath.split("/").pop()?.replace(/_/g, " ");

  return (
    <>
      <main>
        <SidebarHeader />
        <section
          className={`lg:!px-28 !px-5 ${
            !navIsOpen ? "page no_sidebar" : "page page-with-navbar"
          }`}
          onClick={() => {
            if (windowSize.width < 768) {
              navIsOpen && handleOpenNav(false);
            }
          }}
        >
          <div className="">
            <div className="my-5">
              <h3 className="text-[22px] font-medium leading-[23px] tracking-[0.5px] text-[#1F384C] capitalize">
                {current_page}
              </h3>
            </div>
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </section>
      </main>



      <MemoDrawer />
    </>
  );
};

export default MainLayout;
