import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'
import { CitySearch } from './city-search';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = "dark";
  return (
    // bg-gradient-to-br from-background to-muted
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        <Link to='/'>
          <img src={theme === isDark ? '/logo.png' : '/logo-2.png'} alt="logo" className='h-14' />
        </Link>
        <div className='flex gap-4'>
          <CitySearch />
          <button onClick={() => setTheme(theme === isDark ? 'light' : 'dark')}
            className={`flex items-center cursor-pointer transition-transform duration-500 
            ${theme === isDark ? 'rotate-10' : 'rotate-190'}`}>
            {theme === isDark ? <Sun className='h-6 w-6 text-yellow-400 rotate-0 transition-all' /> : 
            <Moon className='h-6 w-6 text-blue-700 rotate-90 transition-all' />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header