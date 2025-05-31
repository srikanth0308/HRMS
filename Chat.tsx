import { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface Contact {
  id: string;
  name: string;
  role: string;
}

interface Message {
  sender: 'hr' | 'contact';
  text: string;
  timestamp: Date;
}

const contactsData: Contact[] = [
  { id: '1', name: 'Alice Johnson', role: 'Manager' },
  { id: '2', name: 'Bob Smith', role: 'Developer' },
  { id: '3', name: 'Carol Lee', role: 'Designer' },
  { id: '4', name: 'David Kim', role: 'QA Engineer' },
  { id: '5', name: 'Emma White', role: 'HR Associate' },
  { id: '6', name: 'Frank Green', role: 'DevOps Engineer' },
  { id: '7', name: 'Grace Liu', role: 'Scrum Master' },
  { id: '8', name: 'Hank Brown', role: 'Backend Developer' },
  { id: '9', name: 'Isabella Clark', role: 'Frontend Developer' },
  { id: '10', name: 'Jack Wilson', role: 'System Analyst' },
  { id: '11', name: 'Karen Adams', role: 'UI/UX Designer' },
  { id: '12', name: 'Leo Turner', role: 'Database Administrator' },
  { id: '13', name: 'Mia Scott', role: 'Recruiter' },
  { id: '14', name: 'Nathan Hall', role: 'Business Analyst' },
  { id: '15', name: 'Olivia Evans', role: 'Product Manager' },
  { id: '16', name: 'Paul Young', role: 'Technical Lead' },
  { id: '17', name: 'Quinn Hill', role: 'Security Engineer' },
  { id: '18', name: 'Rachel King', role: 'Marketing Specialist' },
  { id: '19', name: 'Sam Parker', role: 'Support Engineer' },
  { id: '20', name: 'Tina Barnes', role: 'QA Tester' },
  { id: '21', name: 'Victor Stone', role: 'Mobile Developer' },
];

const HRChatBox = () => {
  const [contacts] = useState<Contact[]>(contactsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSelectContact = (id: string) => {
    setSelectedContactId(id);
    if (!messages[id]) {
      setMessages(prev => ({ ...prev, [id]: [] }));
    }
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (!selectedContactId || !input.trim()) return;

    const newMessage: Message = {
      sender: 'hr',
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage],
    }));

    setInput('');
    setShowEmojiPicker(false);

    setTimeout(() => {
      const reply: Message = {
        sender: 'contact',
        text: 'Thanks for your message! 😊',
        timestamp: new Date(),
      };
      setMessages(prev => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), reply],
      }));
    }, 1500);
  };

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[600px] border rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto bg-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gradient-to-b from-purple-700 via-pink-600 to-red-500 text-white flex flex-col">
        <div className="p-5 text-2xl font-bold border-b border-pink-800">HR Chat</div>
        <div className="p-3">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg bg-purple-800 bg-opacity-70 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => (
            <div
              key={contact.id}
              onClick={() => handleSelectContact(contact.id)}
              className={`cursor-pointer px-4 py-3 flex items-center space-x-3 border-b border-pink-800 hover:bg-pink-700 transition ${
                selectedContactId === contact.id ? 'bg-pink-900 font-semibold' : ''
              }`}
            >
              <div className="bg-pink-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
                {contact.name[0]}
              </div>
              <div>
                <div>{contact.name}</div>
                <div className="text-sm text-pink-200">{contact.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 bg-gray-50">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex items-center space-x-3">
          {selectedContactId ? (
            <>
              <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold">
                {
                  contacts.find(c => c.id === selectedContactId)?.name.charAt(0)
                }
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {contacts.find(c => c.id === selectedContactId)?.name}
                </div>
                <div className="text-sm text-gray-500">
                  {contacts.find(c => c.id === selectedContactId)?.role}
                </div>
              </div>
            </>
          ) : (
            <div className="text-lg font-semibold text-gray-500">Select a contact to chat</div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-6 overflow-y-auto flex flex-col space-y-3">
          {!selectedContactId && (
            <p className="text-gray-400">Please select a contact to start chatting.</p>
          )}

          {selectedContactId && messages[selectedContactId]?.length === 0 && (
            <p className="text-gray-400">No messages yet. Say hi! 👋</p>
          )}

          {selectedContactId &&
            messages[selectedContactId]?.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-xs p-3 rounded-xl shadow-sm ${
                  msg.sender === 'hr'
                    ? 'bg-blue-600 text-white self-end rounded-tr-none'
                    : 'bg-white text-gray-900 self-start rounded-tl-none border'
                }`}
              >
                <p>{msg.text}</p>
                <div className="text-xs text-right opacity-60 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Input */}
        {selectedContactId && (
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="relative">
                <button
                  onClick={() => setShowEmojiPicker(prev => !prev)}
                  className="text-2xl hover:scale-110 transition"
                  title="Add Emoji"
                >
                  😀
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-12 right-0 z-50 shadow-lg">
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji: any) => {
                        setInput(prev => prev + emoji.native);
                      }}
                      theme="light"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRChatBox;
