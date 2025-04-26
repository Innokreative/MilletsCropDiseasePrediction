import { Cloud, Wind, Droplet, Sun, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  conditions: string;
  icon: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Explicitly declared API key (for demo only - don't do this in production)
        const apiKey = 'c365cf06f0b93eccc8b73687e95b4cd8'; // Example key - replace with your own
        
        // Get user's approximate location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation?.getCurrentPosition(resolve, reject);
        }).catch(() => ({ coords: { latitude: 51.5074, longitude: -0.1278 } })); // Default to London if denied

        const { latitude, longitude } = position.coords;
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          conditions: data.weather[0].main,
          icon: data.weather[0].icon,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getDiseaseRisk = (humidity?: number, conditions?: string) => {
    if (!humidity || !conditions) return 'Unknown';
    
    if (conditions.toLowerCase().includes('rain') || humidity > 80) {
      return 'High';
    } else if (humidity > 60 || conditions.toLowerCase().includes('cloud')) {
      return 'Moderate';
    }
    return 'Low';
  };

  if (loading) {
    return (
      <div className="mb-8 p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl text-white shadow-md flex justify-center items-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const diseaseRisk = getDiseaseRisk(weather?.humidity, weather?.conditions);

  return (
    <div className="mb-8 p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl text-white shadow-md">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Cloud className="h-5 w-5 mr-2" />
        Weather Conditions
      </h3>
      
      {error ? (
        <div className="text-sm text-blue-100">
          Weather data unavailable: {error}
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {weather.conditions.toLowerCase().includes('clear') ? (
                <Sun className="h-10 w-10 mr-3 text-amber-300" />
              ) : (
                <Cloud className="h-10 w-10 mr-3" />
              )}
              <div>
                <div className="text-2xl font-bold">{weather.temp}°C</div>
                <div className="text-xs text-blue-100 capitalize">
                  {weather.conditions.toLowerCase()}, Ideal for Monitoring
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-blue-100">
              <div className="flex items-center mb-1">
                <Droplet className="h-3 w-3 mr-1" /> {weather.humidity}% Humidity
              </div>
              <div className="flex items-center">
                <Wind className="h-3 w-3 mr-1" /> {weather.windSpeed} km/h Wind
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-blue-400/30 text-xs text-blue-100">
            <div className="flex justify-between">
              <span>Disease Risk Level:</span>
              <span className={`font-medium ${
                diseaseRisk === 'High' ? 'text-red-300' : 
                diseaseRisk === 'Moderate' ? 'text-amber-300' : 
                'text-green-300'
              }`}>
                {diseaseRisk}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="text-sm text-blue-100">No weather data available</div>
      )}
    </div>
  );
};

export default WeatherWidget;