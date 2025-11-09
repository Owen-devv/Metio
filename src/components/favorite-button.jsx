import { useFavorite } from '@/hooks/use-favorite';
import React from 'react'
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

export const FavoriteButton = ({ data }) => {
    const { isFavorite, addToFavorite, clearFavorite } = useFavorite();
    const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleToggleFavorite = () => {
        if (isCurrentFavorite) {
            clearFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error("Xóa khỏi danh sách yêu thích");
        } else {
            addToFavorite.mutate({
                id: `${data.coord.lat}-${data.coord.lon}`,
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });
            toast.success("Added to favorite");
        }
    }
    return (
        <Button
            variant={isCurrentFavorite ? "default" : "outline"}
            size={"icon"}
            className={isCurrentFavorite ? "bg-yellow-400 hover:bg-yellow-500" : ""}
            onClick={handleToggleFavorite}
        >
            <Star
                className={`h-4 w-4 ${isCurrentFavorite ? "fill-current" : ""}`}
            />
        </Button>
    )
}
