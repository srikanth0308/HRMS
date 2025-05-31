import { useState } from 'react';
import { Calendar, Check, X, Clock, ArrowRight, Plus } from 'lucide-react';
import { leaveRequests } from '../data/mockData';
import { format } from 'date-fns';

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState('my-requests');
  const [showApplyForm, setShowApplyForm] = useState(false);
  
  // Form state for leave application
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    halfDay: false,
    attachment: null
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would submit to API
    setShowApplyForm(false);
    // Reset form
    setLeaveForm({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: '',
      halfDay: false,
      attachment: null
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leave Management</h1>
          <p className="text-gray-500">Manage and track your leave requests</p>
        </div>
        
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => setShowApplyForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Apply For Leave
        </button>
      </div>
      
      {/* Leave Balance Summary */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-purple-600 text-white">
          <h2 className="text-lg font-medium">Leave Balance Summary</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Total Leaves</p>
              <p className="text-2xl font-semibold text-purple-700">24</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Available</p>
              <p className="text-2xl font-semibold text-green-700">15</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Used</p>
              <p className="text-2xl font-semibold text-blue-700">7</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-semibold text-yellow-700">2</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Leave Types</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Casual Leave</span>
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">6/10</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sick Leave</span>
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">7/10</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Privilege Leave</span>
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">2/5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Leave History - 2025</h3>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 12 }).map((_, index) => {
                  const month = format(new Date(2025, index, 1), 'MMM');
                  const isCurrent = index === new Date().getMonth();
                  
                  // Random leave status for demo
                  const status = ['none', 'partial', 'full'][Math.floor(Math.random() * 3)];
                  
                  let bgColor = 'bg-gray-100';
                  if (status === 'partial') bgColor = 'bg-yellow-100';
                  if (status === 'full') bgColor = 'bg-red-100';
                  
                  return (
                    <div 
                      key={index} 
                      className={`flex-1 py-2 text-center text-xs ${bgColor} ${isCurrent ? 'border-2 border-blue-500' : ''}`}
                      title={`${month} 2025`}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <span className="w-3 h-3 bg-gray-100 mr-1"></span>
                <span className="mr-3">No Leave</span>
                <span className="w-3 h-3 bg-yellow-100 mr-1"></span>
                <span className="mr-3">Partial</span>
                <span className="w-3 h-3 bg-red-100 mr-1"></span>
                <span>Full Month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Leave Form */}
      {showApplyForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Apply For Leave</h2>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowApplyForm(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">
                  Leave Type*
                </label>
                <select
                  id="leaveType"
                  name="leaveType"
                  className="input-field"
                  value={leaveForm.leaveType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="privilege">Privilege Leave</option>
                  <option value="lop">Loss of Pay</option>
                </select>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    From Date*
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="input-field"
                    value={leaveForm.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex-1">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    To Date*
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="input-field"
                    value={leaveForm.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="halfDay"
                    name="halfDay"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={leaveForm.halfDay}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="halfDay" className="ml-2 block text-sm text-gray-700">
                    Half Day
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason*
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  className="input-field"
                  value={leaveForm.reason}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (if any)
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setShowApplyForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Tabs for My Requests / Team Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              className={`tab ${activeTab === 'my-requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-requests')}
            >
              My Leave Requests
            </button>
            <button
              className={`tab ${activeTab === 'team-requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('team-requests')}
            >
              Team Requests
            </button>
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Leave History
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {/* My Requests Tab */}
          {activeTab === 'my-requests' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Leave Type</th>
                    <th className="px-6 py-3">Applied On</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Days</th>
                    <th className="px-6 py-3">Reason</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.filter(req => req.employeeId === 'EMP001').map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{leave.type}</td>
                      <td className="px-6 py-4">{leave.appliedOn}</td>
                      <td className="px-6 py-4">{leave.startDate}</td>
                      <td className="px-6 py-4">{leave.endDate}</td>
                      <td className="px-6 py-4">{leave.days}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{leave.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          leave.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : leave.status === 'Rejected' 
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {leave.status === 'Pending' && (
                          <button className="text-red-600 hover:text-red-900">
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {leaveRequests.filter(req => req.employeeId === 'EMP001').length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No leave requests found</p>
                </div>
              )}
            </div>
          )}
          
          {/* Team Requests Tab */}
          {activeTab === 'team-requests' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Leave Type</th>
                    <th className="px-6 py-3">Applied On</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Days</th>
                    <th className="px-6 py-3">Reason</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.filter(req => req.status === 'Pending' && req.employeeId !== 'EMP001').map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{leave.employeeName}</td>
                      <td className="px-6 py-4">{leave.type}</td>
                      <td className="px-6 py-4">{leave.appliedOn}</td>
                      <td className="px-6 py-4">{leave.startDate}</td>
                      <td className="px-6 py-4">{leave.endDate}</td>
                      <td className="px-6 py-4">{leave.days}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{leave.reason}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-green-600 hover:text-green-900">
                            <Check className="w-5 h-5" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {leaveRequests.filter(req => req.status === 'Pending' && req.employeeId !== 'EMP001').length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No pending team leave requests</p>
                </div>
              )}
            </div>
          )}
          
          {/* Leave History Tab */}
          {activeTab === 'history' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Leave Type</th>
                    <th className="px-6 py-3">Applied On</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Days</th>
                    <th className="px-6 py-3">Reason</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.filter(req => req.employeeId === 'EMP001' && req.status !== 'Pending').map((leave) => (
                    <tr key={leave.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{leave.type}</td>
                      <td className="px-6 py-4">{leave.appliedOn}</td>
                      <td className="px-6 py-4">{leave.startDate}</td>
                      <td className="px-6 py-4">{leave.endDate}</td>
                      <td className="px-6 py-4">{leave.days}</td>
                      <td className="px-6 py-4 truncate max-w-xs">{leave.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          leave.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {leaveRequests.filter(req => req.employeeId === 'EMP001' && req.status !== 'Pending').length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No leave history found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;