// Mock employee data
export const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    role: "Frontend Developer",
    department: "Engineering",
    email: "john.doe@incoxis.com",
    status: "Active",
    joiningDate: "01-Jan-2023",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    role: "UI/UX Designer",
    department: "Design",
    email: "jane.smith@incoxis.com",
    status: "Active",
    joiningDate: "15-Mar-2023",
    avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP003",
    name: "Robert Johnson",
    role: "Project Manager",
    department: "Management",
    email: "robert.johnson@incoxis.com",
    status: "Active",
    joiningDate: "05-Apr-2022",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    role: "HR Specialist",
    department: "Human Resources",
    email: "emily.davis@incoxis.com",
    status: "On Leave",
    joiningDate: "10-Jun-2022",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP005",
    name: "Michael Wilson",
    role: "Backend Developer",
    department: "Engineering",
    email: "michael.wilson@incoxis.com",
    status: "Active",
    joiningDate: "22-Feb-2023",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP006",
    name: "Sarah Thompson",
    role: "Marketing Specialist",
    department: "Marketing",
    email: "sarah.thompson@incoxis.com",
    status: "Active",
    joiningDate: "14-Aug-2022",
    avatar: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP007",
    name: "David Brown",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "david.brown@incoxis.com",
    status: "On Leave",
    joiningDate: "03-Oct-2022",
    avatar: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "EMP008",
    name: "Jennifer Garcia",
    role: "Content Writer",
    department: "Marketing",
    email: "jennifer.garcia@incoxis.com",
    status: "Active",
    joiningDate: "17-Nov-2022",
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

// Mock leave data
export const leaveRequests = [
  {
    id: "LEV001",
    employeeId: "EMP001",
    employeeName: "John Doe",
    type: "Sick Leave",
    startDate: "2025-05-20",
    endDate: "2025-05-22",
    days: 3,
    reason: "Feeling unwell and need to recover",
    status: "Pending",
    appliedOn: "2025-05-15"
  },
  {
    id: "LEV002",
    employeeId: "EMP003",
    employeeName: "Robert Johnson",
    type: "Vacation",
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    days: 6,
    reason: "Family vacation",
    status: "Approved",
    appliedOn: "2025-05-20"
  },
  {
    id: "LEV003",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    type: "Personal Leave",
    startDate: "2025-05-25",
    endDate: "2025-05-25",
    days: 1,
    reason: "Personal appointment",
    status: "Approved",
    appliedOn: "2025-05-18"
  },
  {
    id: "LEV004",
    employeeId: "EMP007",
    employeeName: "David Brown",
    type: "Medical Leave",
    startDate: "2025-05-18",
    endDate: "2025-05-22",
    days: 5,
    reason: "Surgery recovery",
    status: "Approved",
    appliedOn: "2025-05-10"
  }
];

// Mock attendance data
export const attendanceRecords = [
  {
    id: "ATT001",
    employeeId: "EMP001",
    date: "2025-05-22",
    checkIn: "09:02 AM",
    checkOut: "06:15 PM",
    workHours: "9h 13m",
    status: "Present"
  },
  {
    id: "ATT002",
    employeeId: "EMP001",
    date: "2025-05-21",
    checkIn: "08:55 AM",
    checkOut: "06:10 PM",
    workHours: "9h 15m",
    status: "Present"
  },
  {
    id: "ATT003",
    employeeId: "EMP001",
    date: "2025-05-20",
    checkIn: "09:05 AM",
    checkOut: "06:05 PM",
    workHours: "9h 00m",
    status: "Present"
  },
  {
    id: "ATT004",
    employeeId: "EMP002",
    date: "2025-05-22",
    checkIn: "08:45 AM",
    checkOut: "05:50 PM",
    workHours: "9h 05m",
    status: "Present"
  },
  {
    id: "ATT005",
    employeeId: "EMP003",
    date: "2025-05-22",
    checkIn: "08:30 AM",
    checkOut: "06:00 PM",
    workHours: "9h 30m",
    status: "Present"
  }
];

// Mock project data
export const projects = [
  {
    id: "PRJ001",
    name: "Website Redesign",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    status: "In Progress",
    progress: 60,
    members: ["EMP001", "EMP002", "EMP005"]
  },
  {
    id: "PRJ002",
    name: "Mobile App Development",
    startDate: "2025-03-15",
    endDate: "2025-07-31",
    status: "In Progress",
    progress: 40,
    members: ["EMP003", "EMP005", "EMP007"]
  },
  {
    id: "PRJ003",
    name: "Marketing Campaign",
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    status: "In Progress",
    progress: 75,
    members: ["EMP006", "EMP008"]
  }
];

// Mock meetings data
export const meetings = [
  {
    id: "MTG001",
    title: "Sprint Planning",
    date: "2025-05-23",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    organizer: "EMP003",
    location: "Conference Room 1",
    attendees: ["EMP001", "EMP002", "EMP005", "EMP007"]
  },
  {
    id: "MTG002",
    title: "Client Demo",
    date: "2025-05-24",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    organizer: "EMP003",
    location: "Zoom Meeting",
    attendees: ["EMP001", "EMP002", "EMP003"]
  },
  {
    id: "MTG003",
    title: "Team Building",
    date: "2025-05-27",
    startTime: "04:00 PM",
    endTime: "05:30 PM",
    organizer: "EMP004",
    location: "Recreation Room",
    attendees: ["EMP001", "EMP002", "EMP003", "EMP005", "EMP006", "EMP007", "EMP008"]
  }
];