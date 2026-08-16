export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle browser CORS preflight request
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  const { city } = req.query;

  if (!city) {
    return res.status(400).json({
      error: "City is required",
    });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city,
    )}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "City not found",
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch weather data",
    });
  }
}
