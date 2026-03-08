import React, { useEffect, useState } from 'react';
import { reservationService } from '../../services/apiService';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaClock, FaUsers, FaStickyNote, FaTrash } from 'react-icons/fa';

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await reservationService.getAllReservations();
      setReservations(response.data.reservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await reservationService.updateReservationStatus(reservationId, { status: newStatus });
      toast.success('Reservation status updated successfully');
      fetchReservations();
    } catch (error) {
      toast.error('Failed to update reservation status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;

    try {
      await reservationService.deleteReservation(id);
      toast.success('Reservation deleted successfully');
      fetchReservations();
    } catch (error) {
      toast.error('Failed to delete reservation');
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
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaCalendarAlt className="text-purple-500" /> Manage Reservations
        </h1>
        <p className="text-gray-500 mt-1">{reservations.length} reservations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div key={reservation._id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800">Table #{reservation.tableNumber}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(reservation.status)}`}>
                {reservation.status}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p className="flex items-center gap-2"><FaUser className="text-gray-400" /> {reservation.name}</p>
              <p className="flex items-center gap-2"><FaEnvelope className="text-gray-400" /> {reservation.email}</p>
              <p className="flex items-center gap-2"><FaPhone className="text-gray-400" /> {reservation.phone}</p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" />
                {new Date(reservation.reservationDate).toLocaleDateString()} at {reservation.reservationTime}
              </p>
              <p className="flex items-center gap-2"><FaUsers className="text-gray-400" /> {reservation.guests} guests</p>
            </div>

            {reservation.specialRequest && (
              <div className="bg-yellow-50 rounded-lg p-3 mb-4 flex gap-2 text-sm text-gray-600">
                <FaStickyNote className="text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>{reservation.specialRequest}</span>
              </div>
            )}

            <div className="space-y-2 border-t pt-4">
              <select
                value={reservation.status}
                onChange={(e) => handleStatusChange(reservation._id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Rejected</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={() => handleDelete(reservation._id)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {reservations.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <FaCalendarAlt className="text-5xl mx-auto mb-3 opacity-30" />
          <p className="text-xl">No reservations found</p>
        </div>
      )}
    </div>
  );
};

export default ManageReservations;
