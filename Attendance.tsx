import { useState } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, Download, ChevronDown } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';
import { attendanceRecords } from '../data/mockData';

const Attendance = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
  const goToPreviousDay = () => {
    setCurrentDate(prevDate => subDays(prevDate, 1));
  };
  
  const goToNextDay = () => {
    setCurrentDate(prevDate => addDays(prevDate, 1));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
          <p className="text-gray-500">Track and manage attendance records</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="btn btn-outline flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn btn-primary flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Clock In/Out
          </button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Total Working Days</p>
              <h3 className="text-2xl font-semibold mt-1">22</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Present Days</p>
              <h3 className="text-2xl font-semibold mt-1">18</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Absent Days</p>
              <h3 className="text-2xl font-semibold mt-1">2</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">Half Days</p>
              <h3 className="text-2xl font-semibold mt-1">1</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <HalfCircleIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Date Navigation */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`tab ${activeTab === 'daily' ? 'active' : ''}`}
              onClick={() => setActiveTab('daily')}
            >
              Daily
            </button>
            <button
              className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly
            </button>
            <button
              className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
            >
              Monthly
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* Daily View */}
          {activeTab === 'daily' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <button 
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={goToPreviousDay}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{format(currentDate, 'EEEE')}</h3>
                  <p className="text-gray-500">{format(currentDate, 'MMMM d, yyyy')}</p>
                </div>
                
                <button 
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={goToNextDay}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Attendance Details */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Check In</p>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-lg font-medium">09:03 AM</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Check Out</p>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-red-600 mr-2" />
                      <span className="text-lg font-medium">06:12 PM</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Present
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Hours</p>
                    <span className="text-lg font-medium">9h 9m</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-lg font-medium mb-4">Break Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-white p-3 rounded-md">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span>Lunch Break</span>
                      </div>
                      <span className="text-sm text-gray-500">01:00 PM - 02:00 PM (1h 0m)</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-white p-3 rounded-md">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                        <span>Tea Break</span>
                      </div>
                      <span className="text-sm text-gray-500">04:00 PM - 04:15 PM (0h 15m)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Weekly View */}
          {activeTab === 'weekly' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold">Week 21, 2025</h3>
                  <p className="text-gray-500">May 19 - May 25</p>
                </div>
                
                <button className="p-2 rounded-md hover:bg-gray-100">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Weekly Records */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Work Hours
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {weeklyData.map((day, index) => (
                      <tr key={index} className={day.isWeekend ? 'bg-gray-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`text-sm ${day.isWeekend ? 'text-gray-400' : 'text-gray-900'}`}>
                              {day.date}
                            </span>
                            <span className={`ml-2 text-xs ${day.isWeekend ? 'text-gray-400' : 'text-gray-500'}`}>
                              {day.day}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.checkIn || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.checkOut || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.workHours || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {day.status && (
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${day.status === 'Present' ? 'bg-green-100 text-green-800' : 
                                day.status === 'Absent' ? 'bg-red-100 text-red-800' : 
                                  day.status === 'Weekend' ? 'bg-gray-100 text-gray-800' : 
                                    'bg-yellow-100 text-yellow-800'}`}>
                              {day.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Weekly Stats: <span className="font-medium">5 Working Days</span> • 
                  <span className="text-green-600 font-medium"> 45h 30m</span> Total Hours
                </div>
                
                <button className="btn btn-outline flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Week
                </button>
              </div>
            </div>
          )}
          
          {/* Monthly View */}
          {activeTab === 'monthly' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-2">
                  <select
                    className="border border-gray-300 rounded-md p-2"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {format(new Date(2025, i, 1), 'MMMM')}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    className="border border-gray-300 rounded-md p-2"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    {[2023, 2024, 2025].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-2">
                  <button className="btn btn-outline flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Month
                  </button>
                </div>
              </div>
              
              {/* Calendar View */}
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                    <div key={i} className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {/* Generate empty cells for days before the 1st of the month */}
                  {Array.from({ length: getFirstDayOfMonth(selectedYear, selectedMonth) }, (_, i) => (
                    <div key={`empty-start-${i}`} className="bg-white h-28 p-2"></div>
                  ))}
                  
                  {/* Generate cells for each day of the month */}
                  {Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => {
                    const date = i + 1;
                    const isWeekend = isWeekendDay(new Date(selectedYear, selectedMonth, date));
                    const dayOfMonth = new Date(selectedYear, selectedMonth, date).getDay();
                    
                    // Mock attendance status - you would replace this with real data lookup
                    let status = '';
                    let statusClass = '';
                    
                    if (!isWeekend) {
                      if (date % 10 === 0) { // Every 10th day is absent
                        status = 'Absent';
                        statusClass = 'bg-red-100 text-red-800';
                      } else if (date % 7 === 0) { // Every 7th day is half day
                        status = 'Half Day';
                        statusClass = 'bg-yellow-100 text-yellow-800';
                      } else {
                        status = 'Present';
                        statusClass = 'bg-green-100 text-green-800';
                      }
                    }
                    
                    return (
                      <div 
                        key={`day-${date}`} 
                        className={`bg-white h-28 p-2 ${isWeekend ? 'bg-gray-50' : ''}`}
                      >
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${isWeekend ? 'text-gray-400' : 'text-gray-700'}`}>
                            {date}
                          </span>
                          {!isWeekend && status && (
                            <span className={`px-2 py-0.5 text-xs rounded-full ${statusClass}`}>
                              {status}
                            </span>
                          )}
                        </div>
                        
                        {!isWeekend && status === 'Present' && (
                          <div className="mt-1 text-xs text-gray-500">
                            <div>In: 09:00 AM</div>
                            <div>Out: 06:00 PM</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Generate empty cells for days after the last day of the month */}
                  {Array.from({ length: getLastEmptyCells(selectedYear, selectedMonth) }, (_, i) => (
                    <div key={`empty-end-${i}`} className="bg-white h-28 p-2"></div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-100 rounded-full mr-2"></div>
                  <span>Present: 18 days</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-100 rounded-full mr-2"></div>
                  <span>Half Day: 1 day</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
                  <span>Absent: 2 days</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 rounded-full mr-2"></div>
                  <span>Weekend: 8 days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper functions for monthly calendar
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getLastEmptyCells(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);
  const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
  return 6 - lastDayOfMonth;
}

function isWeekendDay(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// Mock data for weekly view
const weeklyData = [
  {
    date: 'May 19',
    day: 'Monday',
    checkIn: '09:02 AM',
    checkOut: '06:10 PM',
    workHours: '9h 8m',
    status: 'Present',
    isWeekend: false
  },
  {
    date: 'May 20',
    day: 'Tuesday',
    checkIn: '08:55 AM',
    checkOut: '06:05 PM',
    workHours: '9h 10m',
    status: 'Present',
    isWeekend: false
  },
  {
    date: 'May 21',
    day: 'Wednesday',
    checkIn: '09:10 AM',
    checkOut: '06:15 PM',
    workHours: '9h 5m',
    status: 'Present',
    isWeekend: false
  },
  {
    date: 'May 22',
    day: 'Thursday',
    checkIn: '09:05 AM',
    checkOut: '06:12 PM',
    workHours: '9h 7m',
    status: 'Present',
    isWeekend: false
  },
  {
    date: 'May 23',
    day: 'Friday',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    workHours: '9h 0m',
    status: 'Present',
    isWeekend: false
  },
  {
    date: 'May 24',
    day: 'Saturday',
    checkIn: '',
    checkOut: '',
    workHours: '',
    status: 'Weekend',
    isWeekend: true
  },
  {
    date: 'May 25',
    day: 'Sunday',
    checkIn: '',
    checkOut: '',
    workHours: '',
    status: 'Weekend',
    isWeekend: true
  }
];

// Simple icon components
function CheckCircleIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XCircleIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function HalfCircleIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C9.23858 2 7 6.47715 7 12C7 17.5228 9.23858 22 12 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Attendance;