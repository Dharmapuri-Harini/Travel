import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [form, setForm] = useState({
        destination: "",
        startDate: "",
        endDate: "",
        notes: ""
    });

    // Fetch trips on load
    useEffect(() => {
        axios.get("https://travel-iternary-planner.vercel.app/api/trips")
            .then(res => setTrips(res.data))
            .catch(err => console.error("❌ Fetch error:", err));
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://travel-iternary-planner.vercel.app/api/trips", form);
            setTrips([...trips, res.data]);
            setForm({ destination: "", startDate: "", endDate: "", notes: "" });
        } catch (error) {
            console.error("❌ Error adding trip:", error);
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('https://i.pinimg.com/1200x/79/e3/51/79e351b5da1b28878db24ba407db52a0.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                    width: "400px", // Reduced size
                    textAlign: "center"
                }}
            >
                <h2 style={{ marginBottom: "20px" }}>My Trips</h2>

                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        marginBottom: "20px"
                    }}
                >
                    <input
                        type="text"
                        placeholder="Destination"
                        value={form.destination}
                        onChange={e => setForm({ ...form, destination: e.target.value })}
                        required
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <input
                        type="date"
                        value={form.startDate}
                        onChange={e => setForm({ ...form, startDate: e.target.value })}
                        required
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <input
                        type="date"
                        value={form.endDate}
                        onChange={e => setForm({ ...form, endDate: e.target.value })}
                        required
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Notes"
                        value={form.notes}
                        onChange={e => setForm({ ...form, notes: e.target.value })}
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            borderRadius: "6px",
                            border: "1px solid #ccc"
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: "10px",
                            fontSize: "16px",
                            backgroundColor: "#1976d2",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Add Trip
                    </button>
                </form>

                <ul style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                    {trips.map((trip, i) => (
                        <li
                            key={i}
                            style={{
                                backgroundColor: "#f9f9f9",
                                marginBottom: "10px",
                                padding: "10px",
                                borderRadius: "6px"
                            }}
                        >
                            <strong>{trip.destination}</strong>
                            <br />
                            {trip.startDate} - {trip.endDate}
                            <br />
                            {trip.notes}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
