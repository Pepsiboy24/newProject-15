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
 function displayEvents() {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    const eventsRef = database.ref('events');
    eventsRef.on('value', (snapshot) => {
        eventsList.innerHTML = '';
        const events = snapshot.val();
        if (events) {
            Object.keys(events).forEach(key => {
                const event = events[key];
                const eventItem = template.content.cloneNode(true).children[0]
                const eventName = eventItem.querySelector("[data-event_name]")
                const eventDesc = eventItem.querySelector("[data-event_desc]")
                const eventImg = eventItem.querySelector("[data-img]")
                eventName.textContent = event.name
                eventDesc.textContent = event.description
                eventImg.src = event.image


                // const eventItem = document.createElement('div');
                // eventItem.className = 'event-item';
                // eventItem.innerHTML = `
                //     <img src="${event.image}" alt="${event.name}">
                //     <div class="event-details">
                //         <h3>${event.name}</h3>
                //         <p><strong>Location:</strong> ${event.location}</p>
                //         <p><strong>Description:</strong> ${event.description}</p>
                //     </div>
                // `;
                eventsList.appendChild(eventItem);
            });
        } else {
            eventsList.innerHTML = '<p>No events found.</p>';
        }
    });
}

displayEvents()
// Display existing events on page load
document.addEventListener('DOMContentLoaded', function() {
    displayEvents();
});
