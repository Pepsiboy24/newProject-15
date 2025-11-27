// Fetch and display events
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)


const eventsRef = database.ref('events');
const eventsList = document.getElementById('events-list');
const upcomingEventsEl = document.getElementById('upcoming-events');

eventsRef.on('value', (snapshot) => {
    const events = snapshot.val();
    eventsList.innerHTML = '';
    let upcomingEvents = 0;
    const now = new Date();

    if (events) {
        Object.keys(events).forEach(key => {
            const event = events[key];
            const eventDate = new Date(event.date);
            if (eventDate > now) {
                upcomingEvents++;
            }
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <h4>${event.name}</h4>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Description:</strong> ${event.description}</p>
                <p><strong>Image:</strong> <a href="${event.image}" target="_blank">View Image</a></p>
            `;
            eventsList.appendChild(eventItem);
        });
    } else {
        eventsList.innerHTML = '<p class="no-events">No events posted yet.</p>';
    }

    upcomingEventsEl.textContent = upcomingEvents;
});
