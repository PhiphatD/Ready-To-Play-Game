import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import GameGrid from './components/GameGrid'
import GameDetailModal from './components/GameDetailModal'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import './App.css'

const API_KEY = '47bc8c9bdcf240bcbee9097259216f1b'
const BASE_URL = 'https://api.rawg.io/api'

function App() {
  const [games, setGames] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedGameId, setSelectedGameId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Fetch games from API
  const fetchGames = async (searchQuery = '') => {
    setIsLoading(true)
    try {
      const url = searchQuery 
        ? `${BASE_URL}/games?key=${API_KEY}&search=${searchQuery}&page_size=20`
        : `${BASE_URL}/games?key=${API_KEY}&page_size=20`
      
      const response = await fetch(url)
      const data = await response.json()
      setGames(data.results || [])
    } catch (error) {
      console.error('Error fetching games:', error)
      setGames([])
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchGames()
  }, [])

  // Search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchGames(searchText)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchText])

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar 
        searchText={searchText}
        setSearchText={setSearchText}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <main className="main-content">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <GameGrid 
            games={games}
            onGameClick={setSelectedGameId}
          />
        )}
      </main>

      {selectedGameId && (
        <GameDetailModal 
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
          apiKey={API_KEY}
          baseUrl={BASE_URL}
        />
      )}

      <Footer />
    </div>
  )
}

export default App
