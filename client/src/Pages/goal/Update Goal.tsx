import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";

interface GoalData {
  targetValue: string;
  startDate: string;
  endDate: string;
}

interface UpdateGoalProps {
  goalId: string;
  onGoalUpdated: () => void; // Callback ketika goal berhasil diupdate
}

export default function UpdateGoal({ goalId, onGoalUpdated }: UpdateGoalProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<GoalData>({
    targetValue: "",
    startDate: "",
    endDate: "",
  });

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

      setData({
        targetValue: goalData.targetValue,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } catch (error) {
      console.error("🚀 ~ fetchData ~ error:", error);
    }
  };

  const handleUpdate = async (formData: GoalData) => {
    try {
      await axiosClient({
        method: "PUT",
        url: `/goals/${goalId}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onGoalUpdated(); // Re-fetch data setelah update
      navigate("/goal"); // Redirect ke halaman list goal
    } catch (error) {
      console.error("🚀 ~ handleUpdate ~ error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [goalId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdate(data);
  };

  return (
    <div className="pb-10">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Target Value */}
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

          {/* Start Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Start Date</span>
            </label>
            <input
              name="startDate"
              type="date"
              value={data.startDate}
              onChange={handleChange}
              placeholder="Select start date"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">End Date</span>
            </label>
            <input
              name="endDate"
              type="date"
              value={data.endDate}
              onChange={handleChange}
              placeholder="Select end date"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
