import GameCard from './GameCard'
import './GameGrid.css'

const GameGrid = ({ games, onGameClick }) => {
  if (!games || games.length === 0) {
    return (
      <div className="no-games">
        <div className="no-games-content">
          <div className="no-games-icon">🎮</div>
          <h2>ไม่พบเกมที่ค้นหา</h2>
          <p>ลองค้นหาด้วยคำอื่นหรือเลือกดูเกมแนะนำ</p>
        </div>
      </div>
    )
  }

  return (
    <div className="game-grid-container">
      <div className="game-grid">
        {games.map((game) => (
          <GameCard 
            key={game.id}
            game={game}
            onClick={() => onGameClick(game.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default GameGrid