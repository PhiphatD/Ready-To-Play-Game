import { useState, useEffect } from 'react'
import './GameDetailModal.css'

const GameDetailModal = ({ gameId, onClose, apiKey, baseUrl }) => {
  const [gameDetails, setGameDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!gameId) return
      
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`${baseUrl}/games/${gameId}?key=${apiKey}`)
        if (!response.ok) {
          throw new Error('Failed to fetch game details')
        }
        const data = await response.json()
        setGameDetails(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching game details:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGameDetails()
  }, [gameId, apiKey, baseUrl])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const formatRequirements = (requirements) => {
    if (!requirements) return null
    
    // Clean up the requirements text
    const cleanText = requirements
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n\n+/g, '\n') // Replace multiple newlines with single
      .trim()
    
    return cleanText.split('\n').filter(line => line.trim())
  }

  const getPCRequirements = () => {
    if (!gameDetails?.platforms) return null
    
    const pcPlatform = gameDetails.platforms.find(
      platform => platform.platform.name.toLowerCase().includes('pc')
    )
    
    return pcPlatform?.requirements || null
  }

  if (isLoading) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>กำลังโหลดข้อมูลเกม...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="modal-content error">
          <div className="error-content">
            <div className="error-icon">❌</div>
            <h2>เกิดข้อผิดพลาด</h2>
            <p>{error}</p>
            <button onClick={onClose} className="close-button">ปิด</button>
          </div>
        </div>
      </div>
    )
  }

  if (!gameDetails) return null

  const pcRequirements = getPCRequirements()

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="game-hero">
            <img 
              src={gameDetails.background_image} 
              alt={gameDetails.name}
              className="hero-image"
            />
            <div className="hero-overlay">
              <h1 className="game-name">{gameDetails.name}</h1>
              <div className="game-meta">
                {gameDetails.released && (
                  <span className="release-date">📅 {new Date(gameDetails.released).toLocaleDateString('th-TH')}</span>
                )}
                {gameDetails.metacritic && (
                  <span className={`metacritic ${gameDetails.metacritic >= 75 ? 'high' : gameDetails.metacritic >= 50 ? 'medium' : 'low'}`}>
                    Metacritic: {gameDetails.metacritic}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="game-info-grid">
            <div className="info-section">
              <h3>📝 รายละเอียดเกม</h3>
              <div className="description">
                {gameDetails.description_raw ? (
                  <p>{gameDetails.description_raw.slice(0, 500)}...</p>
                ) : (
                  <p>ไม่มีรายละเอียดเกม</p>
                )}
              </div>
            </div>

            <div className="info-section">
              <h3>🎮 แพลตฟอร์ม</h3>
              <div className="platforms-list">
                {gameDetails.platforms?.map((platform, index) => (
                  <span key={index} className="platform-tag">
                    {platform.platform.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>🏷️ หมวดหมู่</h3>
              <div className="genres-list">
                {gameDetails.genres?.map((genre, index) => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>🏢 ผู้พัฒนา</h3>
              <div className="developers-list">
                {gameDetails.developers?.map((dev, index) => (
                  <span key={dev.id} className="developer-tag">
                    {dev.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {pcRequirements && (
            <div className="requirements-section">
              <h3>💻 ความต้องการของระบบ (PC)</h3>
              <div className="requirements-grid">
                {pcRequirements.minimum && (
                  <div className="requirement-box">
                    <h4>ความต้องการขั้นต่ำ</h4>
                    <div className="requirement-text">
                      {formatRequirements(pcRequirements.minimum)?.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
                
                {pcRequirements.recommended && (
                  <div className="requirement-box">
                    <h4>ความต้องการที่แนะนำ</h4>
                    <div className="requirement-text">
                      {formatRequirements(pcRequirements.recommended)?.map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {!pcRequirements.minimum && !pcRequirements.recommended && (
                <p className="no-requirements">ไม่มีข้อมูลความต้องการของระบบ</p>
              )}
            </div>
          )}

          {gameDetails.website && (
            <div className="website-section">
              <a 
                href={gameDetails.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="website-link"
              >
                🌐 เยี่ยมชมเว็บไซต์อย่างเป็นทางการ
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameDetailModal