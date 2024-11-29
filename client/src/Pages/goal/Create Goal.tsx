import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import FormAddGoal from "../../components/Form Goal";
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

interface Goal {
  typeName: string;
  targetValue: string;
  startDate: string;
  endDate: string;
}

export default function CreateGoal() {
  const [goal, setGoal] = useState<Goal>({
    typeName: "",
    targetValue: "",
    startDate: "",
    endDate: "",
  });

  const nav = useNavigate();

  // Function to handle form submission (create goal)
  const handleCreate = async (data: Goal) => {
    try {
      // Make the POST request to create a goal
      await axiosClient({
        method: "POST",
        url: "http://localhost:3000/goals", // Replace with the actual endpoint
        data, // Send the data from the form
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust headers as necessary
        },
      });

      // Reset the form after successful submission
      setGoal({
        typeName: "",
        targetValue: "",
        startDate: "",
        endDate: "",
      });

      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Goal successfully created!',
      });

      // Navigate to the home page or another page
      nav("/");

    } catch (error) {
      console.error("🚀 ~ handleCreate ~ error:", error);

      // Check if the error is an instance of AxiosError to safely access the response
      if (error instanceof AxiosError && error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Bad Request. Please check your inputs.',
        });
      } else {
        // Show a generic error message for other types of error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later!',
        });
      }
    }
  };

  // Function to update goal state when form fields change
  const handleFieldChange = (name: string, value: string) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value, // Update the specific field in the goal state
    }));
  };

  return (
    <>
      <FormAddGoal
        goal={goal}
        handleSubmit={handleCreate}
        onChange={handleFieldChange}
      />
    </>
  );
}
