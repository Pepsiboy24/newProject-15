// Supabase setup
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://agasljfosvxjdoigzkhp.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXNsamZvc3Z4amRvaWd6a2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjEzMjYsImV4cCI6MjA3OTk5NzMyNn0.n0pW2fhB09GVsZhup1y_4kaU1WlZ0vkPYe1QSwCpkh0'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const template = document.querySelector("[data-template]")

// Function to display events
async function displayEvents(searchTerm = '') {
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    const { data: events, error } = await supabase
        .from('all_events')
        .select('*');

    if (error) {
        console.error('Error fetching events:', error);
        eventsList.innerHTML = '<p>Error loading events.</p>';
        return;
    }

    eventsList.innerHTML = '';
    if (events) {
        const filteredEvents = events.filter(event =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredEvents.length > 0) {
            filteredEvents.forEach(event => {
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
}

// displayEvents()
// Add event listener to search input
document.addEventListener('DOMContentLoaded', async function() {
    const searchInput = document.getElementById('search-event');
    if (searchInput) {
        searchInput.addEventListener('input', async function() {
            console.log("click")
            const searchTerm = searchInput.value;
            await displayEvents(searchTerm);
        });
    }
    // Display all events on page load
    await displayEvents();
});
