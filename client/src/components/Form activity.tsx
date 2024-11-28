import { useState, useEffect } from "react";

// Define the Active type (same as in CreateActivity and UpdateActivity)
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

export default function FormAddActivity({
  active,
  handleSubmit,
  onChange,
}: FormAddActivityProps) {
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
    <div className="pb-10">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Activity Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">
                Activity Type
              </span>
            </label>
            <select
              name="typeName"
              value={typeName}
              onChange={(e) => handleChange("typeName", e.target.value)}
              className="select select-bordered w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">
                Dare yourself
              </option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
              <option value="swimming">Swimming</option>
              <option value="hiking">Hiking</option>
              <option value="walking">Walking</option>
            </select>
          </div>

          {/* Duration */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">
                Duration in minutes
              </span>
            </label>
            <input
              name="duration"
              type="number"
              value={duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              placeholder="example: 10"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Distance */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">
                Distance in meters
              </span>
            </label>
            <input
              name="distance"
              type="number"
              value={distance}
              onChange={(e) => handleChange("distance", e.target.value)}
              placeholder="example: 1000"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="form-control">
            {/* <label className="label">
              <span className="label-text text-lg font-medium">Notes</span>
            </label>
            <input
              name="notes"
              type="text"
              value={notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Enter notes"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            /> */}
            <label className="form-control">
              <div className="label">
              <span className="label-text text-lg font-medium">Notes</span>
              </div>
              <textarea
              name="notes"
              value={notes}
              onChange={(e) => handleChange("notes", e.target.value)}
                className="textarea textarea-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2"
                placeholder="Notes"
              ></textarea>
            </label>
          </div>

          {/* Activity Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">
                Activity Date
              </span>
            </label>
            <input
              name="activityDate"
              type="date"
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
    </div>
  );
}
