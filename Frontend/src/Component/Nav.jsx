import  { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot, MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { FaTreeCity, FaShop, FaArrowLeftLong } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin, GiFamilyHouse } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { listingDataContext } from "../context/Listingcontext";

export default function Nav({ isViewCard = false, title = '', onBack, onShare, onSave }) {
  const [showpop, setshowpop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const {userData, setUserData} = useContext(userDataContext);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  let [cate, setCate] = useState();
  const [input, setInput] = useState("");
  let {
    listingData,
    setListingData,
    setNewListData,
    newListData,
    searchData,
    handleSearch,
    handleViewCard
  } = useContext(listingDataContext);

  const handleLogOut = async () => {
    try {
      console.log("serverUrl =>", serverUrl);

      if (!serverUrl) {
        throw new Error("serverUrl is not defined in AuthContext");
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);

      console.log("✅ Logout response:", result.data);

      // redirect to login
      navigate("/login");
    } catch (error) {
      console.error("❌ Logout error:", error.message);
    }
  };
  const handleCategory = (category) => {
    setCate(category);
    if (category == "trending") {
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category === category));
    }
  };
  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    handleSearch(input);
  }, [input]);
  if (isViewCard) {
    return (
      <header className="sticky top-0 z-50 bg-gray-100 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <FaArrowLeftLong className="w-5 h-5 text-white" />
            </button>
            <div className="w-[40%] relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <input
                type="text"
                className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-[50px] text-[15px]"
                placeholder="Any Where | Any Location | Any City"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button className="absolute p-[10px] rounded-[30px] bg-[red] right-[3%] top-[5px]">
                <FiSearch className="w-[15px] h-[15px] text-[white]" />
              </button>
            </div>
            <button
              className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] bg-white border-[1px] border-[#dcdcdc] rounded-[30px] hover:shadow-lg"
              onClick={() => setshowpop((prev) => !prev)}
            >
              <GiHamburgerMenu className="w-[18px] h-[18px] text-black" />
              {userData == null && (
                <span>
                  <CgProfile className="w-[21px] h-[21px] text-black" />
                </span>
              )}
              {userData != null && (
                <span className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center">
                  {userData?.name.slice(0, 1)}
                </span>
              )}
            </button>

          </div>
        </div>
        {searchData?.length > 0 && isHovering && (
          <div className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[70px] overflow-auto left-[0] justify-start items-center">
            <div className="max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1]">
              {searchData.map((search) => (
                <div className="border-b border-[black] p-[10px] cursor-pointer hover:bg-gray-100" onClick={()=>handleClick(search._id)}>
                  {search.title} in {search.landmark},{search.city}
                </div>
              ))}
            </div>
          </div>
        )}
        {showpop && (
          <div className="w-[220px] h-[230px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg">
            <ul className="w-[100%] h-[100%] text-[16px] flex items-start justify-around flex-col py-[10px]">
              {!userData && (
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setshowpop(false);
                  }}
                >
                  Login
                </li>
              )}
              {userData && (
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    handleLogOut();
                    setshowpop(false);
                  }}
                >
                  Logout
                </li>
              )}
              <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
              <li
                className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                onClick={() => {
                  navigate("/listingpage1");
                  setshowpop(false);
                }}
              >
                List your Home
              </li>
              <li
                className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                onClick={() => {
                  navigate("/mylisting");
                  setshowpop(false);
                }}
              >
                My Listing
              </li>

              <li
                className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                onClick={() => {
                  navigate("/mybooking");
                  setshowpop(false);
                }}
              >
                My Booking
              </li>
            </ul>
          </div>
        )}
      </header>
    );
  }

  return (
    <div className="fixed top-0 bg-gray-100 z-[20]">
      <div className="w-[100vw] min-h-[70px] border-b-[1px] px-[20px] border-[#dcdcdc] flex items-center justify-between md:px-[40px]">
        <div>
          <img src={logo} alt="logo" className="w-[130px]" />
        </div>
        <div className="w-[40%] relative hidden md:block" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-[50px] text-[15px]"
            placeholder="Any Where | Any Location | Any City"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="absolute p-[10px] rounded-[30px] bg-[red] right-[3%] top-[5px]">
            <FiSearch className="w-[15px] h-[15px] text-[white]" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-[10px] relative">
          <button
            className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] bg-white border-[1px] border-[#dcdcdc] rounded-[30px] hover:shadow-lg"
            onClick={() => setshowpop((prev) => !prev)}
          >
            <GiHamburgerMenu className="w-[18px] h-[18px] text-black" />
            {userData == null && (
              <span>
                <CgProfile className="w-[21px] h-[21px] text-black" />
              </span>
            )}
            {userData != null && (
              <span className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center">
                {userData?.name.slice(0, 1)}
              </span>
            )}
          </button>
          {showpop && (
            <div className="w-[220px] h-[230px] absolute bg-slate-50 top-[110%] right-[3%] border-[1px] border-[#aaa9a9] z-10 rounded-lg">
              <ul className="w-[100%] h-[100%] text-[16px] flex items-start justify-around flex-col py-[10px]">
                {!userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setshowpop(false);
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      handleLogOut();
                      setshowpop(false);
                    }}
                  >
                    Logout
                  </li>
                )}
                <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/listingpage1");
                    setshowpop(false);
                  }}
                >
                  List your Home
                </li>
                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/mylisting");
                    setshowpop(false);
                  }}
                >
                  My Listing
                </li>

                <li
                  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/mybooking");
                    setshowpop(false);
                  }}
                >
                  My Booking
                </li>
              </ul>
            </div>
          )}
        </div>
        {searchData?.length > 0 && isHovering && (
          <div className="w-[100vw] h-[450px] flex flex-col gap-[20px] absolute top-[70px] overflow-auto left-[0] justify-start items-center">
            <div className="max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1]">
              {searchData.map((search) => (
                <div className="border-b border-[black] p-[10px] cursor-pointer hover:bg-gray-100" onClick={()=>handleClick(search._id)}>
                  {search.title} in {search.landmark},{search.city}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search input for mobile */}
      <div className="w-[100%] h-[60px] flex items-center justify-center md:hidden relative">
        <div className="w-[80%] relative" onFocus={() => setIsHovering(true)} onBlur={() => setTimeout(() => setIsHovering(false), 200)}>
          <input
            type="text"
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-[50px] text-[15px]"
            placeholder="Any Where | Any Location | Any City"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="absolute p-[10px] rounded-[30px] bg-[red] right-[2%] top-[5px]">
            <FiSearch className="w-[15px] h-[15px] text-[white]" />
          </button>
        </div>
        {searchData?.length > 0 && isHovering && (
          <div className="w-[100vw] h-[300px] flex flex-col gap-[20px] absolute top-[60px] overflow-auto left-[0] justify-start items-center z-50">
            <div className="max-w-[700px] w-[90vw] h-[250px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1] shadow-lg">
              {searchData.map((search) => (
                <div className="border-b border-[black] p-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleClick(search._id)}>
                  {search.title} in {search.landmark},{search.city}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start cursor-pointer gap-[20px] md:justify-center px-[15px] border-t border-gray-200">
        <div
          className="flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => {
            handleCategory("trending");
            setCate("");
          }}
        >
          <MdWhatshot className="w-[20px] h-[20px] text-[black]" />
          <h3>Trending</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Villa" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Villa")}
        >
          <GiFamilyHouse className="w-[20px] h-[20px] text-[black]" />
          <h3>Villa</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] text-nowrap px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Farm House" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Farm House")}
        >
          <FaTreeCity className="w-[20px] h-[20px] text-[black]" />
          <h3>Farm House</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] text-nowrap px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Pool House" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Pool House")}
        >
          <MdOutlinePool className="w-[20px] h-[20px] text-[black]" />
          <h3>Pool House</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Rooms" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Rooms")}
        >
          <MdBedroomParent className="w-[20px] h-[20px] text-[black]" />
          <h3>Rooms</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Flat" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Flat")}
        >
          <BiBuildingHouse className="w-[20px] h-[20px] text-[black]" />
          <h3>Flat</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "PG" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("PG")}
        >
          <IoBedOutline className="w-[20px] h-[20px] text-[black]" />
          <h3>PG</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Cabins" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Cabins")}
        >
          <GiWoodCabin className="w-[20px] h-[20px] text-[black]" />
          <h3>Cabins</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col text-[13px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${
            cate == "Shop" ? "border-b-[1px] border-[#a6a5a5]" : ""
          }`}
          onClick={() => handleCategory("Shop")}
        >
          <FaShop className="w-[20px] h-[20px] text-[black]" />
          <h3>Shop</h3>
        </div>
      </div>
    </div>
  );
}
