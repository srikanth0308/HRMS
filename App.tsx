import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// ... rest of imports


// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeDirectory from './pages/EmployeeDirectory';
import EmployeeProfile from './pages/EmployeeProfile';
import MyProfile from './pages/MyProfile';
import LeaveManagement from './pages/LeaveManagement';
import Attendance from './pages/Attendance';
import Meetings from './pages/Meetings';
import Reports from './pages/Reports';

// Layout
import MainLayout from './components/layout/MainLayout';

// Types
import { useAuthStore } from './store/authStore';
import HRAwards from './pages/Awards&Rewardsforemployee';
import PayslipGenerator from './pages/Payslips';
import HRTicketIssue from './pages/Tickets';
import HREmployeeManager from './pages/AddEmployees';
import CreateIDAndAccess from './pages/CreateID&Access';
import InterviewSchedule from './pages/InterviewShedule';
import HRChatBox from './pages/Chat';
import HREventAnnouncement from './pages/RegularUpdates';
import HRJobPostManager from './pages/Newpositionforward';
import HRProjectManager from './pages/Addprojects';
import TerminationManager from './pages/Terminationmails';
import HRMeetingScheduler from './pages/Client&ManagerMeet';
import Settings from './pages/Settings';
import Mails from './pages/Mails';
import LightGalleryPage from './pages/Gallery';
import EODReport from './pages/TimeSheet&EODupdates';
import Resignation from './pages/Resign&noticeperiod';


interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

function ProtectedRoute({ isAuthenticated }: ProtectedRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-solid"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeDirectory />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/leaves" element={<LeaveManagement />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/hr-awards" element={<HRAwards />} />
          <Route path="/generate-payslips" element={<PayslipGenerator />} />
          <Route path="/hr-ticket-issue" element={<HRTicketIssue />} />
          <Route path="/hr-employeemanage" element={<HREmployeeManager />} />
          <Route path="/id&access" element={<CreateIDAndAccess/>} />
          <Route path="/interview-schedule" element={<InterviewSchedule />} />
          <Route path="/hr-chatbox" element={<HRChatBox />} />
          <Route path="/hr-events" element={<HREventAnnouncement />} />
          <Route path="/hr-jobpost" element={<HRJobPostManager />} />
          <Route path="/add-project" element={<HRProjectManager />} />
          <Route path="/terminationmail" element={<TerminationManager />} />
          <Route path="/meetingschedule" element={<HRMeetingScheduler />} />
          <Route path="/settings" element={< Settings/>} />
          <Route path="/mails" element={<Mails />} />
          <Route path="/lightgallery" element={<LightGalleryPage />} />
          <Route path="/ts&eod" element={<EODReport />} />
           <Route path="/resignation" element={<Resignation />} />


          



        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}

export default App;
