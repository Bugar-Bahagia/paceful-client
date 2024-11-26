import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import FormAddActivity from "../components/Form activity";

// Define types for active state
interface Active {
  typeName: string;
  duration: string;
  distance: string;
  notes: string;
  activityDate: string;
}

export default function CreateActivity() {
  const [active, setActive] = useState<Active>({
    typeName: "",
    duration: "",
    distance: "",
    notes: "",
    activityDate: "",
  });

  const nav = useNavigate();

  // Function to handle form submission (create activity)
  const handleCreate = async (data: Active) => {
    try {
      // Make the POST request to create an activity
      await axiosClient({
        method: "POST",
        url: "/your-endpoint", // Replace with the actual endpoint
        data, // Send the data from the form
        headers: {
          "Content-Type": "application/json", // Adjust headers as necessary
        },
      });

      // Clear form after successful submission
      setActive({
        typeName: "",
        duration: "",
        distance: "",
        notes: "",
        activityDate: "",
      });

      // Navigate back to the home page or another page
      nav('/');

    } catch (error) {
      console.error("🚀 ~ handleCreate ~ error:", error);
    }
  };

  // Function to update active state when form fields change
  const handleFieldChange = (name: string, value: string) => {
    setActive((prevActive) => ({
      ...prevActive,
      [name]: value, // Update the specific field in the active state
    }));
  };

  return (
    <>
      <FormAddActivity active={active} handleSubmit={handleCreate} onChange={handleFieldChange} />
    </>
  );
}
