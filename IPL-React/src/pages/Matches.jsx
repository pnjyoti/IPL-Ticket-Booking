
import MatchCard from '../components/MatchCard'

function Matches() {
    const matches = [
        {
            id: 1,
            team1: 'RCB',
            team2: 'CSK',
            date: '25 April 2027',
            venue: 'Bengaluru'
        },
        {
            id: 2,
            team1: 'MI',
            team2: 'KKR',
            date: '26 April 2027',
            venue: 'Mumbai'
        },
        {
            id: 3,
            team1: 'SRH',
            team2: 'DC',
            date: '27 April 2027',
            venue: 'Hyderabad'
        }
    ]

    return (
        <section>
            <h1>Upcoming Matches</h1>

            <div className="match-list">
                {matches.map((match) => (
                    <MatchCard
                        key={match.id}
                        team1={match.team1}
                        team2={match.team2}
                        date={match.date}
                        venue={match.venue}
                    />
                ))}
            </div>
        </section>
    )
}

export default Matches
