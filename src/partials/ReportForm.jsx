import React, { useState } from "react";
 
const ReportForm = ({ toggleForm, setPendingReports }) => {
    // Local state for form fields
    const [belt, setBelt] = useState("OreLink4000");
    const [cost, setCost] = useState("");
    const [downtime, setDowntime] = useState("");
    const [reason, setReason] = useState("");
    const [notes, setNotes] = useState("");
 
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
 
        // Create a new pending report
        const newReport = {
            date: new Date(),
            belt,
            cost: parseFloat(cost),
            expectedDowntime: parseInt(downtime),
            reason,
            notes,
        };
 
        // Add the new report to pendingReports
        setPendingReports((prevReports) => [newReport, ...prevReports]);
 
        // Close the form
        toggleForm(false);
    };
 
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-1/2 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">New Report</h2>
                    <button
                        onClick={() => toggleForm(false)}
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>
 
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Belt Dropdown */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Belt</label>
                        <select
                            value={belt}
                            onChange={(e) => setBelt(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                        >
                            <option value="OreLink4000">OreLink4000</option>
                            <option value="Pilbara Express">Pilbara Express</option>
                            <option value="DustTrail Belt">DustTrail Belt</option>
                            <option value="RedEarth Conveyor">RedEarth Conveyor</option>
                            <option value="IronFlow 01">IronFlow 01</option>
                        </select>
                    </div>
 
                    {/* Estimated Cost */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Estimated Cost ($)</label>
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                    </div>
 
                    {/* Estimated Downtime */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Estimated Downtime (hours)</label>
                        <input
                            type="number"
                            value={downtime}
                            onChange={(e) => setDowntime(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                    </div>
 
                    {/* Reason */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Reason</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                            required
                        />
                    </div>
 
                    {/* Notes */}
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                        ></textarea>
                    </div>
 
                    {/* Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => toggleForm(false)}
                            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 rounded text-gray-800 dark:text-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
 
export default ReportForm;