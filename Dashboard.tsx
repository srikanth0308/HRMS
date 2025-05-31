import React from 'react';
import {
  Users, Clock, DollarSign, BarChart3,
  TrendingUp, TrendingDown, Calendar, Award
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatCard = ({ icon, title, value, trend, trendValue, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <div className="flex items-center mt-2">
            {trend === 'up' ? (
              <TrendingUp size={16} className="text-green-500 mr-1" />
            ) : (
              <TrendingDown size={16} className="text-red-500 mr-1" />
            )}
            <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trendValue}
            </span>
          </div>
        </div>
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Employees',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.1,
      },
      {
        label: 'Attendance',
        data: [28, 48, 40, 19, 86, 27],
        fill: false,
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Present', 'Absent', 'Leave', 'Late'],
    datasets: [
      {
        data: [65, 10, 15, 10],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(239, 68, 68)',
          'rgb(234, 179, 8)',
          'rgb(99, 102, 241)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: `url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/be358189306607.5df0b3902a063.jpg')`
      }}
    >
      <div className="backdrop-blur-sm  rounded-xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white">Welcome back,Radha Sharma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={<Users size={24} className="text-white" />}
            title="Total Employees"
            value="248"
            trend="up"
            trendValue="3.5% from last month"
            color="bg-indigo-600"
          />
          <StatCard
            icon={<Clock size={24} className="text-white" />}
            title="Attendance Rate"
            value="92%"
            trend="down"
            trendValue="1.2% from last month"
            color="bg-green-600"
          />
          <StatCard
            icon={<DollarSign size={24} className="text-white" />}
            title="Payroll Processed"
            value="$45,250"
            trend="up"
            trendValue="5.1% from last month"
            color="bg-blue-600"
          />
          <StatCard
            icon={<Award size={24} className="text-white" />}
            title="Open Positions"
            value="12"
            trend="up"
            trendValue="2 more than last month"
            color="bg-amber-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Employee Statistics</h2>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>Last 6 Months</option>
                <option>Last Year</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="h-80">
              <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Attendance Overview</h2>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
              <button className="text-indigo-600 text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New employee onboarded</p>
                    <p className="text-xs text-gray-500">Sarah Johnson joined as UI/UX Designer</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
              <button className="text-indigo-600 text-sm font-medium">View Calendar</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <Calendar size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Team Meeting</p>
                      <p className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">10:00 AM</p>
                    </div>
                    <p className="text-xs text-gray-500">Discussion about Q3 goals and objectives</p>
                    <p className="text-xs text-gray-400 mt-1">Tomorrow</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
