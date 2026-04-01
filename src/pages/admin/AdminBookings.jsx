import React, { useEffect, useState } from "react";
import { bookingsAPI } from "../../services/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);



  const fetchBookings = async () => {
    try {
      const result = await bookingsAPI.getAllBookings();

      if (result.success && Array.isArray(result.data)) {
        setBookings(result.data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    await bookingsAPI.cancelBooking(id);

    alert("Deleted successfully");
    fetchBookings();
  };


  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Bookings</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-700 text-white  h-12">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No bookings found
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b._id} className="text-center h-16  border">
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.plan}</td>
                <td>₹{b.price}</td>

                <td className="space-x-2">
                 

                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;


