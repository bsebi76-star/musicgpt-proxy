export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    const apiKey = req.headers.authorization;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'Authorization header required' });
    }
    
    if (!id) {
      return res.status(400).json({ error: 'Conversion ID required' });
    }
    
    const response = await fetch(`https://api.musicgpt.com/api/public/v1/conversion/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': apiKey
      }
    });
    
    const data = await response.json();
    
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
