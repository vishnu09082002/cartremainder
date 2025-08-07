import React, { useState } from "react";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [item, setItem] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [message, setMessage] = useState("");

  const handleAddToCart = () => {
    if (!item || !reminderDate) return alert("Please enter item and date");
    const newItem = {
      id: Date.now(),
      name: item,
      date: reminderDate,
      message: message || "No custom message"
    };
    setCartItems([...cartItems, newItem]);
    setItem("");
    setReminderDate("");
    setMessage("");
  };

  const today = new Date().toISOString().split("T")[0];
  const todaysReminders = cartItems.filter(item => item.date === today);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">🛍️ Shop Now, Buy Later</h1>

      <div className="bg-white p-4 rounded-xl shadow-md mb-6 max-w-xl">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item name (e.g., Shirt, Phone)"
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="date"
          value={reminderDate}
          onChange={(e) => setReminderDate(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Custom message (optional)"
          className="border p-2 rounded w-full mb-2"
        />

        <button
          onClick={handleAddToCart}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add to Cart with Reminder
        </button>
      </div>

      <div className="max-w-xl">
        <h2 className="text-xl font-semibold mb-2">🧾 Your Cart Items</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">No items added yet.</p>
        ) : (
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="bg-white p-3 rounded shadow">
                <strong>{item.name}</strong> <br />
                Reminder on: <span className="text-blue-600">{item.date}</span><br />
                Note: {item.message}
              </li>
            ))}
          </ul>
        )}
      </div>

      {todaysReminders.length > 0 && (
        <div className="mt-6 max-w-xl bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">🔔 Today's Reminder(s)</h2>
          <ul className="list-disc list-inside">
            {todaysReminders.map((reminder) => (
              <li key={reminder.id}>
                Buy <strong>{reminder.name}</strong>: {reminder.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
