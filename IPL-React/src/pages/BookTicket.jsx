import BookingForm from '../components/BookingForm'

function BookTicket({ onBook }) {
    return (
        <section>
            <BookingForm onBook={onBook} />
        </section>
    )
}

export default BookTicket