
function showToast(message) {
    // Create a new div element
    let toast = document.createElement("div");

    // Add the message
    toast.textContent = message;

    // Add styling
    toast.style.position = "fixed";
    toast.style.top = "60px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = "#14213D";
    toast.style.color = "white";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "5px";

    // Display the toast
    document.body.appendChild(toast);

    // Remove the toast after 3 seconds
    setTimeout(function() {
        toast.remove();
    }, 3000);
}



// Select all links that point to the booking section
let bookButtons = document.querySelectorAll('a[href="#booking"]');

// Add click functionality to each link
bookButtons.forEach(function(button) {

    button.addEventListener("click", function(event) {

        // Prevent the default jumping action
        event.preventDefault();

        // Find the booking section
        let bookingSection = document.querySelector("#booking");

        // Scroll smoothly to the booking section
        bookingSection.scrollIntoView({
            behavior: "smooth"
        });

        // Display a toast notification
        showToast("Booking section selected!");
    });

});
