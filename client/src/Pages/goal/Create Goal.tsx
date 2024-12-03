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

interface Prop {
  fetchGoals: () => Promise<void>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function CreateGoal({ fetchGoals }: Prop) {
  const [goal, setGoal] = useState<Goal>({
    typeName: "",
    targetValue: "",
    startDate: "",
    endDate: "",
  });
  const handleCreate = async (data: Goal) => {
    try {
      // Make the POST request to create a goal
      await axiosClient({
        method: "POST",
        url: "https://hacktiv.fathanabds.online/goals", // Replace with the actual endpoint
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

      const modal = document.getElementById("goal_modal") as HTMLDialogElement;
      if (modal) modal.close();
      // Show success message using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Goal successfully created!',
      });
      fetchGoals()

    } catch (error) {
      console.error("🚀 ~ handleCreate ~ error:", error);
 
      const modal = document.getElementById("goal_modal") as HTMLDialogElement;
        if (modal) modal.close();

      if (error instanceof AxiosError && error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Bad Request. Please check your inputs.',
        });

        
      } else {
        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later!',
        });
      }

    }
  };


  const handleFieldChange = (name: string, value: string) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      [name]: value,
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
