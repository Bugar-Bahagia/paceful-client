import { useState, useEffect } from "react";
import axiosClient from "../../utils/axiosClient";
import Swal from 'sweetalert2';
import { Active } from "./Activity-log";

interface ActivityData {
  typeName: string;
  duration: string;
  distance: string;
  notes: string;
  activityDate: string;
}

interface UpdateActivityProps {
  setActivity: React.Dispatch<React.SetStateAction<Active[]>>
  activityId: string;
  onActivityUpdated: (reset: boolean) => void; 
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function UpdateActivity({
  onActivityUpdated,
  setActivity,
  activityId,
}: UpdateActivityProps) {
  const [data, setData] = useState<ActivityData>({
    typeName: "",
    duration: "",
    distance: "",
    notes: "",
    activityDate: "",
  });
  const [initialData, setInitialData] = useState<ActivityData | null>(null); 

  
  const fetchData = async () => {
    try {
      const response = await axiosClient({
        method: "GET",
        url: `/activities/${activityId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      
      const activityData = response.data;
      const formattedDate = new Date(activityData.activityDate)
        .toISOString()
        .split("T")[0];

      const fetchedData = {
        ...activityData,
        activityDate: formattedDate,
      };
      setData(fetchedData);
      setInitialData(fetchedData); 
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to fetch activity data. Please try again.',
      });
    }
  };

  const handleUpdate = async (formData: ActivityData) => {
    try {
      await axiosClient({
        method: "PUT",
        url: `/activities/${activityId}`,
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setActivity([])
      onActivityUpdated(true)
      // setPage(1)
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Activity updated successfully!',
      });
    } catch (error: any) {
      console.log("🚀 ~ handleUpdate ~ error:", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Bad Request',
          text: `Failed to update activity. ${error.response?.data?.message || 'Please check your input and try again.'}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
        });
      }
      closeModal(); 
    }
  };

  const closeModal = () => {
    const modal = document.getElementById("activity_modal") as HTMLDialogElement;
    if (modal) {
      modal.close(); 
    }
  };

  const isFormDataChanged = (): boolean => {
    if (!initialData) return false; 
    return (
      data.typeName !== initialData.typeName ||
      data.duration !== initialData.duration ||
      data.distance !== initialData.distance ||
      data.notes !== initialData.notes ||
      data.activityDate !== initialData.activityDate
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal()
    if (!isFormDataChanged()) {
      Swal.fire({
        icon: 'info',
        title: 'No Changes Detected',
        text: 'You have not made any changes to the data.',
      });
    } else {
      handleUpdate(data); 
    }
  };

  useEffect(() => {
    fetchData();
  }, [activityId]);

  return (
    <div className="pb-10">
      <div id="activity_modal" className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmitForm} className="space-y-6">
          {/* Activity Type (Read-Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">
                Activity Type
              </span>
            </label>
            <input
              name="typeName"
              type="text"
              value={data.typeName}
              readOnly
              className="input input-bordered w-full p-3 border-2 border-gray-300 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
            />
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
              value={data.duration}
              onChange={handleChange}
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
              value={data.distance}
              onChange={handleChange}
              placeholder="example: 1000"
              className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Notes */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Notes</span>
            </label>
            <textarea
              name="notes"
              value={data.notes}
              onChange={handleChange}
              placeholder="Enter notes"
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
