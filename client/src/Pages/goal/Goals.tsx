import { useEffect, useState } from "react";
import CreateGoal from "./Create Goal";
import UpdateGoal from "./Update Goal";
import axiosClient from "../../utils/axiosClient";
import Swal from "sweetalert2"; // Import SweetAlert2

const goalTips = [
  "You're on the right track! Stay focused on your goal and take it one step at a time. Small progress is still progress.",
  "Keep your eyes on the prize! Break your goal down into manageable tasks and celebrate each milestone along the way.",
  "Consistency is key to success! Make a plan, stick to it, and stay persistent. You’ve got this!",
  "Challenges may arise, but they are part of the process. Stay resilient and keep pushing forward towards your goal!",
  "Remember, setbacks are setups for comebacks! If things don’t go as planned, reassess and adjust your approach.",
  "Progress is built on effort, and every effort counts. Keep moving forward, no matter how small the steps.",
  "Stay motivated by visualizing the success at the end of your journey. Every effort brings you closer to your goal.",
  "It’s okay to ask for support! Surround yourself with people who encourage and believe in your success.",
];
const randomTip = goalTips[Math.floor(Math.random() * goalTips.length)];

export interface Goal {
  id: string;
  typeName: string;
  targetValue: number;
  startDate: string;
  endDate: string;
  currentValue: number;
  isAchieved: string[];
}

export default function AllGoals() {
  const [data, setData] = useState<Goal[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchGoals = async (reset: boolean = false) => {
    let newPage = page
    if (reset) {
      newPage = 1
      setPage(newPage)
    }
        
    if (page > totalPages) return;

    try {
      setLoading(true);
      const response = await axiosClient.get(`/goals?page=${newPage}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { goals, totalPage } = response.data;
      setData((prevData: Goal[]) => {
        
        if (reset === true) {
          return [...goals];
        } else {
          const newGoals = goals.filter(
            (goal: Goal) => !prevData.some((item: Goal) => item.id === goal.id)
          );
          return [...newGoals, ...prevData];
        }
      });

      setTotalPages(totalPage);
      setLoading(false);
    } catch (error: any) {
      console.error(
        "Error while fetching goals:",
        error?.response?.data || error.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [page]);

  const handleScroll = () => {
    setPage((prevPage) => prevPage + 1);
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      if (!loading) fetchGoals();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this goal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("Token is missing");

          await axiosClient.delete(`/goals/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setData((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
          Swal.fire("Deleted!", "Your goal has been deleted.", "success");
        } catch (error: any) {
          console.error(
            "Error while deleting goal:",
            error?.response?.data || error.message
          );
          Swal.fire("Error!", "There was an issue deleting the goal.", "error");
        }
      }
    });
  };

  const formatNumber = (num: number): string => num.toLocaleString();

  const openModal = (goalId: string | null = null) => {
    setSelectedGoalId(goalId);
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const closeModal = () => {
    setSelectedGoalId(null);
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (modal) modal.close();
    fetchGoals();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (e.target === modal) closeModal();
  };

  return (
    <div className="bg-white  min-h-screen">
      <header className="text-center pt-10">
        <h1 className="text-4xl font-bold text-black">
          ACHIEVE YOUR GOALS, STEP BY STEP
        </h1>
        <p className="mt-4 text-lg text-black">
          "Every small step you take brings you closer to your bigger dreams.
          Keep going, don’t stop now, and prove to yourself that you can finish
          what you started."
        </p>
      </header>

      <div className="flex justify-center items-center pt-10">
        <button
          style={{ color: "#ffffff" }}
          className="bg-orange-600 text-black px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
          onClick={() => openModal()}
        >
          Add New Goal
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 pt-10 pb-10">
        {data.length === 0 ? (
          <div className="flex flex-col items-center">
            <img
              src={"../../../public/image/4.jpg"}
              alt="Motivational Fitness"
              className="rounded-lg shadow-lg "
              style={{
                width: "600px", // atau gunakan unit lain seperti rem, %, dll.
                height: "300px",
              }}
            />
            <p className="mt-4 text-lg text-white">
              "Stay motivated! Your fitness journey starts with a single step."
            </p>
          </div>
        ) : (
          data.map((goal) => (
            <div
              key={goal.id}
              // style={{ color: '#4CAF50' }}
              className="card text-gray-800 w-96 border border-black-900 shadow-lg hover:shadow-xl transition-all duration-200 "
            >
              <div className="card-body flex flex-col items-center text-center">
                <h3 className="card-title text-xl font-bold text-black-400 underline ">
                  {goal.typeName.toUpperCase()}
                </h3>

                {/* Progress Status */}
                <div className="">
                  <p className="text-xl font-semibold text-center pb-1 ">
                    {goal.isAchieved ? "Achieved" : "On Progress"}
                  </p>
                  <p className="text-lg font-semibold">
                    {goal.isAchieved
                      ? 100
                      : Math.round(
                          (goal.currentValue / goal.targetValue) * 100
                        )}
                    %
                  </p>
                </div>
                <span>---------------------------</span>
                {/* Goal Information */}
                <div className="text-center">
                  <p className="text-lg font-semibold">
                    {formatNumber(goal.currentValue)}/
                    {formatNumber(goal.targetValue)}
                  </p>{" "}
                  {/* Bold current/target */}
                  <p className="text-lg">
                    {new Date(goal.startDate).toLocaleDateString()} -{" "}
                    {new Date(goal.endDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="card-actions flex gap-4 justify-center mt-4">
                  <button
                    onClick={() => handleDelete(goal.id)} // Trigger SweetAlert2 here
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
          ))
        )}
      </div>
      {loading && <p className="text-center text-black">Loading...</p>}

      <div className="text-center">
        <p className="mt-4 text-lg text-black-200">Tips: {randomTip}</p>
      </div>

      {/* Modal for Adding or Updating Goal */}
      <dialog id="goal_modal" className="modal" onClick={handleOutsideClick}>
        <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </button>
          {selectedGoalId ? (
            <>
              <h3 className="font-bold text-lg text-teal-400">Update Goal</h3>
              <UpdateGoal
                setGoal={setData}
                setPage={setPage}
                goalId={selectedGoalId}
                onGoalUpdated={fetchGoals}
              />
            </>
          ) : (
            <>
              <h3 className="font-bold text-lg text-teal-400">
                Create New Goal
              </h3>
              <CreateGoal 
              fetchGoals={fetchGoals}
              setPage={setPage} />
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
