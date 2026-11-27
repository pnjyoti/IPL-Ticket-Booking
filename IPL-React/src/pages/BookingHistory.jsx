
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function BookingHistory() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    fetchBookings()

    const channel = supabase
        .channel('bookings-realtime')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'bookings'
            },
            () => {
                fetchBookings()
            }
        )
        .subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
}, [])

    async function fetchBookings() {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching bookings:', error)
        } else {
            setBookings(data)
        }

        setLoading(false)
    }

    if (loading) {
        return <p>Loading bookings...</p>
    }

    return (
        <section>
            <h1>My Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                <div className="match-list">
                    {bookings.map((booking) => (
                        <div className="match-card" key={booking.id}>
                            <h3>{booking.match_title}</h3>
                            <p>Name: {booking.user_name}</p>
                            <p>Tickets: {booking.tickets}</p>
                            <p>Total: ₹{booking.total_price}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default BookingHistory
