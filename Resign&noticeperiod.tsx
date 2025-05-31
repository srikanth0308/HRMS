import React, { useState } from "react";

const initialResignations = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "Alice Thompson",
    email: "alice.thompson@example.com",
    region: "India",
    resignationReason: "Personal reasons",
    coverLetter: "I am resigning for personal reasons. Thank you for the opportunity.",
    resignationDate: "2025-05-10",
    lastWorkingDay: "2025-06-10",
    totalWorkingDays: 22,
    formalities: {
      exitInterview: false,
      assetHandover: false,
      finalSettlement: false,
    },
    status: "Pending", // Pending or Accepted
  },
  {
    id: 2,
    employeeId: "EMP002",
    name: "Bob Marley",
    email: "bob.marley@example.com",
    region: "USA",
    resignationReason: "Looking for new career challenges",
    coverLetter: "Looking for new career challenges. Appreciate the support.",
    resignationDate: "2025-05-15",
    lastWorkingDay: "2025-06-15",
    totalWorkingDays: 30,
    formalities: {
      exitInterview: false,
      assetHandover: false,
      finalSettlement: false,
    },
    status: "Pending",
  },
];

const Resignation = () => {
  const [resignations, setResignations] = useState(initialResignations);
  const [loadingIds, setLoadingIds] = useState([]);

  const toggleFormality = (id, formalityKey) => {
    setResignations((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              formalities: {
                ...r.formalities,
                [formalityKey]: !r.formalities[formalityKey],
              },
            }
          : r
      )
    );
  };

  const handleAccept = (id) => {
    const emp = resignations.find((r) => r.id === id);
    if (
      !emp.formalities.exitInterview ||
      !emp.formalities.assetHandover ||
      !emp.formalities.finalSettlement
    ) {
      alert("Please complete all formalities before accepting resignation.");
      return;
    }
    setLoadingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setResignations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Accepted" } : r))
      );
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }, 1500);
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this resignation record?")) {
      setResignations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6 max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Resignation Management</h2>

      <div className="space-y-6">
        {resignations.map((emp) => {
          const isLoading = loadingIds.includes(emp.id);
          const allFormalitiesDone =
            emp.formalities.exitInterview &&
            emp.formalities.assetHandover &&
            emp.formalities.finalSettlement;

          return (
            <div key={emp.id} className="border border-gray-200 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    <span className="font-semibold">{emp.name}</span> (ID: {emp.employeeId}) —{" "}
                    <span className="text-gray-500">{emp.region}</span>
                  </p>
                  <p className="text-xs text-gray-500">Email: {emp.email}</p>
                  <p className="text-xs text-gray-500">
                    Resignation Reason: <em>{emp.resignationReason}</em>
                  </p>
                  <p className="text-xs text-gray-500">
                    Resigned: {emp.resignationDate} | Last Day: {emp.lastWorkingDay}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(emp.id)}
                    disabled={emp.status === "Accepted" || isLoading}
                    className={`text-sm px-3 py-1 rounded ${
                      emp.status === "Accepted"
                        ? "bg-gray-300 cursor-not-allowed"
                        : isLoading
                        ? "bg-yellow-400 cursor-wait"
                        : allFormalitiesDone
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    title={
                      !allFormalitiesDone
                        ? "Complete all formalities first"
                        : "Accept Resignation"
                    }
                  >
                    {isLoading
                      ? "Processing..."
                      : emp.status === "Accepted"
                      ? "Resignation Accepted"
                      : "Accept Resignation"}
                  </button>

                  <button
                    onClick={() => handleRemove(emp.id)}
                    disabled={isLoading}
                    className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    title="Remove Resignation"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-2">Working Days: {emp.totalWorkingDays}</div>

              <div className="text-xs text-gray-600 italic mb-4 bg-gray-50 p-2 rounded">
                <strong>Cover Letter:</strong> {emp.coverLetter}
              </div>

              <div className="flex gap-3 mb-2">
                {["exitInterview", "assetHandover", "finalSettlement"].map((key) => (
                  <button
                    key={key}
                    onClick={() => toggleFormality(emp.id, key)}
                    disabled={emp.status === "Accepted"}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      emp.formalities[key]
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {key === "exitInterview"
                      ? "Exit Interview"
                      : key === "assetHandover"
                      ? "Asset Handover"
                      : "Final Settlement"}
                  </button>
                ))}
              </div>

              <div className="text-xs">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    emp.status === "Accepted" ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {emp.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resignation;
