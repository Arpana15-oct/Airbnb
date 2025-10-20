import React from "react";
import { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../context/Listingcontext";


function Listingpage1() {
  let navigate = useNavigate();
  let {
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
    adding,
    setAdding,
  } = useContext(listingDataContext);

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackEndImage1(file);
    setFrontEndImage1(URL.createObjectURL(file));
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackEndImage2(file);
    setFrontEndImage2(URL.createObjectURL(file));
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackEndImage3(file);
    setFrontEndImage3(URL.createObjectURL(file));
  };
  return (
    <div className="w-[100%] min-h-[100vh] bg-white flex items-center justify-center relative overflow-auto">
      <form
        action=""
        className="max-w-[900px] w-full md:w-[90%] min-h-[550px] flex items-center justify-start flex-col md:items-start gap-[10px] overflow-auto mt-[50px] mb-[50px] px-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/listingpage2");
        }}
      >
        <div
          className="w-[50px] h-[50px] bg-red-500 cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
          onClick={() => navigate("/")}
        >
          {" "}
          <FaArrowLeftLong className="w-5 h-5 text-white" />
        </div>
        <div className="w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg">
          setup your home
        </div>
        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="title" className="text-[20px]">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="_bhk house or best title"
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="des" className="text-[20px]">
            Description
          </label>
          <textarea
            name=""
            id="des"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="img1" className="text-[20px]">
            Image1
          </label>
          <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
            <input
              type="file"
              id="img1"
              className="w-[100%] text-[15px] px-[10px]"
              required
              onChange={handleImage1}
            />
          </div>
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="img2" className="text-[20px]">
            Image2
          </label>
          <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
            <input
              type="file"
              id="img2"
              className="w-[100%] text-[15px] px-[10px]"
              required
              onChange={handleImage2}
            />
          </div>
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="img3" className="text-[20px]">
            Image3
          </label>
          <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
            <input
              type="file"
              id="img3"
              className="w-[100%] text-[15px] px-[10px]"
              required
              onChange={handleImage3}
            />
          </div>
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="rent" className="text-[20px]">
            Rent
          </label>
          <input
            type="number"
            id="rent"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setRent(e.target.value)}
            value={rent}
            placeholder="Rs.__________/day"
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="city" className="text-[20px]">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="city"
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="landmark" className="text-[20px]">
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
            required
            onChange={(e) => setLandmark(e.target.value)}
            value={landmark}
          />
        </div>

        <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
          <label htmlFor="facilities" className="text-[20px]">
            Facilities
          </label>
          <div className="w-[90%] flex flex-wrap gap-[10px]">
            {["WiFi", "Parking", "Pool", "AC", "Gym", "Laundry", "Security", "Elevator"].map((facility) => (
              <label key={facility} className="flex items-center gap-[5px]">
                <input
                  type="checkbox"
                  checked={facilities.includes(facility)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFacilities([...facilities, facility]);
                    } else {
                      setFacilities(facilities.filter(f => f !== facility));
                    }
                  }}
                />
                {facility}
              </label>
            ))}
          </div>
        </div>

        <button className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg">
          Next
        </button>
      </form>
    </div>
  );
}

export default Listingpage1;
