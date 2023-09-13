import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RiLinksLine } from "react-icons/ri";
import { TbBook } from "react-icons/tb";
import { Images } from "../../assets";
import { SideBarButton } from "../../components/sideBarButton/SideBarButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfileImage from "../profile/ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";

function SideBar() {
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const path = useLocation();
  const { pathname } = path;
  console.log("pathname>>", pathname);

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
    console.log("active");
  };

  const navBar = "bg-[#EDF6FC] p-3 rounded-md text-center w-[50%]";
  const navigate = useNavigate();
  const action = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const dispatch = useDispatch();
  const handlelogout = () => {
    dispatch(logout(action));
  };
  return (
    <>
      <div className="lg:block hidden w-[20%]">
        <div className="left-side flex bg-transparent justify-center items-center h-screen w-full">
          <div className="h-[80%] w-[70%] bg-[#E0C5FA] rounded-md">
            <div className="flex items-center px-4 h-[20%] bg-transparent">
              <img
                src={Images.logo}
                className="rounded-[50%] h-16 w-16 object-contain"
              />
            </div>

            <div className="w-full h-full flex justify-center ">
              <div className="h-[75%] flex flex-col w-[85%] bg-white rounded-sm">
                <div className="h-[50%] w-full bg-transparent flex justify-center items-center flex-col">
                  <ProfileImage />
                  <p className="position absolute top-[32%] right-[85%] left-[11%] button-color text-[9px] text-center rounded-2xl px-1">
                    Hello
                  </p>

                  <p className="text-sm font-medium pb-3">{user.firstName}</p>
                  <button
                    className="btn-style px-6 rounded-md py-1 mb-6 flex justify-center text-[white] font-[YACgEQNAr7w O] font-bold"
                    onClick={handlelogout}
                  >
                    Logout
                  </button>
                  {/* <p
                    onClick={handlelogout}
                    className="text-[12px]  cursor-pointer text-[#C7CED3] font-bold pb-3"
                  >
                    Log Out
                  </p> */}
                </div>

                <div className="h-[60%] w-full px-2 flex flex-col ">
                  <div
                    className={`px-[30px] text-center py-2 rounded-lg mt-1 ${
                      pathname === "/myaccount"
                        ? "bg-[#E0C5FA]"
                        : "bg-[#EDF6FC]"
                    } text-[10px] font-black `}
                  >
                    <Link
                      to="/myaccount"
                      className={`${
                        pathname === "/myaccount"
                          ? "bg-[#E0C5FA]"
                          : "bg-[#EDF6FC]"
                      }`}
                    >
                      My Account
                    </Link>
                  </div>

                  <SideBarButton
                    label="My Search History"
                    icon={<FiSearch color="#fff" />}
                    link="/history"
                    active={active}
                    pathname={pathname}
                    handleClick={() => handleClick()}
                  />

                  <SideBarButton
                    label="My Links"
                    icon={<RiLinksLine color="#fff" />}
                    link="/links"
                    pathname={pathname}
                  />
                  <SideBarButton
                    label="Summarized Articles"
                    icon={<TbBook color="#fff" />}
                    link="/articles"
                    pathname={pathname}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          className="absolute top-0 left-0 ml-2 bg-transparent mt-2 lg:hidden flex items-center z-50 justify-start pl-[10px] focus:shadow-none focus:outline-none ring-transparent"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu className="text-[#6d8399] h-[35px] w-[35px]" />
        </button>
        <div className="w-full lg:hidden block bg-[#D3B1FF]">
          {isSidebarOpen && (
            <div className="pt-[3.8rem] bg-[#D3B1FF] text-[black] flex flex-col">
              <ul className="flex flex-col space-y-4 w-[100%] h-[100vh] items-start mt-[54px] pl-[19px]">
                <li className={navBar}>My Account</li>
                <li className={navBar}>My Search History</li>
                <li className={navBar}>My Links</li>
                <li className={navBar}>Summarized Articles</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { SideBar };
