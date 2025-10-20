import React, { useContext } from "react";
import Nav from "../Component/Nav";
import Card from "../Component/Card";
import { listingDataContext } from "../context/Listingcontext";

function Home() {
  const { newListData } = useContext(listingDataContext);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow flex items-center justify-center gap-[25px] flex-wrap mt-[250px] md:mt-[180px] px-4">
        {newListData && newListData.map((list) => (
          <Card
            key={list._id}
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            ratings={list.ratings}
            isBooked={list.isBooked}
            host={list.host}
          />
        ))}
      </div>
      <footer className="bg-gray-100 text-black py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-700">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-700">Safety information</a></li>
                <li><a href="#" className="hover:text-gray-700">Cancellation options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-700">Our story</a></li>
                <li><a href="#" className="hover:text-gray-700">Careers</a></li>
                <li><a href="#" className="hover:text-gray-700">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hosting</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-700">Become a host</a></li>
                <li><a href="#" className="hover:text-gray-700">Host resources</a></li>
                <li><a href="#" className="hover:text-gray-700">Community forum</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:support@airbnb.com" className="hover:text-gray-700">support@airbnb.com</a></li>
                <li><a href="#" className="hover:text-gray-700">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-700">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-400 text-center">
            <p>&copy; 2023 Airbnb Clone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
