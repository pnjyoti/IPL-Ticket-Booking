
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import MatchCard from '../components/MatchCard'

function Matches() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMatches()

        const channel = supabase
            .channel('matches-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'matches'
                },
                () => {
                    fetchMatches()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    async function fetchMatches() {
        const { data, error } = await supabase
            .from('matches')
            .select('*')

        if (error) {
            console.error('Supabase error:', error)
        } else {
            setMatches(data)
        }

        setLoading(false)
    }

    if (loading) {
        return <p>Loading matches...</p>
    }

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
                        availableSeats={match.available_seats}
                    />
                ))}
            </div>
        </section>
    )
}

export default Matches
