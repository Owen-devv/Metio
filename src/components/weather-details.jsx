import { format } from 'date-fns';
import { Gauge, Sunrise, Sunset, Wind } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const WeatherDetails = ({ data }) => {

    const { wind, main, sys } = data;

    const getWindDirection = (degrees) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(degrees / 45) % 8;
        // Math.round(((degrees %= 360) < 0 ? degrees + 360: degrees) / 45) % 8;
        return directions[index];
    }

    const formatTime = (timestamp) => {
        return format(new Date(timestamp), "h:mm a")
    }

    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Wind,
            color: "text-purple-500"
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-green-500"
        }
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-6 sm:grid-cols-2'>
                    {details.map((detail) => {
                        return(
                            <div key={detail.title} className='flex items-center gap-3 rounded-lg border p-4'>
                                <detail.icon className={`h-5 w-5 ${detail.color}`} />
                                <div>
                                    <p className='text-sm font-medium leading-none'>{detail.title}</p>
                                    <p className='text-sm text-muted-foreground'>{detail.value}</p>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>
            </CardContent>
        </Card>
    )
}
