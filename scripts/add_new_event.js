// Supabase setup
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://agasljfosvxjdoigzkhp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXNsamZvc3Z4amRvaWd6a2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjEzMjYsImV4cCI6MjA3OTk5NzMyNn0.n0pW2fhB09GVsZhup1y_4kaU1WlZ0vkPYe1QSwCpkh0'
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey)

// Function to upload image to Supabase Storage
async function uploadImage(file) {
    const bucketName = 'events';
    // Create unique filename using timestamp
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = fileName;
    
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });
    
    if (error) {
        console.error('Upload error:', error);
        throw error;
    }
    
    const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
    
    console.log('Uploaded file path:', filePath);
    console.log('Public URL:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
}

// Function to add new event
async function addNewEvent(eventData) {
    const { data, error } = await supabase
        .from('all_events')
        .insert([eventData])
        // .select(); // Add select to return the inserted data
    
    if (error) {
        console.error('Database insert error:', error);
        throw error;
    }
    return data;
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    const submitBtn = document.querySelector("[data-submit]")
    if (form) {
        submitBtn.addEventListener('click', async function(e) {
            e.preventDefault();

            const eventName = document.getElementById('event-name').value;
            const eventLocation = document.getElementById('event-location').value;
            const eventDescription = document.getElementById('event-description').value;
            const eventImageFile = document.getElementById('event-image').files[0];

            
            if (!eventImageFile) {
                alert('Please select an image file.');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) submitBtn.textContent = 'Uploading...';

            try {
                // Upload image to Supabase Storage
                const imageUrl = await uploadImage(eventImageFile);
                console.log("event name: " + eventName)
            console.log("event location: " + eventLocation)
            console.log("event description: " +eventDescription)
            console.log("event image: " + eventImageFile)
            console.log("Hello: " + imageUrl)
                
                // Prepare event data
                const eventData = {
                    name: eventName,
                    location: eventLocation,
                    description: eventDescription,
                    image: imageUrl
                };

                // Add event to database
                await addNewEvent(eventData);
                
                console.log('Event added successfully!');
                alert('Event added successfully!');
                
                // Reset form
                form.reset();
                
                // Redirect after a short delay
                setTimeout(() => {
                    window.location.href = './admin-dashboard.html';
                }, 500);
                
            } catch (error) {
                console.error('Error adding event:', error);
                alert(`Error adding event: ${error.message || 'Please try again.'}`);
                
                // Reset button
                if (submitBtn) submitBtn.textContent = originalBtnText;
            }
        });
    }
});
