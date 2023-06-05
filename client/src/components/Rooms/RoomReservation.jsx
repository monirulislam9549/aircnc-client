import React from "react";
import Calendar from "../Rooms/Calendar";
import Button from "../Button/Button";

const RoomReservation = () => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ 200</div>
        <div className="font-light text-neutral-600"></div>
      </div>
      <hr />

      <Calendar></Calendar>
      <hr />
      <div className="p-4">
        <Button label="Reserve"></Button>
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <h1>Total</h1>
        <h1>300</h1>
      </div>
    </div>
  );
};

export default RoomReservation;
