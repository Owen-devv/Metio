import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { ThemeProvider } from './context/theme-provider'
import WeatherDashboard from './pages/Weather-dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CityPage } from './pages/city-pages'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider defaultTheme='system'>
            <Layout>
              <Routes>
                <Route path='/' element={<WeatherDashboard />} />
                <Route path='/city/:cityName' element={<CityPage />} />
              </Routes>
            </Layout>
            <Toaster richColors />
          </ThemeProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
