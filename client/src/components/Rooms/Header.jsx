import React from "react";
import Heading from "../Heading/Heading";

const Header = () => {
  return (
    <div>
      <Heading
        title={"Sidemen, Bali"}
        subtitle={"Please Select others categories"}
      ></Heading>
      <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-826025597172937112/original/d6bbe2ca-9337-4a7e-a5d3-ca8fe72821db.jpeg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
