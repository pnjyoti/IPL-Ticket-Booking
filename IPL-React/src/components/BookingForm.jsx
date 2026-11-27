
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function BookingForm() {
    const [name, setName] = useState('')
    const [tickets, setTickets] = useState(1)
    const [matchId, setMatchId] = useState('')
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchMatches()
    }, [])

    async function fetchMatches() {
        const { data, error } = await supabase
            .from('matches')
            .select('*')

        if (error) {
            console.error(error)
            alert('Unable to load matches')
        } else {
            setMatches(data)
            if (data.length > 0) {
                setMatchId(String(data[0].id))
            }
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const selectedMatch = matches.find(
            (item) => String(item.id) === matchId
        )

        const ticketCount = Number(tickets)

        if (!selectedMatch || ticketCount < 1) {
            alert('Please select a valid match and ticket quantity')
            return
        }

        if (ticketCount > selectedMatch.available_seats) {
            alert('Not enough seats available!')
            return
        }

        setLoading(true)

        // Update available seats
        const { data: updatedMatch, error: updateError } = await supabase
            .from('matches')
            .update({
                available_seats: selectedMatch.available_seats - ticketCount
            })
            .eq('id', selectedMatch.id)
            .gte('available_seats', ticketCount)
            .select()
            .maybeSingle()

        if (updateError || !updatedMatch) {
            console.error('Seat update error:', updateError)
            alert('Seats could not be updated. Please try again.')
            setLoading(false)
            return
        }

        // Insert booking into database
        const { error: bookingError } = await supabase
            .from('bookings')
            .insert({
                match_id: selectedMatch.id,
                user_name: name,
                match_title: `${selectedMatch.team1} vs ${selectedMatch.team2}`,
                tickets: ticketCount,
                total_price: selectedMatch.price * ticketCount
            })

        if (bookingError) {
            console.error('Booking error:', bookingError)

            // Restore seats if booking insertion fails
            const { error: restoreError } = await supabase
                .from('matches')
                .update({
                    available_seats: updatedMatch.available_seats + ticketCount
                })
                .eq('id', selectedMatch.id)

            if (restoreError) {
                console.error('Seat restoration error:', restoreError)
            }

            alert('Booking failed. Please try again.')
            setLoading(false)
            return
        }

        alert('Booking Confirmed!')

        setName('')
        setTickets(1)

        await fetchMatches()
        setLoading(false)
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
                    value={matchId}
                    onChange={(e) => setMatchId(e.target.value)}
                    required
                >
                    {matches.map((match) => (
                        <option key={match.id} value={match.id}>
                            {match.team1} vs {match.team2} - {match.venue}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    value={tickets}
                    onChange={(e) => setTickets(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading || matches.length === 0}>
                    {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
    )
}

export default BookingForm
