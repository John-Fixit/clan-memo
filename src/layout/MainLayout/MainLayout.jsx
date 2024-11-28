import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../assets/styles/mainLayout.css";
import useWindowSize from "../../hooks/useWindowSize";
import Sidebar from "../../component/core/sidebar/Sidebar";

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
      <main style={{ backgroundColor: "#FFFFFF" }}>
        <Sidebar visible={navIsOpen} show={handleOpenNav} />
        <section
          className={`md:!px-5 !px-3 ${
            !navIsOpen ? "page no_sidebar" : "page page-with-navbar"
          }`}
          onClick={() => {
            if (windowSize.width < 768) {
              navIsOpen && handleOpenNav(false);
            }
          }}
        >
        <div className="grid grid-cols-3 h-screen">
            <div className="md:col-span-3 px-3">
              <div className="my-5">
                <h3 className="text-[18px] font-medium leading-[23px] tracking-[0.5px] text-[#1F384C] capitalize">{current_page}</h3>
              </div>
              <div className="mt-4">
                <Outlet />
              </div>
            </div>
            {/* <div className="border-s border-gray-300 ps-3 md:block hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti minus cupiditate aperiam debitis fuga dicta ducimus facilis repellat minima in, vero molestias, tempora aut quibusdam impedit! Tenetur magnam cumque dolor?
            </div> */}
        </div>
        </section>
      </main>
    </>
  );
};

export default MainLayout;
