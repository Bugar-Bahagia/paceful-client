import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import FormAddActivity from "../../components/Form activity";
import Swal from 'sweetalert2'
import { AxiosError } from 'axios';


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
  
  const handleCreate = async (data: Active) => {
    try {
      await axiosClient({
        method: "POST",
        url: "http://localhost:3000/activities",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Reset the form after successful submission
      setActive({
        typeName: "",
        duration: "",
        distance: "",
        notes: "",
        activityDate: "",
      });
  
      // Close the modal by setting the modal state in parent (AllActivity)
      const modal = document.getElementById("activity_modal") as HTMLDialogElement;
      if (modal) modal.close();
  
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Create activity successful!',
      });
  
      
      nav("/"); 
      
    } catch (error) {
      console.error("🚀 ~ handleCreate ~ error:", error);

      if (error instanceof AxiosError && error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data?.message || 'Bad Request. Please check your inputs.',
        });
  
        const modal = document.getElementById("activity_modal") as HTMLDialogElement;
        if (modal) modal.close();
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
    setActive((prevActive) => ({
      ...prevActive,
      [name]: value, 
    }));
  };

  return (
    <>
      <FormAddActivity
        active={active}
        handleSubmit={handleCreate}
        onChange={handleFieldChange}
      />
    </>
  );
}
