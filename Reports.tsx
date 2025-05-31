import { useState } from 'react';
import { BarChart3, Download, Filter, Calendar, Users, Clock, FileText } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Reports = () => {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('thisMonth');
  
  // Mock data for charts
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Present',
        data: [45, 42, 44, 41, 43, 20, 15],
        backgroundColor: '#10b981',
      },
      {
        label: 'Absent',
        data: [5, 8, 6, 9, 7, 2, 1],
        backgroundColor: '#ef4444',
      },
    ],
  };
  
  const leaveData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Leave Applications',
        data: [12, 19, 15, 17, 14, 16],
        borderColor: '#6366f1',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500">View and analyze company statistics</p>
        </div>
        
        <button className="btn btn-outline flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </button>
      </div>
      
      {/* Report Type Selection */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            className={`flex items-center p-4 rounded-lg border ${
              reportType === 'attendance' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('attendance')}
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Attendance Report</span>
          </button>
          
          <button 
            className={`flex items-center p-4 rounded-lg border ${
              reportType === 'leave' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('leave')}
          >
            <Calendar className="w-5 h-5 mr-3" />
            <span>Leave Report</span>
          </button>
          
          <button 
            className={`flex items-center p-4 rounded-lg border ${
              reportType === 'timesheet' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('timesheet')}
          >
            <Clock className="w-5 h-5 mr-3" />
            <span>Timesheet Report</span>
          </button>
          
          <button 
            className={`flex items-center p-4 rounded-lg border ${
              reportType === 'performance' 
                ? 'border-purple-500 bg-purple-50 text-purple-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setReportType('performance')}
          >
            <BarChart3 className="w-5 h-5 mr-3" />
            <span>Performance Report</span>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4">
          <select
            className="input-field"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>
          
          <select className="input-field">
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
          
          <button className="btn btn-outline flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>
      
      {/* Report Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {reportType === 'attendance' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Attendance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Present Today</p>
                <p className="text-2xl font-semibold text-green-700">45</p>
                <p className="text-sm text-gray-500">Out of 50 employees</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Absent Today</p>
                <p className="text-2xl font-semibold text-red-700">3</p>
                <p className="text-sm text-gray-500">6% of workforce</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-semibold text-yellow-700">2</p>
                <p className="text-sm text-gray-500">4% of workforce</p>
              </div>
            </div>
            
            <div className="h-96">
              <Bar 
                data={attendanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Weekly Attendance Overview'
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
        
        {reportType === 'leave' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Leave Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Leave Requests</p>
                <p className="text-2xl font-semibold text-purple-700">93</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Approved Leaves</p>
                <p className="text-2xl font-semibold text-blue-700">82</p>
                <p className="text-sm text-gray-500">88% approval rate</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-semibold text-orange-700">11</p>
                <p className="text-sm text-gray-500">Requires action</p>
              </div>
            </div>
            
            <div className="h-96">
              <Line 
                data={leaveData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Monthly Leave Applications Trend'
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
        
        {reportType === 'timesheet' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Timesheet Analysis</h2>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
              <p className="text-gray-500">Timesheet reporting features are under development</p>
            </div>
          </div>
        )}
        
        {reportType === 'performance' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Performance Metrics</h2>
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
              <p className="text-gray-500">Performance reporting features are under development</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;