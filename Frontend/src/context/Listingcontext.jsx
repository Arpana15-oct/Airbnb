import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { authDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const listingDataContext = createContext();
function Listingcontext({ children }) {
  let navigate = useNavigate(); 
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState("null");
  let [frontEndImage2, setFrontEndImage2] = useState("null");
  let [frontEndImage3, setFrontEndImage3] = useState("null");
  let [backEndImage1, setBackEndImage1] = useState("null");
  let [backEndImage2, setBackEndImage2] = useState("null");
  let [backEndImage3, setBackEndImage3] = useState("null");
  let [rent, setRent] = useState("");
  let [landmark, setLandmark] = useState("");
  let [city, setCity] = useState("");
  let [category, setCategory] = useState("");
  let [facilities, setFacilities] = useState([]);
  let [adding, setAdding] = useState(false);
   let [updating, setUpdating] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [newListData, setNewListData] = useState([]);
   let [searchData, setsearchData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let[deleting,setDeleting]=useState(false)
  let { serverUrl } = useContext(authDataContext);
  console.log("Server URL:", serverUrl);
  const handleAddListing = async () => {
    setAdding(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("rent", rent);
      formData.append("landmark", landmark);
      formData.append("city", city);
      formData.append("category", category);
      facilities.forEach(facility => formData.append("facilities[]", facility));

      let result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
      });
      setAdding(false);
      console.log(result);
       toast.success("AddListing Successfully")
      navigate("/");
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setLandmark("");
      setCategory("");
      setFacilities([]);
    } catch (error) {
      setAdding(false);
      console.log(error);
        toast.error(error.response.data.message)
    }
  };
  const handleViewCard = async (id) => {
    try {
      let result= await axios.get(serverUrl + `/api/listing/findlistingByid/${id}`,{withCredentials:true})
      console.log(result.data)
      setCardDetails(result.data)
      navigate("/viewcard")
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
      toast.error("Please login to view listing details");
      navigate("/login");
      }
    }
    
  }
  // const handleSearch =async (data) => {
  //   try {
  //    let result = await axios.get(serverUrl +`/api/listing/search?query=${data}`) 
  //    setsearchData(result.data)
  //   } catch (error) {
  //     setsearchData(null)
  //     console.log(error)
  //   }
  const handleSearch = async (query) => {
    if (!query || query.trim() === "") return; // prevent empty query
    try {
      const result = await axios.get(`${serverUrl}/api/listing/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setsearchData(result.data);
    } catch (error) {
      setsearchData([]);
      console.log(error);
    }
  
    
  }
  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListing();
  }, [adding,updating,deleting]);
  let value = {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    landmark,
    setLandmark,
    city,
    setCity,
    category,
    setCategory,
    facilities,
    setFacilities,
    handleAddListing,
    adding,
    setAdding,
    listingData,
    setListingData,
    newListData,
    setNewListData,
    cardDetails,
     setCardDetails,
     updating,
     setUpdating,
    handleViewCard,
    deleting,setDeleting,
    handleSearch,
    searchData,setsearchData,
    getListing,
  };
  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
}

export default Listingcontext;
