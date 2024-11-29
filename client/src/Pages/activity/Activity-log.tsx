import { useEffect, useState } from "react";
import CreateActivity from "./Create Activity";
import UpdateActivity from "./Update Activity";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router-dom";

interface Active {
  id: string;
  typeName: string;
  duration: string;
  distance: string;
  notes: string;
  activityDate: string;
  caloriesBurned: string;
}

export default function AllActivity() {
  const [data, setData] = useState<Active[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  );
  const nav = useNavigate();

  const fetchingActivity = async () => {
    try {
      const response = await axiosClient.get("/activities", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error: any) {
      console.error(
        "Error while fetching activities:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchingActivity();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      await axiosClient.delete(`/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevActive) =>
        prevActive.filter((activity) => activity.id !== id)
      );
    } catch (error: any) {
      console.error(
        "Error while deleting activity:",
        error?.response?.data || error.message
      );
    }
  };

  const formatNumber = (num: number): string => num.toLocaleString();

  const openModal = (activityId: string | null = null) => {
    setSelectedActivityId(activityId);
    const modal = document.getElementById(
      "activity_modal"
    ) as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setSelectedActivityId(null);
    const modal = document.getElementById(
      "activity_modal"
    ) as HTMLDialogElement;
    if (modal) modal.close();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal = document.getElementById(
      "activity_modal"
    ) as HTMLDialogElement;
    if (e.target === modal) closeModal();
  };

  return (
    <div className="bg bg-gradient-to-r from-teal-600 to-teal-800 min-h-screen">
      <div className="flex justify-center items-center pt-10">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 focus:outline-none"
          onClick={() => openModal()}
        >
          Add new activity
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 pt-10 pb-10">
        {data.map((e) => (
          <div
            key={e.id}
            className="card bg-gray-800 text-gray-100 w-96 border border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="card-body items-center text-center">
              <h3 className="card-title text-xl font-semibold text-teal-400">
                {e.typeName.toUpperCase()}
              </h3>
              <p>{formatNumber(Number(e.duration))} menit</p>
              <p>{formatNumber(Number(e.distance))} meter</p>
              <p>{formatNumber(Number(e.caloriesBurned))} kalori</p>
              <p className="text-sm text-gray-400">{e.activityDate}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDelete(e.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => openModal(e.id)}
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding or Updating Activity */}
      <dialog
        id="activity_modal"
        className="modal"
        onClick={handleOutsideClick}
      >
        <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          {selectedActivityId ? (
            <>
              <h3 className="font-bold text-lg text-teal-400">
                Update Activity
              </h3>
              <UpdateActivity
                activityId={selectedActivityId}
                onActivityUpdated={fetchingActivity}
              />
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg text-teal-400">
                Create New Activity
              </h3>
              <CreateActivity />
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
