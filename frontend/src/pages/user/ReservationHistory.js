import React, { useEffect, useState } from 'react';
import { userService, reservationService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaTicketAlt, FaUser, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await userService.getReservations();
      setReservations(response.data.reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    try {
      await reservationService.cancelReservation(id);
      toast.success('Reservation cancelled successfully');
      fetchReservations();
    } catch (error) {
      toast.error('Failed to cancel reservation');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 fade-in">Reservation History</h1>

        {reservations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center fade-in">
            <FaTicketAlt className="text-6xl text-gray-300 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Reservations Yet</h2>
            <p className="text-gray-600">Your reservation history will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservations.map((reservation) => (
              <div key={reservation._id} className="bg-white rounded-lg shadow-lg p-6 fade-in">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Table #{reservation.tableNumber}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </div>

                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaUser className="text-primary" />
                    <span>{reservation.name}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    <span>
                      {new Date(reservation.reservationDate).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-primary" />
                    <span>{reservation.reservationTime}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaUsers className="text-primary" />
                    <span>{reservation.guests} guests</span>
                  </p>
                </div>

                {reservation.specialRequest && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Special Request:</strong> {reservation.specialRequest}
                    </p>
                  </div>
                )}

                {reservation.status === 'Pending' || reservation.status === 'Confirmed' ? (
                  <button
                    onClick={() => handleCancel(reservation._id)}
                    className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition"
                  >
                    Cancel Reservation
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationHistory;
