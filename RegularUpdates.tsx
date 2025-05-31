import { useState } from 'react';

interface HRGreeting {
  id: string;
  title: string;
  message: string;
  imageUrl: string;
  date: string;
}

const dummyEmployeeEmails = [
  'alice@example.com',
  'bob@example.com',
  'carol@example.com',
];

// Image URLs (replace with your actual images)
const celebrationImages = [
  'https://img.freepik.com/free-vector/paper-style-diwali-background_23-2149602500.jpg?semt=ais_hybrid&w=740', // Diwali
  'https://img.freepik.com/free-vector/gradient-christmas-tinsel-background_52683-76117.jpg?semt=ais_hybrid&w=740', // Christmas
  'https://www.mynameart.com/uploads/images/new-year-greetings-in-english.jpg', // New Year
  'https://static.vecteezy.com/system/resources/thumbnails/025/395/077/small_2x/happy-independence-day-india-indian-flag-waving-indian-flag-in-creative-background-generative-ai-photo.jpg', // Independence Day
  'https://www.jpinternational.co.in/img/content/1708932416-0M9A0133.JPG', // Thanksgiving
  'https://vaerorganic.com/wp-content/uploads/2023/01/21918746_PO_37-ai.png', // Easter
];

// Labels matching images
const celebrationLabels = [
  "Diwali Festival",
  "Christmas Celebration",
  "New Year's Day",
  "Independence Day",
  "Annual Day",
  "Pongal Day",
];

const HREventAnnouncement = () => {
  const [greetings, setGreetings] = useState<HRGreeting[]>([]);
  const [form, setForm] = useState({
    title: '',
    message: '',
    imageFile: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState('');

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSendGreeting = () => {
    if (!form.title || !form.message || !form.imageFile) {
      alert("Please fill all fields and select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageUrl = reader.result as string;

      const newGreeting: HRGreeting = {
        id: Date.now().toString(),
        title: form.title,
        message: form.message,
        imageUrl,
        date: new Date().toLocaleString(),
      };

      setGreetings(prev => [newGreeting, ...prev]);
      await sendGreetingEmail(newGreeting);
      setForm({ title: '', message: '', imageFile: null });
      setPreviewUrl('');
    };

    reader.readAsDataURL(form.imageFile);
  };

  const sendGreetingEmail = async (greeting: HRGreeting) => {
    dummyEmployeeEmails.forEach(email => {
      console.log(`📨 Sending to ${email}: ${greeting.title}`);
    });

    alert('Greeting with image sent to all employees!');
  };

  // Navigate images
  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const next = () => {
    if (currentIndex < celebrationImages.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex max-w-8xl mx-auto p-6 space-x-6 min-h-[520px]">
      {/* Left side form */}
      <div className="w-1/2 bg-white p-6 rounded shadow space-y-6">
        <h2 className="text-2xl font-bold">HR Greeting / Event Announcement</h2>

        <input
          type="text"
          placeholder="Greeting Title (e.g. Happy Diwali 🎆)"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-1 rounded w-full"
        />
        <textarea
          placeholder="Greeting message or celebration info"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="border p-1 rounded w-full h-28 resize-none"
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0] || null;
            setForm({ ...form, imageFile: file });
            if (file) setPreviewUrl(URL.createObjectURL(file));
          }}
          className="border p-1 rounded w-full"
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="w-40 h-auto rounded shadow" />
        )}
        <button
          onClick={handleSendGreeting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Greeting with Photo
        </button>

        {/* Sent Announcements */}
        <div>
          <h3 className="text-xl font-semibold mt-6 mb-3">Previous Greetings</h3>
          {greetings.length === 0 ? (
            <p>No greetings sent yet.</p>
          ) : (
            <div className="space-y-4 max-h-[200px] overflow-y-auto">
              {greetings.map(g => (
                <div
                  key={g.id}
                  className="border rounded p-3 bg-gray-50 shadow space-y-2"
                >
                  <h4 className="text-lg font-bold">{g.title}</h4>
                  <p className="text-sm text-gray-500">{g.date}</p>
                  <p>{g.message}</p>
                  {g.imageUrl && (
                    <img
                      src={g.imageUrl}
                      alt="Greeting"
                      className="w-50 h-auto mt-2 rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side image slider */}
      <div className="relative w-1/2 bg-white rounded shadow border border-gray-300 flex flex-col items-center max-h-[480px]">
        {/* Left arrow */}
        <button
          aria-label="Previous"
          onClick={prev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-r transition-opacity duration-300 ${
            currentIndex === 0
              ? "opacity-20 cursor-not-allowed"
              : "opacity-70 hover:opacity-100"
          }`}
          style={{ userSelect: "none" }}
        >
          &#8592;
        </button>

        {/* Image box */}
        <div className="w-[550px] h-[500px] overflow-hidden rounded mt-8">
          <img
            src={celebrationImages[currentIndex]}
            alt={`Celebration ${currentIndex + 1}`}
            className="object-cover w-full h-full select-none"
            draggable={false}
          />
        </div>

        {/* Caption below image */}
        <div className="mt-2 text-center text-gray-700 font-medium mb-8">
          Special Day: {celebrationLabels[currentIndex]}
        </div>

        {/* Right arrow */}
        <button
          aria-label="Next"
          onClick={next}
          disabled={currentIndex === celebrationImages.length - 1}
          className={`absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-l transition-opacity duration-300 ${
            currentIndex === celebrationImages.length - 1
              ? "opacity-20 cursor-not-allowed"
              : "opacity-70 hover:opacity-100"
          }`}
          style={{ userSelect: "none" }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default HREventAnnouncement;
