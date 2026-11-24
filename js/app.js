
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

let matchSelect = document.getElementById("match");
let standSelect = document.getElementById("stand");
let quantityInput = document.getElementById("quantity");


console.log(matchSelect.value);
console.log(standSelect.value);
console.log(quantityInput.value);


matchSelect.addEventListener("change", function() {
    console.log(matchSelect.value);
});
standSelect.addEventListener("change", function() {
    console.log(standSelect.value);
});

quantityInput.addEventListener("change", function() {
    console.log(quantityInput.value);
});

let ticketPrices = {
    "RCB vs CSK": {
        "General": 800,
        "Premium": 1500,
        "VIP": 3000
    },
    "MI vs KKR": {
        "General": 900,
        "Premium": 1600,
        "VIP": 3500
    },
    "CSK vs MI": {
        "General": 800,
        "Premium": 1400,
        "VIP": 3000
    }
};

function calculateTotal() {
    let match = matchSelect.value;
    let stand = standSelect.value;
    let quantity = Number(quantityInput.value);

    if (match === "" || stand === "" || quantity === 0) {
        return;
    }

    let price = ticketPrices[match][stand];
    let total = price * quantity;

    summaryMatch.textContent = match;
    summaryStand.textContent = stand;
    summaryPrice.textContent = "₹" + price;
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = "₹" + total;
}


let summaryMatch = document.getElementById("summaryMatch");
let summaryStand = document.getElementById("summaryStand");
let summaryPrice = document.getElementById("summaryPrice");
let summaryQuantity = document.getElementById("summaryQuantity");
let summaryTotal = document.getElementById("summaryTotal");


matchSelect.addEventListener("change", calculateTotal);
standSelect.addEventListener("change", calculateTotal);
quantityInput.addEventListener("input", calculateTotal);


//Grid/List Toggle

let matchGrid = document.querySelector(".match-grid");
let gridViewBtn = document.getElementById("gridViewBtn");
let listViewBtn = document.getElementById("listViewBtn");


gridViewBtn.addEventListener("click", function() {
    matchGrid.classList.remove("list-view");
    matchGrid.classList.add("grid-view");
});

listViewBtn.addEventListener("click", function() {
    matchGrid.classList.remove("grid-view");
    matchGrid.classList.add("list-view");
});


//  Team Filter

let teamFilter = document.getElementById("team");
let matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function() {
    let selectedTeam = teamFilter.value;

    matchCards.forEach(function(card) {
        let matchName = card.querySelector("h4").textContent;

        if (selectedTeam === "all" || matchName.includes(selectedTeam)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


//Hamburger Menu

let menuToggle = document.getElementById("menuToggle");
let navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("active");
});

navMenu.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function(event) {

        let target = link.getAttribute("href");

        if (target.startsWith("#")) {
            event.preventDefault();

            let section = document.querySelector(target);

            // Close the sidebar
            navMenu.classList.remove("active");

            // Scroll after the sidebar closes
            setTimeout(function() {
                if (section) {
                    section.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }, 300);

        } else {
            // Close menu when navigating to another page
            navMenu.classList.remove("active");
        }

    });

});
