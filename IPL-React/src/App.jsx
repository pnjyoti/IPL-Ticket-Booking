import { useState } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Matches from './pages/Matches'
import BookTicket from './pages/BookTicket'
import BookingHistory from './pages/BookingHistory'

import './App.css'

function App() {
    const [bookings, setBookings] = useState([])

    function addBooking(booking) {
        setBookings([...bookings, booking])
    }

    return (
        <>
            <Navbar />

            <Home />
            <Matches />
            <BookTicket onBook={addBooking} />
            <BookingHistory bookings={bookings} />

            <Footer />
        </>
    )
}

export default App