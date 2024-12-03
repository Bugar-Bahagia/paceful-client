import { useState } from "react";
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

interface Prop {
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchingActivity: (reset: boolean) => Promise<void>

}

export default function CreateActivity({ fetchingActivity }: Prop) {
  const [active, setActive] = useState<Active>({
    typeName: "",
    duration: "",
    distance: "",
    notes: "",
    activityDate: "",
  });
  
  const handleCreate = async (data: Active) => {
    try {
      await axiosClient({
        method: "POST",
        url: "https://hacktiv.fathanabds.online/activities",
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setActive({
        typeName: "",
        duration: "",
        distance: "",
        notes: "",
        activityDate: "",
      });
      
      const modal = document.getElementById("activity_modal") as HTMLDialogElement;
      if (modal) modal.close();
  
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Create activity successful!',
      });
      // setPage(1)
    await fetchingActivity(true)
      
    } catch (error) {
      console.error("🚀 ~ handleCreate ~ error:", error);

      const modal = document.getElementById("activity_modal") as HTMLDialogElement;
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
