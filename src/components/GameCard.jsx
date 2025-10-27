import { useState } from 'react'
import './GameCard.css'

const GameCard = ({ game, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const formatRating = (rating) => {
    if (!rating) return 'N/A'
    return rating.toFixed(1)
  }

  const getPlatformIcons = (platforms) => {
    if (!platforms) return []
    
    const platformMap = {
      'PC': '💻',
      'PlayStation': '🎮',
      'Xbox': '🎯',
      'Nintendo': '🎲',
      'iOS': '📱',
      'Android': '📱',
      'Mac': '🖥️',
      'Linux': '🐧'
    }
    
    return platforms.slice(0, 4).map(platform => {
      const name = platform.platform?.name || ''
      for (const [key, icon] of Object.entries(platformMap)) {
        if (name.includes(key)) return { name: key, icon }
      }
      return { name: name.slice(0, 3), icon: '🎮' }
    })
  }

  return (
    <div 
      className="game-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="game-card-media">
        {isHovered && game.clip?.clip && !imageError ? (
          <video
            src={game.clip.clip}
            autoPlay
            muted
            loop
            className="game-video"
            onError={handleImageError}
          />
        ) : (
          <img
            src={game.background_image || '/placeholder-game.jpg'}
            alt={game.name}
            className="game-image"
            onError={handleImageError}
          />
        )}
        
        <div className="game-card-overlay">
          <div className="game-rating">
            {game.metacritic && (
              <span className={`metacritic-score ${game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'}`}>
                {game.metacritic}
              </span>
            )}
          </div>
          
          <div className="game-platforms">
            {getPlatformIcons(game.platforms).map((platform, index) => (
              <span key={index} className="platform-icon" title={platform.name}>
                {platform.icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="game-card-content">
        <h3 className="game-title">{game.name}</h3>
        
        <div className="game-info">
          <div className="game-genres">
            {game.genres?.slice(0, 2).map((genre, index) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
                {index < Math.min(game.genres.length - 1, 1) && ', '}
              </span>
            ))}
          </div>
          
          <div className="game-stats">
            <div className="stat">
              <span className="stat-icon">⭐</span>
              <span className="stat-value">{formatRating(game.rating)}</span>
            </div>
            
            {game.released && (
              <div className="stat">
                <span className="stat-icon">📅</span>
                <span className="stat-value">{new Date(game.released).getFullYear()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="game-card-hover-effect">
        <div className="hover-text">คลิกเพื่อดูรายละเอียด</div>
      </div>
    </div>
  )
}

export default GameCard