import { useEffect, useState } from "react";
import CreateGoal from "./Create Goal";
// import UpdateGoal from "./Update Goal";
import axiosClient from "../../utils/axiosClient";
import UpdateGoal from "./Update Goal";

interface Goal {
  id: string;
  typeName: string;
  targetValue: string;
  startDate: string;
  endDate: string;
}

export default function AllGoals() {
  const [data, setData] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      const response = await axiosClient.get("/goals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error: any) {
      console.error(
        "Error while fetching goals:",
        error?.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token is missing");

      await axiosClient.delete(`/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    } catch (error: any) {
      console.error(
        "Error while deleting goal:",
        error?.response?.data || error.message
      );
    }
  };

  const openModal = (goalId: string | null = null) => {
    setSelectedGoalId(goalId);
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setSelectedGoalId(null);
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (modal) modal.close();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (e.target === modal) closeModal();
  };

  return (
    <div className="bg bg-gradient-to-r from-blue-600 to-blue-800 min-h-screen">
      <div className="flex justify-center items-center pt-10">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={() => openModal()}
        >
          Add New Goal
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 pt-10 pb-10">
        {data.map((goal) => (
          <div
            key={goal.id}
            className="card bg-gray-800 text-gray-100 w-96 border border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="card-body items-center text-center">
              <h3 className="card-title text-xl font-semibold text-blue-400">
                {goal.typeName.toUpperCase()}
              </h3>
              <p>Target: {goal.targetValue}</p>
              <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
              <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => openModal(goal.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding or Updating Goal */}
      <dialog
        id="goal_modal"
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
          {selectedGoalId ? (
            <>
              <h3 className="font-bold text-lg text-blue-400">Update Goal</h3>
              <UpdateGoal
                goalId={selectedGoalId}
                onGoalUpdated={fetchGoals}
               /> 
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg text-blue-400">Create New Goal</h3>
              <CreateGoal />
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}