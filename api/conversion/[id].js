/[id].js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { id } = req.query;
  const apiKey = req.headers.authorization;
  
  const response = await fetch(`https://api.musicgpt.com/api/public/v1/conversion/${id}`, {
    headers: { 'Authorization': apiKey }
  });
  
  const data = await response.json();
  res.json(data);
}
