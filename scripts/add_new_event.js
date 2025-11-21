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


//itboybbno$1
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// Supabase setup
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://txcfsqsbfjtvmzjlbbun.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4Y2ZzcXNiZmp0dm16amxiYnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjE2NzUsImV4cCI6MjA3OTE5NzY3NX0.8uilbKWY0p5MrKzvm0RgX0Qw0u_3SmLAYyFUcXlky0s'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Import displayEvents from display_events.js
// import { displayEvents } from './display_events.js';

// const database = firebase.database();
// Function to upload image to Supabase Storage
async function uploadImage(file) {
    const bucketName = 'events';
    const filePath = `${file.name}`;
    const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);
    if (error) {
        throw error;
    }
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return publicUrlData.publicUrl;
}

// Function to add new event
function addNewEvent(eventData) {
    const newEventRef = database.ref('events').push();
    return newEventRef.set(eventData);
}

// Event listener for form submission (to be used in admin.html)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const eventName = document.getElementById('event-name').value;
            const eventLocation = document.getElementById('event-location').value;
            const eventDescription = document.getElementById('event-description').value;
            const eventImageFile = document.getElementById('event-image').files[0];

            if (!eventImageFile) {
                alert('Please select an image file.');
                return;
            }

            // Upload image to Supabase Storage
            uploadImage(eventImageFile)
                .then(imageUrl => {
                    // Prepare event data
                    const eventData = {
                        name: eventName,
                        location: eventLocation,
                        description: eventDescription,
                        image: imageUrl
                    };

                    // Add event to Firebase Realtime Database
                    return addNewEvent(eventData);
                })
                .then(() => {
                    console.log('Event added successfully!');
                    alert('Event added successfully!');
                    // Reset form
                    form.reset();
                })
                .catch((error) => {
                    console.error('Error adding event:', error);
                    alert('Error adding event. Please try again.');
                });
        });
    }
});
