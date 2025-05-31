import { useState } from 'react';
import { Award, Star, User, Trophy } from 'lucide-react';

const employees = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', performanceScore: 95 },
  { id: 2, name: 'Bob Smith', department: 'Marketing', performanceScore: 89 },
  { id: 3, name: 'Carla Gomez', department: 'HR', performanceScore: 92 },
  { id: 4, name: 'David Lee', department: 'Engineering', performanceScore: 87 },
  { id: 5, name: 'Eva Green', department: 'Sales', performanceScore: 91 },
  { id: 6, name: 'Frank Wright', department: 'Design', performanceScore: 85 },
  { id: 7, name: 'Grace Hall', department: 'Finance', performanceScore: 93 },
  { id: 8, name: 'Henry Adams', department: 'Support', performanceScore: 88 },
  { id: 9, name: 'Isla Parker', department: 'Legal', performanceScore: 90 },
  { id: 10, name: 'Jack Turner', department: 'Engineering', performanceScore: 86 },
];
const awards = [
  'Employee of the Month',
  'Top Performer',
  'Innovation Star',
  'Team Player Award',
  'Leadership Excellence',
];

const HRAwards = () => {
  const [awardedEmployees, setAwardedEmployees] = useState<{ [key: number]: { award: string; year: number } }>({});
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleAwardChange = (empId: number, award: string) => {
    setAwardedEmployees(prev => ({
      ...prev,
      [empId]: { award, year: selectedYear },
    }));
  };

  const handleSave = () => {
    console.log('Saving awards:', awardedEmployees);
    alert('Awards saved successfully! (Mock save)');
    // Replace with real API call
  };

  const filteredEmployees = employees
    .filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.performanceScore - a.performanceScore); // Sort by performance

  const winners = employees.filter(emp => awardedEmployees[emp.id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Award className="text-yellow-500" />
        HR Awards Management
      </h1>

      {/* Search and Year Filter */}
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or department..."
          className="border px-3 py-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {[2025, 2024, 2023].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Employee Award Assignment */}
      <div className="space-y-4">
        {filteredEmployees.map(emp => (
          <div key={emp.id} className="bg-white border shadow rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <User className="text-blue-500" />
                  {emp.name}
                </h2>
                <p className="text-sm text-gray-600">Department: {emp.department}</p>
                <p className="text-sm text-gray-600">Performance Score: {emp.performanceScore}</p>
              </div>

              <div className="flex flex-col gap-2">
                <select
                  className="border rounded px-3 py-1"
                  value={awardedEmployees[emp.id]?.award || ''}
                  onChange={(e) => handleAwardChange(emp.id, e.target.value)}
                >
                  <option value="">Select Award</option>
                  {awards.map((award, idx) => (
                    <option key={idx} value={award}>{award}</option>
                  ))}
                </select>

                {awardedEmployees[emp.id] && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Star size={14} />
                    {awardedEmployees[emp.id].award} ({awardedEmployees[emp.id].year})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Awards
      </button>

      {/* Appraisal Winners Section */}
      {winners.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Trophy className="text-orange-500" />
            Appraisal Winners ({selectedYear})
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {winners.map(emp => (
              <div key={emp.id} className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow">
                <h3 className="text-lg font-bold flex items-center gap-2 text-yellow-800">
                  <User /> {emp.name}
                </h3>
                <p className="text-sm text-gray-700">Department: {emp.department}</p>
                <p className="text-sm text-gray-700">Score: {emp.performanceScore}</p>
                <p className="text-sm mt-2 font-medium text-green-800 flex items-center gap-1">
                  <Star size={14} />
                  Award: {awardedEmployees[emp.id]?.award}
                </p>
                <p className="text-xs text-gray-500">Year: {awardedEmployees[emp.id]?.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HRAwards;
