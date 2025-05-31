import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Mail,
  Calendar,
  Search,
  Menu,
  X,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  user: any;
}

const Header = ({ toggleSidebar, isSidebarOpen, user }: HeaderProps) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'} border-b`}>
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left - Sidebar Toggle & Greeting */}
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 md:hidden">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div>
            <h1 className="text-xl font-semibold">
              Good {getTimeOfDay()}, <span className="text-yellow-300">{user?.name?.split(' ')[0] || 'User'}</span>!
            </h1>
            <p className="text-sm text-white/80">{format(new Date(), 'EEEE, MMMM d, yyyy')} • {time}</p>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded mt-1 inline-block">{user?.role || 'Employee'}</span>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center rounded-md bg-white/10 px-3 py-2 transition">
            <Search className="w-4 h-4 text-white/80 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none w-48 text-sm placeholder-white/70 text-white"
            />
          </div>

          {/* Calendar */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="hover:text-yellow-300 transition"
              aria-label="Calendar"
            >
              <Calendar className="w-5 h-5" />
            </button>
            {showCalendar && (
              <div className="absolute right-0 mt-2 z-10">
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} inline />
              </div>
            )}
          </div>

          {/* Mail */}
          <button className="hover:text-yellow-300 transition">
            <Mail className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative hover:text-yellow-300 transition"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                3
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black shadow-2xl rounded-md py-2 z-10 border border-purple-200">
                <div className="px-4 py-2 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notificationsData.map((notification, index) => (
                    <div key={index} className="px-4 py-2 hover:bg-gray-100 flex items-start">
                      <div className={`w-2 h-2 rounded-full mt-2 mr-2 ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t">
                  <Link to="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="hover:text-yellow-300 transition">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center focus:outline-none"
              aria-label="User Menu"
            >
              <img
                src={user?.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-white"
              />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md py-2 z-10 border">
                <Link to="/my-profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

const notificationsData = [
  { message: 'Your leave request has been approved', time: '10 minutes ago', read: false },
  { message: 'New company policy update available', time: '1 hour ago', read: false },
  { message: 'Team meeting scheduled for tomorrow at 10 AM', time: '3 hours ago', read: false },
  { message: 'Your timesheet for last week has been approved', time: 'Yesterday', read: true },
  { message: 'Performance review due next week', time: '2 days ago', read: true }
];

export default Header;
