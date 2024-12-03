import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { Goal } from "./Goals";

interface GoalData {
  targetValue: string;
  startDate: string;
  endDate: string;
}

interface UpdateGoalProps {
  setGoal: React.Dispatch<React.SetStateAction<Goal[]>>,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  goalId: string;
  onGoalUpdated: () => void; // Callback when goal is updated
}

export default function UpdateGoal({ 
  onGoalUpdated,
  setPage,
  setGoal,
  goalId, 
}: UpdateGoalProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<GoalData>({
    targetValue: "",
    startDate: "",
    endDate: "",
  });

  const [initialData, setInitialData] = useState<GoalData | null>(null); // Store the initial data
  const [isSubmitting, setIsSubmitting] = useState(false); // To track if form is submitting

  const fetchData = async () => {
    try {
      const response = await axiosClient({
        method: "GET",
        url: `/goals/${goalId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const goalData = response.data;
      const formattedStartDate = new Date(goalData.startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(goalData.endDate)
        .toISOString()
        .split("T")[0];

      const fetchedData = {
        targetValue: goalData.targetValue,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
      
      setData(fetchedData);
      setInitialData(fetchedData); // Store initial data to compare later
    } catch (error) {
      console.error("🚀 ~ fetchData ~ error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to fetch goal data. Please try again.",
      });
    }
  };

  const handleUpdate = async (formData: GoalData) => {
    setIsSubmitting(true); // Indicate submission process has started
    try {
      await axiosClient({
        method: "PUT",
        url: `/goals/${goalId}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // After successful update
      // onGoalUpdated();
      setGoal([])
      onGoalUpdated()
      // setPage(0)
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Goal updated successfully!",
      });

      navigate("/goal"); // Redirect to goal list page
    } catch (error) {
      console.error("🚀 ~ handleUpdate ~ error:", error);
      if (error instanceof AxiosError && error.response?.status === 400) {
        const message = error.response?.data?.message || "Failed to update goal. Please check your input and try again.";
      
        Swal.fire({
          icon: "error",
          title: "Bad Request",
          text: message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
        });
      }
      closeModal();
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("goal_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const isFormDataChanged = (): boolean => {
    if (!initialData) return false;
    return (
      data.targetValue !== initialData.targetValue ||
      data.startDate !== initialData.startDate ||
      data.endDate !== initialData.endDate
    );
  };

  useEffect(() => {
    fetchData();
  }, [goalId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    if (!isFormDataChanged()) {
      Swal.fire({
        icon: "info",
        title: "No Changes Detected",
        text: "You have not made any changes to the data.",
      });
      return;
    }
    handleUpdate(data); // Proceed with update if changes were made
  };

  return (
    <div className="pb-10">
      <div id="goal-modal" className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmitForm} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Target Value</span>
            </label>
            <input
              name="targetValue"
              type="number"
              value={data.targetValue}
              onChange={handleChange}
              placeholder="Enter target value"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Start Date</span>
            </label>
            <input
              name="startDate"
              type="date"
              value={data.startDate}
              onChange={handleChange}
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">End Date</span>
            </label>
            <input
              name="endDate"
              type="date"
              value={data.endDate}
              onChange={handleChange}
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`btn bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
