import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlinePool, MdBedroomParent } from "react-icons/md";
import { FaTreeCity, FaShop } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin, GiFamilyHouse } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/Listingcontext";
export default function ListingPage2() {
  let navigate = useNavigate();
  let { category, setCategory } = useContext(listingDataContext);
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto ">
      <div
        className="w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
        onClick={() => navigate("/Listingpage1")}
      >
        {" "}
        <FaArrowLeftLong className="w-5 h-5 text-white" />
      </div>
      <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
        Set your category
      </div>
      <div className="max-w-[900px] w-[100%] h-[550px] overflow-auto bg-[white] flex-col flex items-center gap-[40px] mt-[30px] justify-start ">
        <h1 className="text-[18px] text-[black] md:text-[30px] px-[10px]">
          Which is the best place that describes your place?
        </h1>
        <div className="max-w-[900px] w-[100%] h-[100%] flex flex-wrap items-center justify-center gap-[15px] md:w-[70%]">
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Villa" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Villa")}
          >
            {" "}
            <GiFamilyHouse className="w-[20px] h-[20px] text-[black]" />
            <h3>Villa</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Farm House" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Farm House")}
          >
            {" "}
            <FaTreeCity className="w-[20px] h-[20px] text-[black]" />
            <h3>Farm House</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Pool House" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Pool House")}
          >
            <MdOutlinePool className="w-[20px] h-[20px] text-[black]" />
            <h3>Pool House</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Flat" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Flat")}
          >
            <BiBuildingHouse className="w-[20px] h-[20px] text-[black]" />
            <h3>Flat</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="PG" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("PG")}
          >
            {" "}
            <IoBedOutline className="w-[20px] h-[20px] text-[black]" />
            <h3>PG</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Cabins" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Cabins")}
          >
            {" "}
            <GiWoodCabin className="w-[20px] h-[20px] text-[black]" />
            <h3>Cabins</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Shop" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Shop")}
          >
            {" "}
            <FaShop className="w-[20px] h-[20px] text-[black]" />
            <h3>Shop</h3>
          </div>
          <div
            className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="Rooms" ? "border-3 border-[#8b8b8b]" :""}`}
            onClick={() => setCategory("Rooms")}
          >
            {" "}
            <MdBedroomParent className="w-[20px] h-[20px] text-[black]" />
            <h3>Rooms</h3>
          </div>
        </div>
        <button className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg absolute right-[5%] bottom-[10%]" onClick={()=>navigate("/listingpage3")} disabled={!category}>
          Next
        </button>
      </div>
    </div>
  );
}
