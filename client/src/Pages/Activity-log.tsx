import { useEffect, useState } from "react";
import CreateActivity from "../Pages/Create Activity"; // Import your CreateActivity component
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";

// Define the interface for activity data
interface Active {
  id: string;
  typeName: string;
  duration: string;
  distance: string;
  notes: string;
  activityDate: string;
  caloriesBurned: string; // Added this to match the usage in JSX
}

export default function AllActivity() {
  const nav = useNavigate()
  const [data, setData] = useState<Active[]>([]); // Type the state with Active[] array

  // Fetching activity data
  const fetchingActivity = async () => {
    try {
      const response = await axiosClient.get("/activities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error: any) {
      console.error("Error while fetching activities:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchingActivity();
  }, []);

  // Handle delete activity
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      await axiosClient.delete(`/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state by removing the deleted activity
      setData((prevActive) => prevActive.filter((activity) => activity.id !== id));
      console.log(`Activity with ID ${id} deleted successfully.`);
    } catch (error: any) {
      console.error("Error while deleting activity:", error?.response?.data || error.message);
    }
  };

  // Format numbers with a thousands separator
  const formatNumber = (num: number): string => num.toLocaleString();

  // Function to open the modal
  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  // Function to close the modal
  const closeModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (modal) modal.close();
  };

  // Close modal if user clicks outside the modal content
  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (e.target === modal) closeModal();
  };

  return (
    <>
      {/* Add New Activity Button */}
      <div className="flex justify-center items-center pt-10">
        <button className="btn btn-info" onClick={openModal}>
          Add new activity
        </button>
      </div>

      {/* Activity List */}
      <div className="flex flex-wrap justify-center items-center gap-4 pt-10">
        {data.map((e) => (
          <div
            key={e.id}
            className="card bg-neutral text-neutral-content w-96 border border-gray-300 shadow-md"
          >
            <div className="card-body items-center text-center">
              <h3 className="card-title text-xl font-semibold">{e.typeName.toUpperCase()}</h3>
              <p>{formatNumber(Number(e.duration))} menit</p>
              <p>{formatNumber(Number(e.distance))} meter</p>
              <p>{formatNumber(Number(e.caloriesBurned))} kalori</p>
              <p className="text-sm text-gray-400">{e.activityDate}</p>
              <div className="card-actions justify-end">
                <button onClick={() => handleDelete(e.id)} className="btn btn-error">
                  Delete
                </button>
                <button onClick={() => nav(`/update-activity/${e.id}`)} className="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating New Activity */}
      <dialog id="my_modal_1" className="modal" onClick={handleOutsideClick}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Activity</h3>
          <CreateActivity />
        </div>
      </dialog>
    </>
  );
}
