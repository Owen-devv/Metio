import React, { useState } from 'react'
import { Button } from './ui/button'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useSearchQuery } from '@/hooks/use-weather';
import { useNavigate } from 'react-router-dom';
import { useSearchHistory } from '@/hooks/use-search-history';
import { format } from 'date-fns';
import { useFavorite } from '@/hooks/use-favorite';

export const CitySearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { data, isLoading } = useSearchQuery(query);
    const { history, clearHistory, addToHistory } = useSearchHistory();

    const handleSelect = (cityData) => {
        const [lat, lon, name, country] = cityData.split('|');
        addToHistory.mutate({ lat: parseFloat(lat), lon: parseFloat(lon), name, country });

        setOpen(false);
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
    };

    const {favorite} = useFavorite();

    return (
        <>
            <Button
                variant={'outline'}
                className='relative w-full justify-start text-sm text-muted-foreground sm:pr-2 md:w-40 lg:w-64'
                onClick={() => setOpen(true)}>
                <Search className='mr-1 h-4 w-4' />
                Tìm kiếm địa điểm...</Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Tìm kiếm địa điểm..." />
                <CommandList>
                    {query.length > 2 && !isLoading && (
                        <CommandEmpty>Không tìm thấy địa điểm nào.</CommandEmpty>
                    )}

                    {favorite.length > 0 && (
                            <CommandGroup heading="Yêu thích">

                                {history.map((data) => (
                                    <CommandItem key={`${location.id}`}
                                        value={`${data.lat}|${data.lon}|${data.name}|${data.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Star className='mr-2 h-4 w-4 text-yellow-500' />
                                        <span>{data.name}</span>
                                        {data.state && (
                                            <span className='text-sm text-muted-foreground'>, {data.state}</span>
                                        )}
                                        <span className='text-sm text-muted-foreground'>, {data.country}</span>
                                        <span className='ml-auto text-xs text-muted-foreground'>
                                            {format(data.searchedAt, "MMM dd, h:mm a")}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                    )}

                    {history.length > 0 && (
                        <>
                            <CommandGroup heading="Lịch sử tìm kiếm">
                                <div className='flex justify-between items-center py-2 px-2'>
                                    <p>Lịch sử tìm kiếm</p>
                                    <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    onClick={() => clearHistory.mutate()}
                                    >
                                        <XCircle className='h-4 w-4' />
                                        Xóa tất cả
                                    </Button>
                                </div>
                                {history.map((data) => (
                                    <CommandItem key={`${data.lat}-${data.lon}`}
                                        value={`${data.lat}|${data.lon}|${data.name}|${data.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Clock className='mr-2 h-4 w-4 text-muted-foreground' />
                                        <span>{data.name}</span>
                                        {data.state && (
                                            <span className='text-sm text-muted-foreground'>, {data.state}</span>
                                        )}
                                        <span className='text-sm text-muted-foreground'>, {data.country}</span>
                                        <span className='ml-auto text-xs text-muted-foreground'>
                                            {format(data.searchedAt, "MMM dd, h:mm a")}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    )}

                    {data && data.length > 0 && (
                        <CommandGroup heading="Đề xuất">
                            {isLoading && (
                                <div className='flex items-center justify-center p-4'>
                                    <Loader2 className='h-4 w-4 animate-spin' />
                                </div>
                            )}

                            {data.map((item) => (
                                <CommandItem key={`${item.lat} ${item.lon}`}
                                    value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Search className='mr-2 h-4 w-4' />
                                    <span>{item.name}</span>
                                    {item.state && (
                                        <span className='text-sm text-muted-foreground'>{item.state}</span>
                                    )}
                                    <span className='text-sm text-muted-foreground'>{item.country}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
};
