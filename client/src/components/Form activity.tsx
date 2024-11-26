import { useState, useEffect } from "react";

// Define the Active type (same as in CreateActivity)
interface Active {
  typeName: string;
  duration: string;
  distance: string;
  notes: string;
  activityDate: string;
}

interface FormAddActivityProps {
  active: Active;
  handleSubmit: (data: Active) => void;
  onChange: (name: string, value: string) => void; // Pass updated field name and value
}

export default function FormAddActivity({ active, handleSubmit, onChange }: FormAddActivityProps) {
  const [typeName, setTypeName] = useState<string>(active.typeName);
  const [duration, setDuration] = useState<string>(active.duration);
  const [distance, setDistance] = useState<string>(active.distance);
  const [notes, setNotes] = useState<string>(active.notes);
  const [activityDate, setActivityDate] = useState<string>(active.activityDate);

  // Sync form values with the `active` prop whenever it changes
  useEffect(() => {
    setTypeName(active.typeName);
    setDuration(active.duration);
    setDistance(active.distance);
    setNotes(active.notes);
    setActivityDate(active.activityDate);
  }, [active]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ typeName, duration, distance, notes, activityDate });
  };

  // Handle change for each field and call onChange
  const handleChange = (name: string, value: string) => {
    // Update the state for the corresponding field
    if (name === "typeName") setTypeName(value);
    if (name === "duration") setDuration(value);
    if (name === "distance") setDistance(value);
    if (name === "notes") setNotes(value);
    if (name === "activityDate") setActivityDate(value);

    // Call onChange to pass updated field to parent
    onChange(name, value);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
    <form onSubmit={handleSubmitForm} className="space-y-6">
      {/* Activity Type */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-medium">Activity Type</span>
        </label>
        <select
          name="typeName"
          value={typeName}
          onChange={(e) => handleChange("typeName", e.target.value)}
          className="select select-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">
            select option
          </option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          {/* Add more options as needed */}
        </select>
      </div>
  
      {/* Duration */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-medium">Duration</span>
        </label>
        <input
          name="duration"
          type="text"
          value={duration}
          onChange={(e) => handleChange("duration", e.target.value)}
          placeholder="Enter duration"
          className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      {/* Distance */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-medium">Distance</span>
        </label>
        <input
          name="distance"
          type="text"
          value={distance}
          onChange={(e) => handleChange("distance", e.target.value)}
          placeholder="Enter distance"
          className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      {/* Notes */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-medium">Notes</span>
        </label>
        <input
          name="notes"
          type="text"
          value={notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Enter notes"
          className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      {/* Activity Date */}
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg font-medium">Activity Date</span>
        </label>
        <input
          name="activityDate"
          type="text"
          value={activityDate}
          onChange={(e) => handleChange("activityDate", e.target.value)}
          placeholder="Enter date"
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
  
  );
}
