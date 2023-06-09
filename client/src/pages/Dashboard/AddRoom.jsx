import React, { useState } from "react";
import AddRoomForm from "../../components/Forms/AddRoomForm";
import { imageUpload } from "../../api/utils";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { addRoom } from "../../api/rooms";

const AddRoom = () => {
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const { user } = useContext(AuthContext);
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const location = form.location.value;
    const title = form.title.value;
    const from = dates.startDate;
    const to = dates.endDate;
    const price = form.price.value;
    const total_guest = form.total_guest.value;
    const bedrooms = form.bedrooms.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.files[0];
    // image upload
    imageUpload(image)
      .then((data) => {
        const roomData = {
          image: data.data.display_url,
          location,
          from,
          to,
          title,
          price: parseFloat(price),
          total_guest,
          bedrooms,
          bathrooms,
          category,
          description,
          host: {
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            email: user?.email,
          },
        };
        // add room to database
        addRoom(roomData)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));

        // console.log(roomData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleImageChange = (image) => {
    setUploadButtonText(image.name);
  };

  const handleDatesSelect = (ranges) => {
    console.log(ranges);
    setDates(ranges.selection);
  };

  return (
    <AddRoomForm
      handleSubmit={handleSubmit}
      loading={loading}
      handleImageChange={handleImageChange}
      uploadButtonText={uploadButtonText}
      dates={dates}
      handleDatesSelect={handleDatesSelect}
    ></AddRoomForm>
  );
};

export default AddRoom;
