import React, { useEffect, useState } from "react";
import Container from "../Shared/Navbar/Container";
import Card from "./Card";
import Loader from "../Shared/Loader";
import { useSearchParams } from "react-router-dom";
import Heading from "../Heading/Heading";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const category = params.get("category");
  //   console.log(category);

  useEffect(() => {
    setLoading(true);
    fetch("rooms.json")
      .then((res) => res.json())
      .then((data) => {
        if (category) {
          const filtered = data.filter((item) => item.category === category);
          setRooms(filtered);
        } else {
          setRooms(data);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <Container>
      {rooms && rooms.length ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {rooms.map((room, index) => (
            <Card room={room} key={index}></Card>
          ))}
        </div>
      ) : (
        <div>
          <Heading
            title={"No rooms available in this category"}
            subtitle={"Please Select others categories"}
            center={true}
          ></Heading>
        </div>
      )}
    </Container>
  );
};

export default Rooms;
