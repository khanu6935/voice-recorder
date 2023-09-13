import React, { useState, useEffect } from "react";
import { SideBar } from "../../components/sideBar/SideBar";
import { MdDelete } from "react-icons/md";
import ProtectedRoutes from "../../components/protectedroutes/ProtectedRoutes";
import axios from "axios";
import Loading from "react-loading";

const MyLinks = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/users/links`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log("response", JSON.stringify(response.data));
        setSearchHistory(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false regardless of success or error
      });
  }, []);
  const onDeleteHandler = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_NODE_BACKEND_BASEURL}/api/users/links/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSearchHistory(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="lg:flex block bg-[#EEF7FC] overflow-hidden">
        <SideBar />

        <div className="main bg-[#EDF5FC] flex justify-center items-center lg:w-[80%] w-[100%] h-screen overflow-y-scroll">
          <div className="h-full lg:mt-6 mt-[10rem] w-full bg-[#EEF7FC] rounded-md">
            <h1 className="flex justify-center font-bold text-[25px] font-[YAEZxXauVhw O]">
              My Links
            </h1>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <Loading type="spin" color="#747474" />
              </div>
            ) : (
              <>
                {searchHistory.map((item, index) => {
                  return (
                    <div
                      className="flex justify-between items-center cursor-pointer p-5 border-b-2 border-[#FF8BD7] px-10"
                      key={index}
                    >
                      <p className="w-11/12 break-words">{item.link}</p>
                      <p className="bg-[#D3B1FF] w-10 h-10 flex items-center cursor-pointer justify-center p-1 rounded-[50%]">
                        <MdDelete
                          color="white"
                          onClick={() => onDeleteHandler(item.id)}
                        />
                      </p>{" "}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoutes(MyLinks);
