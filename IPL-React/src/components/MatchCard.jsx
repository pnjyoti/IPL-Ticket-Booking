function MatchCard({ team1, team2, date, venue, availableSeats }) {
    return (
        <div className="match-card">
            <h2>{team1} vs {team2}</h2>
            <p>Date: {date}</p>
            <p>Venue: {venue}</p>
            <p>Available Seats: {availableSeats}</p>
        </div>
    )
}

export default MatchCard