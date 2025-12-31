export default function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--bg-tertiary);
          border-top: 4px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

