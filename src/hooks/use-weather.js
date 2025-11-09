import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query) => ["search-location", query],
  
};

export function useWeatherQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherAPI.getCurrentWeather(coordinates.lat, coordinates.lon)
        : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherAPI.getForecast(coordinates.lat, coordinates.lon)
        : null,
    enabled: !!coordinates,
  });
}

export function useReverseGeocodeQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates
        ? weatherAPI.reverseGeocode(coordinates.lat, coordinates.lon)
        : null,
    enabled: !!coordinates,
  });
}

export function useSearchQuery(query) {
  return useQuery({
    queryKey: WEATHER_KEY.search(query),
    queryFn: () => weatherAPI.researchLocation(query),
    enabled: query.length > 3,
  });
}
