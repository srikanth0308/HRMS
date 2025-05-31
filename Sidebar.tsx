import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  FileText,
  MessageSquare,
  Award,
  Ticket,
  CreditCard,
  Settings,
  UserCircle,
  Clock,
  FolderPlus,
  Image,
  Mail,
  UserPlus,
  Key,
  MailX,
  CalendarPlus,
  MessageCircle,
  CalendarRange,
  Share2,
  Archive,
  RefreshCcw,
  Handshake,
  LogOut,
} from 'lucide-react';
import Logo from '../common/Logo';

interface SidebarProps {
  isOpen: boolean;
  user: any;
}

const Sidebar = ({ isOpen, user }: SidebarProps) => {
  return (
    <aside
      className={`$
        {isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-30 w-64 bg-indigo-500 border-r border-indigo-500 text-white transition-transform duration-300 ease-in-out md:translate-x-0 md:relative`
      }
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/mails" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Mail className="w-5 h-5 mr-3" />
            <span>Mails</span>
          </NavLink>

          <NavLink to="/hr-chatbox" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <MessageCircle className="w-5 h-5 mr-3" />
            <span>Chat with Teams</span>
          </NavLink>

          <NavLink to="/add-project" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FolderPlus className="w-5 h-5 mr-3" />
            <span>Add Projects</span>
          </NavLink>

          <NavLink to="/hr-ticket-issue" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Ticket className="w-5 h-5 mr-3" />
            <span>Tickets Issued</span>
          </NavLink>

          <NavLink to="/meetings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <MessageSquare className="w-5 h-5 mr-3" />
            <span>Meetings Activity</span>
          </NavLink>

          <NavLink to="/meetingschedule" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Handshake className="w-5 h-5 mr-3" />
            <span>Client & Manager Meetings</span>
          </NavLink>

          <NavLink to="/hr-events" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <RefreshCcw className="w-5 h-5 mr-3" />
            <span>Regular Updates and Posts</span>
          </NavLink>

          <hr className="my-4 border-gray-200" />

          <NavLink to="/employees" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Users className="w-5 h-5 mr-3" />
            <span>Employees Data</span>
          </NavLink>

          <NavLink to="/attendance" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Clock className="w-5 h-5 mr-3" />
            <span>Attendances Report</span>
          </NavLink>

          <NavLink to="/leaves" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <CalendarClock className="w-5 h-5 mr-3" />
            <span>Leave Management System</span>
          </NavLink>

          <NavLink to="/ts&eod" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <CalendarPlus className="w-5 h-5 mr-3" />
            <span>Time Sheet Update and EOD Reports</span>
          </NavLink>

          <NavLink to="/reports" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <FileText className="w-5 h-5 mr-3" />
            <span>Reports</span>
          </NavLink>

          <hr className="my-4 border-gray-200" />

          <NavLink to="/hr-employeemanage" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <UserPlus className="w-5 h-5 mr-3" />
            <span>Add Employee Data</span>
          </NavLink>

          <NavLink to="/id&access" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Key className="w-5 h-5 mr-3" />
            <span>Create ID & Access</span>
          </NavLink>

          <NavLink to="/interview-schedule" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <CalendarRange className="w-5 h-5 mr-3" />
            <span>Interview Schedules</span>
          </NavLink>

          <NavLink to="/hr-jobpost" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Share2 className="w-5 h-5 mr-3" />
            <span>New Positions Forward</span>
          </NavLink>

          <NavLink to="/ex-employees" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Archive className="w-5 h-5 mr-3" />
            <span>Ex-employees Data</span>
          </NavLink>

          <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </NavLink>

          <hr className="my-4 border-gray-200" />

          <NavLink to="/lightgallery" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Image className="w-5 h-5 mr-3" />
            <span>Gallery</span>
          </NavLink>

          <NavLink to="/hr-awards" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Award className="w-5 h-5 mr-3" />
            <span>Awards & Rewards for Employees</span>
          </NavLink>

          <NavLink to="/generate-payslips" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <CreditCard className="w-5 h-5 mr-3" />
            <span>Pay Slips Generation</span>
          </NavLink>

          <NavLink to="/my-profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <UserCircle className="w-5 h-5 mr-3" />
            <span>My Profile</span>
          </NavLink>

          <NavLink to="/resignation" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <LogOut className="w-5 h-5 mr-3" />
            <span>Resign & Notice Period</span>
          </NavLink>

          <NavLink to="/terminationmail" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <MailX className="w-5 h-5 mr-3" />
            <span>Termination Mails</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
