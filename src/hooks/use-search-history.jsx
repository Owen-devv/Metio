import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";


export function useSearchHistory() {
    const [searchHistory, setSearchHistory] = useLocalStorage('search-history', []);

    const queryClient = useQueryClient();

    const historyQuery = useQuery({
        queryKey: ['search-history'],
        queryFn: () => searchHistory,
        initialData: searchHistory,
    })

    const addToHistory = useMutation({
        mutationFn: async (search) => {
            const newSearch = {
                ...search,
                id: `${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt: Date.now(),
            };

            const filteredHistory = searchHistory.filter((item) =>
                !(item.lat === newSearch.lat && item.lon === newSearch.lon));


            const newHistory = [...filteredHistory, newSearch].slice(0, 10);

            setSearchHistory(newHistory);

            return newHistory;
        },
        onSuccess: (newHistory) => {
            queryClient.setQueryData(['search-history'], newHistory);
        },
    })

    const clearHistory = useMutation({
        mutationFn: () => {
            setSearchHistory([]);
        },
        onSuccess: () => {
            queryClient.setQueryData(['search-history'], []);
        },
    })

    return {
        history: historyQuery.data ?? [],
        addToHistory,
        clearHistory,
    }
}