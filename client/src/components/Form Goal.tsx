import { useState } from "react";

interface Goal {
  typeName: string;
  targetValue: string;
  startDate: string;
  endDate: string;
}

interface FormAddGoalProps {
  goal: Goal;
  handleSubmit: (data: Goal) => void;
  onChange: (name: string, value: string) => void;
}

export default function FormAddGoal({
  goal,
  handleSubmit,
  onChange,
}: FormAddGoalProps) {
  const [typeName, setTypeName] = useState<string>(goal.typeName);
  const [targetValue, setTargetValue] = useState<string>(goal.targetValue);
  const [startDate, setStartDate] = useState<string>(goal.startDate);
  const [endDate, setEndDate] = useState<string>(goal.endDate);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ typeName, targetValue, startDate, endDate });
  };

  const handleChange = (name: string, value: string) => {
    if (name === "typeName") setTypeName(value);
    if (name === "targetValue") setTargetValue(value);
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
    onChange(name, value);
  };

  return (
    <div className="pb-10">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Goal Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Goal Type</span>
            </label>
            <select
              name="typeName"
              value={typeName}
              onChange={(e) => handleChange("typeName", e.target.value)}
              className="select select-bordered w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">
                Select goal type
              </option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="swimming">Swimming</option>
              <option value="hiking">Hiking</option>
              <option value="walking">Walking</option>
            </select>
          </div>

          {/* Target Value */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">
                Target Value
              </span>
            </label>
            <input
              name="targetValue"
              type="number"
              value={targetValue}
              onChange={(e) => handleChange("targetValue", e.target.value)}
              placeholder="example: 5000"
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
              value={startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
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
              value={endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
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
