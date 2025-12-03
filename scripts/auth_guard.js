// auth-guard.js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// 1. Config (Use your SAME keys)
const supabaseUrl = 'https://agasljfosvxjdoigzkhp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYXNsamZvc3Z4amRvaWd6a2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjEzMjYsImV4cCI6MjA3OTk5NzMyNn0.n0pW2fhB09GVsZhup1y_4kaU1WlZ0vkPYe1QSwCpkh0'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. The Check
async function protectRoute() {
    // Check if the user has a "wristband" (token) in local storage
    const { data: { session } } = await supabase.auth.getSession();

    // 3. Logic: If NO session, kick them out
    if (!session) {
        console.warn("Unauthorized access attempt. Redirecting...");
        // .replace() is better than .href because it prevents the "Back" button
        window.location.replace('./login.html'); 
    } else {
        document.body.style.display = 'block';
        console.log("Access granted for:", session.user.email);
    }
}

// 4. Run immediately
protectRoute();