// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosClient from "../utils/axiosClient";
// import FormAddActivity from "../components/FormActivity"; // Adjusted the import for consistency

// interface ActivityData {
//   typeName: string;
//   duration: string;
//   distance: string;
//   notes: string;
//   activityDate: string;
// }

// interface UpdateActivityProps {
//   activityId: string;
// }

// export default function UpdateActivity({ activityId }: UpdateActivityProps) {
//   // Ubah `id` menjadi `activityId` dalam kode Anda


//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [data, setData] = useState<ActivityData>({
//     typeName: "",
//     duration: "",
//     distance: "",
//     notes: "",
//     activityDate: "",
//   });

//   const fetchData = async () => {
//     if (!id) return;

//     try {
//       const response = await axiosClient({
//         method: "GET",
//         url: `/activities/${id}`,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setData(response.data);
//     } catch (error) {
//       console.log("🚀 ~ fetchData ~ error:", error);
//     }
//   };

//   const handleUpdate = async (formData: ActivityData) => {
//     try {
//       await axiosClient({
//         method: "PUT",
//         url: `/activities/${id}`,
//         data: formData,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       navigate("/activity-log");
//     } catch (error) {
//       console.log("🚀 ~ handleUpdate ~ error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   // Handle form field changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submit
//   const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handleUpdate(data);
//   };

//   return (
//     <div className="pb-10">
//       <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
//         <form onSubmit={handleSubmitForm} className="space-y-6">
//           {/* Activity Type */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-lg font-medium">Activity Type</span>
//             </label>
//             <select
//               name="typeName"
//               value={data.typeName}
//               onChange={handleChange}
//               className="select select-bordered w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             >
//               <option disabled value="">
//                 select option
//               </option>
//               <option value="running">Running</option>
//               <option value="cycling">Cycling</option>
//               <option value="swimming">Swimming</option>
//               <option value="hiking">Hiking</option>
//               <option value="walking">Walking</option>
//             </select>
//           </div>

//           {/* Duration */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-lg font-medium">Duration in minutes</span>
//             </label>
//             <input
//               name="duration"
//               type="number"
//               value={data.duration}
//               onChange={handleChange}
//               placeholder="example: 10"
//               className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Distance */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-lg font-medium">Distance in meters</span>
//             </label>
//             <input
//               name="distance"
//               type="number"
//               value={data.distance}
//               onChange={handleChange}
//               placeholder="example: 1000"
//               className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Notes */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-lg font-medium">Notes</span>
//             </label>
//             <input
//               name="notes"
//               type="text"
//               value={data.notes}
//               onChange={handleChange}
//               placeholder="Enter notes"
//               className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Activity Date */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-lg font-medium">Activity Date</span>
//             </label>
//             <input
//               name="activityDate"
//               type="date"
//               value={data.activityDate}
//               onChange={handleChange}
//               placeholder="Enter date"
//               className="input input-bordered w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="btn bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

interface ActivityData {
  typeName: string;
  duration: string;
  distance: string;
  notes: string;
  activityDate: string;
}

interface UpdateActivityProps {
  activityId: string;
  onActivityUpdated: () => void; // Add this callback prop
}

export default function UpdateActivity({ activityId, onActivityUpdated }: UpdateActivityProps) {
  const navigate = useNavigate();

  const [data, setData] = useState<ActivityData>({
    typeName: "",
    duration: "",
    distance: "",
    notes: "",
    activityDate: "",
  });

  const fetchData = async () => {
    try {
      const response = await axiosClient({
        method: "GET",
        url: `/activities/${activityId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Convert the date string to yyyy-MM-dd format
      const activityData = response.data;
      const formattedDate = new Date(activityData.activityDate).toISOString().split("T")[0];
  
      // Set the data state with the formatted date
      setData({
        ...activityData,
        activityDate: formattedDate,
      });
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
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
      onActivityUpdated(); // Re-fetch activities after update
      navigate("/activity-log"); // Navigate back to the activity log page
    } catch (error) {
      console.log("🚀 ~ handleUpdate ~ error:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [activityId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <div className="pb-10 ">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <form onSubmit={handleSubmitForm} className="space-y-6">
         
 {/* Activity Type */}
 <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium">Activity Type</span>
            </label>
            <select
              name="typeName"
              value={data.typeName}
              onChange={handleChange}
              className="select select-bordered w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">
                select option
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
              <span className="label-text text-lg font-medium">Duration in minutes</span>
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
              <span className="label-text text-lg font-medium">Distance in meters</span>
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
            <input
              name="notes"
              type="text"
              value={data.notes}
              onChange={handleChange}
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
              type="date"
              value={data.activityDate}
              onChange={handleChange}
              placeholder="Enter date"
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
