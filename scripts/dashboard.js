// Fetch and display events
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://agasljfosvxjdoigzkhp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXNsamZvc3Z4amRvaWd6a2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjEzMjYsImV4cCI6MjA3OTk5NzMyNn0.n0pW2fhB09GVsZhup1y_4kaU1WlZ0vkPYe1QSwCpkh0'
const supabase = createClient(supabaseUrl, supabaseAnonKey)


const eventsList = document.getElementById('events-list');
const upcomingEventsEl = document.getElementById('upcoming-events');

// Fetch events from Supabase
supabase
  .from('all_events')
  .select('*')
  .then(({ data: events, error }) => {
    if (error) {
      console.error('Error fetching events:', error);
      eventsList.innerHTML = '<p class="no-events">Error loading events.</p>';
      return;
    }
    console.log(events)
    eventsList.innerHTML = '';
    let upcomingEvents = 0;
    const now = new Date();
    console.log(events)
    if (events && events.length > 0) {
      events.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate > now) {
          upcomingEvents++;
        }
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
          <h4>Name: ${event.name}</h4>
          <p><strong>Description:</strong> ${event.description}</p>
          <p><strong>Link:</strong> ${event.location}</p>
          `;
          // <p><strong>Image:</strong> <a href="${event.image}" target="_blank">View Image</a></p>
        eventsList.appendChild(eventItem);
      });
    } else {
      eventsList.innerHTML = '<p class="no-events">No events posted yet.</p>';
    }

    upcomingEventsEl.textContent = upcomingEvents;
  });
