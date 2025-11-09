import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";


export function useFavorite() {
    const [favorite, setFavorite] = useLocalStorage('favorite', []);

    const queryClient = useQueryClient();

    const favoriteQuery = useQuery({
        queryKey: ['favorite'],
        queryFn: () => favorite,
        initialData: favorite,
        staleTime: Infinity,
    })

    const addToFavorite = useMutation({
        mutationFn: async (city) => {
            const newSearch = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                searchedAt: Date.now(),
            };

            const exits = favorite.some((fav) => fav.id === newSearch.id);
            if (exits) {
                return favorite;
            }

            const newFavorite = [...favorite, newSearch].slice(0, 10);

            setFavorite(newFavorite);

            return newFavorite;
        },
        onSuccess: (newFavorite) => {
            queryClient.setQueryData(['favorite'], newFavorite);
        },
    })

    const clearFavorite = useMutation({
        mutationFn: async (id) => {
            const newFavorite = favorite.filter((fav) => fav.id !== id);
            setFavorite(newFavorite);
            return newFavorite;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['favorite']});
        },
    })

    return {
        favorite: favoriteQuery.data ?? [],
        addToFavorite,
        clearFavorite,
        isFavorite: (lat, lon) => 
            favorite.some((city) => city.lat === lat && city.lon === lon),
    }
}