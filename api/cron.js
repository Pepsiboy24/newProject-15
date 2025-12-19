export default async function handler(request, response) {
  // 1. Get your environment variables
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  // 2. Simple check to ensure we have the keys
  if (!supabaseUrl || !supabaseKey) {
    return response.status(500).json({ error: 'Missing environment variables' });
  }

  try {
    // 3. Make a simple Fetch request to Supabase REST API
    // We select just 1 item from a table to keep it "active"
    // REPLACE 'users' with any actual table name you have (e.g., 'profiles', 'todos')
    const targetTable = 'users'; 
    
    const result = await fetch(`${supabaseUrl}/rest/v1/${targetTable}?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
    });

    if (result.ok) {
      return response.status(200).json({ message: 'Supabase pinged successfully!' });
    } else {
      return response.status(400).json({ error: 'Failed to ping Supabase', details: await result.text() });
    }
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}