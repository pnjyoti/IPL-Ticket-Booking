import { useState } from 'react'

function BookingForm({ onBook }) {
    const [name, setName] = useState('')
    const [tickets, setTickets] = useState(1)
    const [match, setMatch] = useState('RCB vs CSK')

    function handleSubmit(e) {
        e.preventDefault()

        const booking = {
            id: Date.now(),
            name,
            tickets,
            match
        }

        onBook(booking)

        alert('Booking Confirmed!')

        setName('')
        setTickets(1)
        setMatch('RCB vs CSK')
    }

    return (
        <div className="booking-form">
            <h2>Book Your Tickets</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <select
                    value={match}
                    onChange={(e) => setMatch(e.target.value)}
                >
                    <option>RCB vs CSK</option>
                    <option>MI vs KKR</option>
                    <option>SRH vs DC</option>
                </select>

                <input
                    type="number"
                    min="1"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                    required
                />

                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    )
}

export default BookingForm