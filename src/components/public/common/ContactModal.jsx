// src/components/public/common/ContactModal.jsx

export default function ContactModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent!");
            onClose();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <textarea
            placeholder="Message"
            rows="3"
            required
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
