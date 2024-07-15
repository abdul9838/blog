import React from "react";
import { FaCheck } from "react-icons/fa";

import { images } from "../constants";

const ArticleCard = ({ className }) => {
  return (
    <div className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
        <img src={images.post1} className="w-full" alt="ui/ux review check" />
      </div>
      <div className="p-6">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          UI/UX Review Check
        </h4>
        <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
          Because it's about motivating the doers. Because I'm here to follow my
          dreams and inspire others.
        </p>
      </div>

      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <img
            alt="natali craig"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
            className=" inline-block h-16 w-16 rounded-full  border-2 border-white object-cover object-center"
          />
          <div>
            <h2 className="text-lg font-bold">Johanna Murray</h2>
            <div className="flex items-center gap-x-2">
              <span className="bg-green-100 rounded-full ">
                <FaCheck className="text-green-400 px-1 " />
              </span>
              <p className="italic">Verified writer</p>
            </div>
          </div>
        </div>

        <p className="font-bold  text-dark-light">January 10</p>
      </div>
    </div>
  );
};

export default ArticleCard;
