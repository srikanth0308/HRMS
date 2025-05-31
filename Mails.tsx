import React, { useState } from "react";
import {
  Mail,
  Share,
  FileText,
  Upload,
  Star,
  StarOff,
  Trash,
  Plus,
  Menu,
  Search,
  ChevronLeft,
  Reply,
  ReplyAll,
  Paperclip,
  Download,
} from "lucide-react";

// Define TypeScript types for emails and attachments
interface Attachment {
  name: string;
  size: string;
  type: "pdf" | "image" | "other";
}

interface Email {
  id: string;
  sender: string;
  email: string;
  avatar: string;
  subject: string;
  preview: string;
  content: string;
  date: string;
  time: string;
  read: boolean;
  favorite: boolean;
  attachments?: Attachment[];
}

// Sample contacts for sidebar chat list
const contacts = [
  {
    id: "1",
    name: "David Moore",
    role: "Python Developer",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    name: "Stella Johnson",
    role: "SEO Expert",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    name: "Catherine Lee",
    role: "iOS Developer",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

// Initial emails for inbox
const initialEmails: Email[] = [
  {
    id: "1",
    sender: "David Moore",
    email: "david.moore@example.com",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subject: "Project Presentation Reminder",
    preview:
      "Hi Emily, Please be informed that the new project presentation is due Monday.",
    content: `
      <p>Hi Emily,</p>
      <p>I wanted to remind you that the new project presentation is due Monday. Please make sure to have all your slides ready by tomorrow so we can review them before the client meeting.</p>
      <p>Let me know if you need any help or have questions about the content.</p>
      <p><br><br>Best regards,<br>David Moore<br>Project Manager</p>
    `,
    date: "May 24, 2025",
    time: "10:15 AM",
    read: false,
    favorite: false,
    attachments: [
      { name: "Presentation_Slides.pdf", size: "2.4 MB", type: "pdf" },
    ],
  },
  {
    id: "2",
    sender: "Stella Johnson",
    email: "stella.johnson@example.com",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subject: "SEO Strategy Update",
    preview: "Hey team, here is the latest SEO strategy report.",
    content: `
      <p>Dear Team,</p>
      <p>The latest SEO report is attached. Let's review the key points in our meeting next week.</p>
    `,
    date: "May 23, 2025",
    time: "2:30 PM",
    read: true,
    favorite: true,
  },
  {
    id: "3",
    sender: "Catherine Lee",
    email: "catherine.lee@example.com",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subject: "iOS App Design Feedback",
    preview: "Please find my feedback on the app design in the attached document.",
    content: `
      <p>Hi all,</p>
      <p>I've attached my design feedback. Please let me know your thoughts.</p>
    `,
    date: "May 22, 2025",
    time: "9:00 AM",
    read: false,
    favorite: false,
  },
  {
    id: "4",
    sender: "Michael Smith",
    email: "michael.smith@example.com",
    avatar:
      "https://randomuser.me/api/portraits/men/45.jpg",
    subject: "Meeting Rescheduled",
    preview: "The meeting has been rescheduled to Thursday afternoon.",
    content: `
      <p>Hello Team,</p>
      <p>The meeting originally planned for Tuesday has been rescheduled to Thursday at 3 PM. Please update your calendars accordingly.</p>
      <p>Thanks,<br>Michael</p>
    `,
    date: "May 21, 2025",
    time: "4:45 PM",
    read: true,
    favorite: false,
  },
];

function Mails() {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(initialEmails[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showEmailList, setShowEmailList] = useState(true);
  const [showEmailView, setShowEmailView] = useState(false);

  const handleEmailSelect = (email: Email) => {
    if (!email.read) {
      const updatedEmails = emails.map((e) =>
        e.id === email.id ? { ...e, read: true } : e
      );
      setEmails(updatedEmails);
    }
    setSelectedEmail(email);

    if (window.innerWidth < 768) {
      setShowEmailList(false);
      setShowEmailView(true);
    }
  };

  const toggleFavorite = (emailId: string) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, favorite: !email.favorite } : email
    );
    setEmails(updatedEmails);
  };

  const handleBackToList = () => {
    setShowEmailList(true);
    setShowEmailView(false);
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile menu button */}
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 bg-white rounded-md shadow-md"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 fixed lg:relative z-20 w-64 h-full`}
        >
          <div className="h-full flex flex-col bg-white border-r overflow-y-auto">
            <div className="p-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
                <Plus size={18} />
                <span>Compose</span>
              </button>
            </div>

            <nav className="flex-none px-3">
              <ul className="space-y-1">
                <NavItem icon={<Mail size={18} />} text="Inbox" count={emails.length} active />
                <NavItem icon={<Share size={18} />} text="Sent" />
                <NavItem icon={<FileText size={18} />} text="Draft" count={4} variant="warning" />
                <NavItem icon={<Upload size={18} />} text="Outbox" count={3} variant="danger" />
                <NavItem icon={<Star size={18} />} text="Starred" />
                <NavItem icon={<Trash size={18} />} text="Trash" />
              </ul>
            </nav>

            <div className="mt-6 px-4 py-2 border-t border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm text-gray-700">Chats</h3>
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="mt-2 space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div
          className={`flex-1 border-r border-gray-300 flex flex-col overflow-y-auto bg-white ${
            showEmailList ? "" : "hidden"
          } lg:block`}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full px-2 py-1 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            {filteredEmails.length === 0 ? (
              <p className="p-4 text-center text-gray-500">No emails found.</p>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => handleEmailSelect(email)}
                  className={`cursor-pointer px-4 py-3 border-b flex items-center gap-4 hover:bg-gray-50 ${
                    !email.read ? "bg-blue-50" : ""
                  }`}
                >
                  <img
                    src={email.avatar}
                    alt={email.sender}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-gray-800">{email.sender}</p>
                      <p className="text-xs text-gray-500">{email.date}</p>
                    </div>
                    <p className="text-sm font-semibold">{email.subject}</p>
                    <p className="text-xs text-gray-600 truncate">{email.preview}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(email.id);
                    }}
                    className="p-1"
                    aria-label="Toggle Favorite"
                  >
                    {email.favorite ? (
                      <Star className="text-yellow-400" size={18} />
                    ) : (
                      <StarOff className="text-gray-400" size={18} />
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Email View */}
        <div
          className={`flex-1 flex flex-col overflow-y-auto bg-white ${
            showEmailView ? "" : "hidden"
          } lg:block`}
        >
          {selectedEmail ? (
            <>
              <div className="flex items-center justify-between border-b p-4">
                <button
                  onClick={handleBackToList}
                  className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                  aria-label="Back to Inbox"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
                <div></div> {/* Placeholder for layout */}
              </div>

              <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedEmail.avatar}
                    alt={selectedEmail.sender}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{selectedEmail.sender}</p>
                    <p className="text-sm text-gray-600">{selectedEmail.email}</p>
                    <p className="text-xs text-gray-400">
                      {selectedEmail.date} at {selectedEmail.time}
                    </p>
                  </div>
                </div>

                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.content }}
                />

                {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Attachments</h3>
                    <ul className="space-y-1">
                      {selectedEmail.attachments.map((att, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between border p-2 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <Paperclip size={16} />
                            <span>{att.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{att.size}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="p-4 text-center text-gray-500">No email selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Nav item component for sidebar menu
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  count?: number;
  active?: boolean;
  variant?: "warning" | "danger";
}

function NavItem({ icon, text, count, active, variant }: NavItemProps) {
  let countBg = "bg-gray-300 text-gray-700";
  if (variant === "warning") countBg = "bg-yellow-300 text-yellow-800";
  if (variant === "danger") countBg = "bg-red-300 text-red-800";

  return (
    <li>
      <a
        href="#"
        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${
          active ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-700"
        }`}
      >
        {icon}
        <span className="flex-1">{text}</span>
        {count !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${countBg}`}
          >
            {count}
          </span>
        )}
      </a>
    </li>
  );
}

export default Mails;
