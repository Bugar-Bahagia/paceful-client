import { useState } from "react";
import CreateActivity from "../Pages/Create Activity"; // Import your CreateActivity component

export default function AllActivity() {
    // Function to open the modal
    const openModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    // Function to close the modal
    const closeModal = () => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    // Function to close modal if user clicks outside the modal content
    const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (e.target === modal) {
            closeModal();
        }
    };

    return (
        <>
            {/* Add New Activity Button */}
            <div className="flex justify-center items-center pt-10">
                <button className="btn btn-info" onClick={openModal}>
                    Add new activity
                </button>
            </div>

            {/* Activity List */}
            <div className="flex flex-wrap justify-center gap-4 pt-10">
                <div className="justify-between sm:w-1/3 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-700">Running</h3>
                        <p className="text-gray-600">120 minutes</p>
                        <p className="text-gray-600">10 km</p>
                        <p className="text-gray-600">2000 calories</p>
                        <p className="text-sm text-gray-500 mt-2">24/11/2024</p>
                    </div>
                    <div className="flex justify-center mt-4 gap-2">
                        <button className="btn btn-error">Delete</button>
                    </div>
                </div>
                {/* Repeat other activity cards here */}
            </div>

            {/* Modal for Creating New Activity */}
            <dialog id="my_modal_1" className="modal" onClick={handleOutsideClick}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Create New Activity</h3>

                    {/* Embed CreateActivity form */}
                    <CreateActivity />
                </div>
            </dialog>
        </>
    );
}
