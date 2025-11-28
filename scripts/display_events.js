// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCap2oaoa7E4mugwjpwsmTnWZfMTggvAxE",
  authDomain: "events-581de.firebaseapp.com",
  projectId: "events-581de",
  storageBucket: "events-581de.firebasestorage.app",
  messagingSenderId: "595844837268",
  appId: "1:595844837268:web:fad8d9fbcb17b16d996981",
  measurementId: "G-R9QEJ8KGTJ",
  databaseURL: "https://events-581de-default-rtdb.europe-west1.firebasedatabase.app"
};
const template = document.querySelector("[data-template]")
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to display events
function displayEvents(searchTerm = '') {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    const eventsRef = database.ref('events');
    eventsRef.on('value', (snapshot) => {
        eventsList.innerHTML = '';
        const events = snapshot.val();
        if (events) {
            const filteredEvents = Object.keys(events).filter(key => {
                const event = events[key];
                return event.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            if (filteredEvents.length > 0) {
                filteredEvents.forEach(key => {
                    const event = events[key];
                    const eventItem = template.content.cloneNode(true).children[0]
                    const eventName = eventItem.querySelector("[data-event_name]")
                    const eventDesc = eventItem.querySelector("[data-event_desc]")
                    const eventImg = eventItem.querySelector("[data-img]")
                    const linkBtn = eventItem.querySelector("[data-link]")
                    eventName.textContent = event.name
                    eventDesc.textContent = event.description
                    linkBtn.href = event.location
                    eventImg.src = event.image
                    eventsList.appendChild(eventItem);
                });
            } else {
                eventsList.innerHTML = '<p>No events found matching your search.</p>';
            }
        } else {
            eventsList.innerHTML = '<p>No events found.</p>';
        }
    });
}

// Add event listener to search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-event');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log("click")
            const searchTerm = searchInput.value;
            displayEvents(searchTerm);
        });
    }
    // Display all events on page load
    displayEvents();
});
