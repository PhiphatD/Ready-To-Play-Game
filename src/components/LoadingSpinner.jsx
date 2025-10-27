import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring">
          <div className="spinner-inner"></div>
        </div>
        <div className="loading-text">
          <h3>🎮 กำลังโหลดเกม...</h3>
          <p>กรุณารอสักครู่</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner