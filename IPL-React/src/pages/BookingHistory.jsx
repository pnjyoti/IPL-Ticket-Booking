function BookingHistory({ bookings }) {
    return (
        <section>
            <h1>My Bookings</h1>

            {bookings.length === 0 ? (
                <p>No bookings available.</p>
            ) : (
                bookings.map((booking) => (
                    <div className="match-card" key={booking.id}>
                        <h3>{booking.name}</h3>
                        <p>Match: {booking.match}</p>
                        <p>Tickets: {booking.tickets}</p>
                    </div>
                ))
            )}
        </section>
    )
}

export default BookingHistory