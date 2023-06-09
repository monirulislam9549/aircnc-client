import React, { useContext, useState } from "react";
import Calendar from "../Rooms/Calendar";
import Button from "../Button/Button";
import { AuthContext } from "../../providers/AuthProvider";
import BookingModal from "../Modal/BookingModal";
import { formatDistance } from "date-fns";
import { addBookings, updateStatus } from "../../api/bookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomReservation = ({ roomData }) => {
  const { user, role } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // price calculation
  const totalPrice =
    parseFloat(
      formatDistance(new Date(roomData.to), new Date(roomData.from)).split(
        " "
      )[0]
    ) * roomData.price;

  const [value, setValue] = useState({
    startDate: new Date(roomData?.from),
    endDate: new Date(roomData?.to),
    key: "selection",
  });

  // booking state
  const [bookingInfo, setBookingInfo] = useState({
    guest: { name: user.displayName, email: user.email, image: user.photoURL },
    host: roomData.host.email,
    location: roomData.location,
    to: value.endDate,
    from: value.startDate,
    price: totalPrice,
    title: roomData.title,
    roomId: roomData._id,
    image: roomData.image,
  });

  const handleSelect = (ranges) => {
    setValue({ ...value });
  };

  const modalHandler = () => {
    addBookings(bookingInfo)
      .then((data) => {
        console.log(data);
        updateStatus(roomData._id, true)
          .then((data) => {
            closeModal();
            toast.success("Booking Successful");
            console.log(data);
            navigate("/dashboard/my-bookings");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        closeModal();
        console.log(err);
      });
    console.log(bookingInfo);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {roomData.price}</div>
        <div className="font-light text-neutral-600">Night</div>
      </div>
      <hr />

      <div className="flex justify-center">
        <Calendar value={value} handleSelect={handleSelect}></Calendar>
      </div>
      <hr />
      <div className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          disabled={roomData.host.email === user.email || roomData.booked}
          label="Reserve"
        ></Button>
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <h1>Total</h1>
        <h1>$ {totalPrice}</h1>
      </div>
      <BookingModal
        isOpen={isOpen}
        bookingInfo={bookingInfo}
        modalHandler={modalHandler}
        closeModal={closeModal}
      ></BookingModal>
    </div>
  );
};

export default RoomReservation;
