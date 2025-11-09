import { CurrentWeather } from '@/components/current-weather'
import { FavoriteCities } from '@/components/favorite'
import { HourlyTemperature } from '@/components/hourly-temperature'
import { WeatherSkeleton } from '@/components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { WeatherDetails } from '@/components/weather-details'
import { WeatherForecast } from '@/components/weather-forecast'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'
import { AlertCircleIcon, AlertTriangle, MapPin, RefreshCw } from 'lucide-react'
import React from 'react'

const WeatherDashboard = () => {
  const { coordinates, error, isLoading, getLocation } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  }

  if (isLoading) {
    return <WeatherSkeleton />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location error</AlertTitle>
        <AlertCircleIcon />
        <AlertDescription>
          <p>{error}</p>
          <Button onClick={getLocation} variant={"outline"} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  const locationName = locationQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertCircleIcon />
        <AlertDescription>
          <p>Fail to fetch location data</p>
          <Button onClick={handleRefresh} variant={"outline"} className='w-fit'>
            <RefreshCw className='mr-2 h-4 w-4' />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />
  }

  return (
    <div className='space-y-4'>
      <FavoriteCities />
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>Danh sách yêu thích</h1>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetched || forecastQuery.isFetched}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />

          <HourlyTemperature data={forecastQuery.data} />
        </div>
        <div className='grid gap-6 md:grid-cols-2 items-start'>
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>

    </div>

  )
}

export default WeatherDashboard