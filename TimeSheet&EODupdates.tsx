import { useState } from 'react';
import { CalendarDays, Clock, Mail } from 'lucide-react';
const sampleData = [
  { id: 1, name: 'Alice Johnson', department: 'Engineering', checkIn: '09:00', checkOut: '18:20', email: 'alice.johnson@example.com' },
  { id: 2, name: 'Bob Smith', department: 'Marketing', checkIn: '10:00', checkOut: '18:33', email: 'bob.smith@example.com' },
  { id: 3, name: 'Carla Gomez', department: 'Manager', checkIn: '09:15', checkOut: '18:30', email: 'carla.gomez@example.com' },
  { id: 4, name: 'David Lee', department: 'Engineering', checkIn: '08:45', checkOut: '17:50', email: 'david.lee@example.com' },
  { id: 5, name: 'Eva Green', department: 'Sales', checkIn: '09:00', checkOut: '16:30', email: 'eva.green@example.com' },
  { id: 6, name: 'Frank Wright', department: 'Design', checkIn: '09:30', checkOut: '18:30', email: 'frank.wright@example.com' },
  { id: 7, name: 'Grace Hall', department: 'Finance', checkIn: '09:00', checkOut: '18:15', email: 'grace.hall@example.com' },
  { id: 8, name: 'Henry Adams', department: 'Support', checkIn: '08:55', checkOut: '17:20', email: 'henry.adams@example.com' },
  { id: 9, name: 'Isla Parker', department: 'Legal', checkIn: '09:05', checkOut: '18:55', email: 'isla.parker@example.com' },
  { id: 10, name: 'Jack Turner', department: 'Engineering', checkIn: '09:10', checkOut: '18:05', email: 'jack.turner@example.com' },
  { id: 11, name: 'Karen Mitchell', department: 'Marketing', checkIn: '09:00', checkOut: '17:30', email: 'karen.mitchell@example.com' },
  { id: 12, name: 'Liam Scott', department: 'L&D HR', checkIn: '08:50', checkOut: '19:45', email: 'liam.scott@example.com' },
  { id: 13, name: 'Mia Young', department: 'Engineering', checkIn: '09:05', checkOut: '18:10', email: 'mia.young@example.com' },
  { id: 14, name: 'Noah King', department: 'Sales', checkIn: '09:15', checkOut: '17:00', email: 'noah.king@example.com' },
  { id: 15, name: 'Olivia Baker', department: 'Design', checkIn: '09:00', checkOut: '17:50', email: 'olivia.baker@example.com' },
  { id: 16, name: 'Paul Turner', department: 'Finance', checkIn: '09:20', checkOut: '18:15', email: 'paul.turner@example.com' },
  { id: 17, name: 'Quinn Harris', department: 'Support', checkIn: '09:00', checkOut: '19:40', email: 'quinn.harris@example.com' },
  { id: 18, name: 'Rachel Adams', department: 'Legal', checkIn: '08:55', checkOut: '17:30', email: 'rachel.adams@example.com' },
  { id: 19, name: 'Samuel Nelson', department: 'Engineering', checkIn: '09:05', checkOut: '18:00', email: 'samuel.nelson@example.com' },
  { id: 20, name: 'Tina Clark', department: 'Marketing', checkIn: '09:10', checkOut: '19:50', email: 'tina.clark@example.com' },
  { id: 21, name: 'Uma Brooks', department: 'D&A HR', checkIn: '09:00', checkOut: '19:30', email: 'uma.brooks@example.com' },
  { id: 22, name: 'Victor Morgan', department: 'Engineering', checkIn: '09:15', checkOut: '18:00', email: 'victor.morgan@example.com' },
  { id: 23, name: 'Wendy Cooper', department: 'Sales', checkIn: '08:50', checkOut: '17:45', email: 'wendy.cooper@example.com' },
  { id: 24, name: 'Xavier Reed', department: 'Design', checkIn: '09:05', checkOut: '20:55', email: 'xavier.reed@example.com' },
  { id: 25, name: 'Yara Fisher', department: 'Finance', checkIn: '09:00', checkOut: '18:00', email: 'yara.fisher@example.com' },
  { id: 26, name: 'Zachary Kelly', department: 'Support', checkIn: '09:10', checkOut: '18:10', email: 'zachary.kelly@example.com' },
];

function calculateHours(checkIn: string, checkOut: string): number {
  const [inH, inM] = checkIn.split(':').map(Number);
  const [outH, outM] = checkOut.split(':').map(Number);
  const inTime = inH * 60 + inM;
  const outTime = outH * 60 + outM;
  return Math.round((outTime - inTime) / 60 * 100) / 100;
}

const EODReport = () => {
  const [reportDate, setReportDate] = useState<string>(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD

  const generateEmailBody = () => {
    let body = `EOD Report for ${reportDate}%0D%0A%0D%0A`; // URL encoded line breaks
    sampleData.forEach(emp => {
      const totalHours = calculateHours(emp.checkIn, emp.checkOut).toFixed(2);
      const status = Number(totalHours) < 9 ? 'Incomplete' : 'Complete';
      body += `${emp.name} (${emp.department}): Check-in ${emp.checkIn}, Check-out ${emp.checkOut}, Total Hours: ${totalHours} hrs, Status: ${status}%0D%0A`;
    });
    return body;
  };

  const mailtoLink = `mailto:hr@example.com?subject=EOD Report for ${reportDate}&body=${generateEmailBody()}`;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Clock className="text-blue-500" /> EOD Report - Work Hours Summary
      </h1>

      <div className="mb-6 flex items-center gap-4">
        <label className="flex items-center gap-2 font-medium">
          <CalendarDays />
          Date:
        </label>
        <input
          type="date"
          className="border px-3 py-2 rounded"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-xl shadow">
          <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
            <tr>
              <th className="px-4 py-2">Employee</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Check-In</th>
              <th className="px-4 py-2">Check-Out</th>
              <th className="px-4 py-2">Total Hours</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((emp) => {
              const totalHours = calculateHours(emp.checkIn, emp.checkOut);
              const isUnderworked = totalHours < 9;

              return (
                <tr key={emp.id} className="border-t text-sm hover:bg-gray-50">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.department}</td>
                  <td className="px-4 py-2">{emp.checkIn}</td>
                  <td className="px-4 py-2">{emp.checkOut}</td>
                  <td className="px-4 py-2">{totalHours.toFixed(2)} hrs</td>
                  <td className={`px-4 py-2 font-semibold ${isUnderworked ? 'text-red-600' : 'text-green-600'}`}>
                    {isUnderworked ? 'Incomplete' : 'Complete'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Send Email Button */}
      <div className="mt-6">
        <a
          href={mailtoLink}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
          Send Report to HR
        </a>
      </div>
    </div>
  );
};

export default EODReport;
