import { useEffect, useState } from "react";
import CreateActivity from "./Create Activity";
import UpdateActivity from "./Update Activity";
import axiosClient from "../../utils/axiosClient";
import Swal from "sweetalert2";

const tips = [
  "Great job! You’ve conquered today’s challenge. Remember, consistency is key to achieving greatness.",
  "Well done! Recovery is just as important as the workout itself. Hydrate, refuel, and rest well to come back stronger tomorrow!",
  "Another step closer to your goal! Keep the momentum going, and remember why you started this journey.",
  "Your dedication today is shaping a stronger, healthier you. Be proud of what you accomplished!",
];

const randomTip = tips[Math.floor(Math.random() * tips.length)];
export interface Active {
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchingActivity = async () => {
    if (page > totalPages) return;
    try {
      setLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1000)); 

      const response = await axiosClient.get(`/activities?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { activities, totalPage } = response.data;
      setData((prevData: Active[]) => {
        const newActivities = activities.filter(
          (activity: Active) => !prevData.some((item: Active) => item.id === activity.id)
        );
        return [...newActivities, ...prevData ];
      });
      // setData((prevData: Active[]) => {
        
      //   return [...prevData, ...activities];
      // });
      // setData(activities)
      console.log('activities', activities);
      
      setTotalPages(totalPage);
      // setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error: any) {
      console.error(
        "Error while fetching activities:",
        error?.response?.data || error.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingActivity(); 
  }, [page]);

  const handleScroll = () => {
    setPage((prevPage) => prevPage + 1);

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      if (!loading) fetchingActivity();
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
      text: "You will not be able to recover this activity!",
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

          await axiosClient.delete(`/activities/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setData((prevActive) =>
            prevActive.filter((activity) => activity.id !== id)
          );
          Swal.fire("Deleted!", "Your activity has been deleted.", "success");
        } catch (error: any) {
          console.error(
            "Error while deleting activity:",
            error?.response?.data || error.message
          );
          Swal.fire(
            "Error!",
            "There was an issue deleting the activity.",
            "error"
          );
        }
      }
    });
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
    fetchingActivity()
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const modal = document.getElementById(
      "activity_modal"
    ) as HTMLDialogElement;
    if (e.target === modal) closeModal();
  };

  return (
    <>
      <div className="bg bg-gradient-to-b bg-gray-500 dark:bg-gray-900 min-h-screen">
        {/* Header Section */}
        <header className="text-center pt-10">
          <h1 className="text-4xl font-bold text-white">
            DARE YOURSELF EVERYDAY
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            "Challenge yourself daily. Defy limits, embrace growth, and
            transform into the best version of you."
          </p>
        </header>
        <div className="flex justify-center items-center pt-10">
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
            onClick={() => openModal()}
          >
            Add new activity
          </button>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 pt-10 pb-10">
          {data.length === 0 ? (
            <div className="flex flex-col items-center">
              <img
                src={"../../../public/image/3.jpg"}
                alt="Motivational Fitness"
                className="rounded-lg shadow-lg "
                style={{
                  width: "600px", // atau gunakan unit lain seperti rem, %, dll.
                  height: "300px",
                }}
                />
              <p className="mt-4 text-lg text-white">
                "Stay motivated! Your fitness journey starts with a single
                step."
              </p>
            </div>
          ) : (
            data.map((e) => (
              <div
                key={e.id}
                className="card bg-gradient-to-b from-white to-teal-100 text-gray-100 w-96 border border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <div className="card-body items-center text-center text-black">
                  <h3 className="card-title text-xl font-semibold text-black-400 underline">
                    {e.typeName.toUpperCase()}
                  </h3>
                  <p>"{e.notes}"</p>
                  <p>Duration: {formatNumber(Number(e.duration))} menit</p>
                  <p>Distance: {formatNumber(Number(e.distance))} meter</p>
                  <p>
                    Kalori Burn: {formatNumber(Number(e.caloriesBurned))} kalori
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(e.activityDate).toLocaleDateString()}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => openModal(e.id)}
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
        {loading && <p className="text-center text-white">Loading...</p>}

        <div className="text-center">
          <p className="mt-4 text-lg text-gray-200">Tips: {randomTip}</p>
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
                setActivity={setData}
                setPage={setPage}
                  activityId={selectedActivityId}
                  onActivityUpdated={fetchingActivity}
                />
              </>
            ) : (
              <>
                <h3 className="font-bold text-lg text-teal-400">
                  Create New Activity
                </h3>
                <CreateActivity setPage={setPage} />
              </>
            )}
          </div>
        </dialog>
      </div>
    </>
  );
}
