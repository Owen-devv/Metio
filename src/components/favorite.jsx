import { useFavorite } from '@/hooks/use-favorite';
import React from 'react'
import { ScrollArea } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useWeatherQuery } from '@/hooks/use-weather';
import { Loader2, X } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const FavoriteCities = () => {
    const { favorite, clearFavorite } = useFavorite();

    if (!favorite.length) {
        return null;
    }
    return (
        <>
            <h1 className='text-xl font-bold tracking-tight'>Favorite Cities</h1>
            <ScrollArea className='w-full pb-4'>
                <div className='flex gap-4'>
                    {favorite.map((city) => (
                        <FavoriteCityTablet
                            key={city.id}
                            {...city}
                            onRemove={(id) => clearFavorite.mutate(id)}
                        />
                    ))}
                </div>
            </ScrollArea>
        </>
    )
}

function FavoriteCityTablet({ id, name, lat, lon, onRemove }) {
    const navigate = useNavigate();
    const { data, isLoading } = useWeatherQuery({ lat, lon });

    return (
        <div
            onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
            role='button'
            tabIndex={0}
            className='relative flex min-w-[250px] cursor-pointer items-center gap-3
        rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md'
        >
            <Button
                variant={"ghost"}
                size={"icon"}
                className='absolute right-1 top-1 h-6 w-6 rounded-full p-0 
            hover:text-accent-foreground group-hover:opacity-100'
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                    toast.error(`Removed ${name} from favorites`);
                }}
            >
                <X className='h-4 w-4' />
            </Button>
            {isLoading ? (
                <div className='flex h-8 items-center justify-center'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                </div>
            ) : data ? (
                <>
                    <div className='flex items-center gap-2'>
                        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt={data.weather[0].description}
                            className='h-8 w-8' />
                        <div>
                            <p className='font-medium'>{name}</p>
                            <p className='text-xm text-muted-foreground'>{data.sys.country}</p>
                        </div>
                    </div>

                    <div className='ml-auto text-right'>
                        <p className='text-xl font-bold'>{Math.round(data.main.temp)}°C</p>
                        <p className='text-xs capitalize text-accent-foreground'>{data.weather[0].description}</p>
                    </div>
                </>
            ) : null}
        </div>
    )
}
