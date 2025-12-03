// 1. Import Supabase
// import { createClient } from '@supabase/supabase-js'

// 2. Supabase configuration
const supabaseUrl = 'https://agasljfosvxjdoigzkhp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXNsamZvc3Z4amRvaWd6a2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjEzMjYsImV4cCI6MjA3OTk5NzMyNn0.n0pW2fhB09GVsZhup1y_4kaU1WlZ0vkPYe1QSwCpkh0'

// 3. Initialize Supabase
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey)
// 4. Handle the Login
const loginForm = document.getElementById('login-form');
const submitBtn = document.getElementById('submit-btn')
const errorDisplay = document.getElementById('error-message');

submitBtn.addEventListener('click', async (e) => {
    console.log("click")
    e.preventDefault(); // Stop page from reloading

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (error) {
        console.error(error.message);
        errorDisplay.innerText = "Error: " + error.message;
    } else {
        // Signed in successfully
        console.log("Logged in as:", data.user.email);
        
        // Redirect to your dashboard
        window.location.href = "./admin-dashboard.html";
    }
});

// 5. (Optional but recommended) Check if user is already logged in
supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        // IF a session exists, don't let them sit on the login page.
        // Send them to the dashboard immediately.
        console.log("User already logged in, redirecting...");
        window.location.replace("./admin-dashboard.html");
    }
});
