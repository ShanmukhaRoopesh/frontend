// ...existing code...
import { useEffect, useState } from "react";
import { initializeEvent, getSeats, bookSeats } from "./api";
import "./style.css";

export default function App() {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    initializeEvent().then(loadSeats);
  }, []);

  const loadSeats = async () => {
    const data = await getSeats();
    // merge server seats with locally persisted bookings so refresh keeps them disabled
    const persisted = JSON.parse(localStorage.getItem("bookedSeats") || "[]");
    const merged = data.map((s) => ({ ...s, booked: s.booked || persisted.includes(s.id) }));
    setSeats(merged);
  };

  const toggleSeat = (seat) => {
    if (seat.booked) return;

    setSelected((prev) =>
      prev.includes(seat.id) ? prev.filter((id) => id !== seat.id) : [...prev, seat.id]
    );
  };

  useEffect(() => {
    let sold = seats.filter((s) => s.booked).length;
    let total = 0;

    selected.forEach(() => {
      sold++;
      if (sold <= 50) total += 50;
      else if (sold <= 80) total += 75;
      else total += 100;
    });

    setPrice(total);
  }, [selected, seats]);

  const buy = async () => {
    await bookSeats(selected, "Teja");
    // persist booked ids locally so refresh shows them disabled
    const persisted = JSON.parse(localStorage.getItem("bookedSeats") || "[]");
    const updated = Array.from(new Set([...persisted, ...selected]));
    localStorage.setItem("bookedSeats", JSON.stringify(updated));
    setSelected([]);
    loadSeats();
  };

  return (
    <div className="container">
      <h1>Event Seating</h1>

      <div className="grid">
        {seats.map((seat) => (
          <div
            key={seat.id}
            role="button"
            aria-disabled={seat.booked}
            tabIndex={seat.booked ? -1 : 0}
            className={`seat ${seat.booked ? "booked" : ""} ${selected.includes(seat.id) ? "selected" : ""}`}
            onClick={seat.booked ? undefined : () => toggleSeat(seat)}
            onKeyDown={(e) => {
              if (!seat.booked && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                toggleSeat(seat);
              }
            }}
          >
            {seat.id}
          </div>
        ))}
      </div>

      <h2>Total Price: ${price}</h2>
      <button disabled={!selected.length} onClick={buy}>
        Buy
      </button>
    </div>
  );
}