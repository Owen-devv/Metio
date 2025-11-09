import { format } from 'date-fns'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

export const WeatherForecast = ({ data }) => {

    const dailyForecast = data.list.reduce((acc, forecast) => {
        const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                weather: forecast.weather[0],
                humidity: forecast.main.humidity,
                date: forecast.dt,
                wind: forecast.wind.speed
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;
    }, {})
    
    const nextDay = Object.values(dailyForecast).slice(0, 6);
    const formatTemp = (temp) => `${Math.round(temp)}°C`

    return (
        <Card>
            <CardHeader>
                {/* Forecast: dự báo */}
                <CardTitle>Dự báo 5 ngày kế tiếp</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-4'>
                    {nextDay.map((day) => {
                        return (
                            <div key={day.date} className='grid grid-cols-3 items-center gap-4 rounded-lg border p-4'>
                                <div>
                                    <p className='font-medium'>{format(new Date(day.date * 1000), 'EEE, dd-MM')}</p>
                                    <p className='text-sm text-muted-foreground capitalize'>{day.weather.description}</p>
                                </div>
                                <div className='flex justify-center gap-4'>
                                    <span className='flex items-center text-blue-500'>
                                        <ArrowDown className='mr-1 h-4 w-4' />
                                        {formatTemp(day.temp_max)}
                                    </span>
                                    <span className='flex items-center text-red-500'>
                                        <ArrowUp className='mr-1 h-4 w-4' />
                                        {formatTemp(day.temp_min)}
                                    </span>
                                </div>

                                <div className='flex justify-end gap-4'>
                                    <span className='flex items-center gap-1'>
                                        <Droplets className='h-4 w-4 text-blue-500' />
                                        <span className='text-sm'>{day.humidity}%</span>
                                    </span>

                                    <span className='flex items-center gap-1'>
                                        <Wind className='h-4 w-4 text-blue-500' />
                                        <span className='text-sm'>{day.wind} m/s</span>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
