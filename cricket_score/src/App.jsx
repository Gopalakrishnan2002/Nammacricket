import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [balls, setBalls] = useState(0);
  const [over, setOver] = useState(0);
  const [name, setName] = useState("");
  const [bowler, setBowler] = useState("");
  const [isSet, setIsSet] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentOverBalls, setCurrentOverBalls] = useState([]);

  // Over Complete logic
  useEffect(() => {
    if (balls === 6) {
      const overData = {
        overNumber: over + 1,
        batsman: name || "Unknown",
        bowler: bowler || "Unknown",
        runs: currentOverBalls,
        totalAtEnd: `${score}/${wicket}`,
      };

      setHistory((prev) => [overData, ...prev]);

      // Subtle notification instead of alert could be better, 
      // but keeping logic consistent with original
      setTimeout(() => alert(`Over ${over + 1} Completed! ✅`), 100);

      setOver((o) => o + 1);
      setBalls(0);
      setCurrentOverBalls([]);
      setIsSet(false);
      setName("");
      setBowler("");
    }
  }, [balls, over, name, bowler, currentOverBalls, score, wicket]);

  const addScore = (runs) => {
    if (!isSet) return alert("Please set players first! 🏏");
    setScore((s) => s + runs);
    setBalls((b) => b + 1);
    setCurrentOverBalls((prev) => [...prev, runs]);
  };

  const addDotBall = () => {
    if (!isSet) return alert("Please set players first! 🏏");
    setBalls((b) => b + 1);
    setCurrentOverBalls((prev) => [...prev, "."]);
  };

  const addExtra = (type) => {
    if (!isSet) return alert("Please set players first! 🏏");
    setScore((s) => s + 1);
    setCurrentOverBalls((prev) => [...prev, type]);
  };

  const handleWicket = () => {
    if (!isSet) return alert("Please set players first! 🏏");
    setWicket((w) => w + 1);
    setBalls((b) => b + 1);
    setCurrentOverBalls((prev) => [...prev, "W"]);
  };

  return (
    <div className="app-container">
      <div className="scoreboard-card">
        <header className="header">
          <h1>Cricket Live Score</h1>
        </header>

        {/* Live Score Display */}
        <section className="score-display">
          <div className="main-score">
            {score}/{wicket}
          </div>
          <div className="overs-display">
            OVERS: {over}.{balls}
          </div>
        </section>

        {/* Player Setup */}
        {!isSet ? (
          <section className="player-inputs">
            <div className="input-group">
              <input
                type="text"
                placeholder="🏏 Batsman Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="⚾ Bowler Name"
                value={bowler}
                onChange={(e) => setBowler(e.target.value)}
              />
            </div>
            <button className="set-players-btn" onClick={() => setIsSet(true)}>
              START OVER
            </button>
          </section>
        ) : (
          <div className="active-players">
            <span className="player-tag">🏏 {name}</span>
            <span className="player-tag">vs</span>
            <span className="player-tag">⚾ {bowler}</span>
          </div>
        )}

        {/* Controls Grid */}
        <section className="controls-grid">
          {[1, 2, 3, 4, 6].map((run) => (
            <button
              key={run}
              className={`control-btn run r${run}`}
              onClick={() => addScore(run)}
            >
              {run}
            </button>
          ))}
          <button className="control-btn run" onClick={addDotBall}>
            •
          </button>
          <button className="control-btn extra" onClick={() => addExtra("WD")}>
            WD
          </button>
          <button className="control-btn extra" onClick={() => addExtra("NB")}>
            NB
          </button>
          <button className="control-btn wicket" onClick={handleWicket}>
            W
          </button>
        </section>

        {/* Current Over Ribbon */}
        <section className="current-over-ribbon">
          {currentOverBalls.length > 0 ? (
            currentOverBalls.map((ball, idx) => (
              <div key={idx} className={`ball-indicator ${ball.toString().toLowerCase()}`}>
                {ball}
              </div>
            ))
          ) : (
            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              Ready for the over...
            </span>
          )}
        </section>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <section className="history-section">
          <h3>Over History</h3>
          {history.map((h, i) => (
            <div key={i} className="over-card">
              <div className="over-header">
                <span className="over-number">OVER {h.overNumber}</span>
                <span style={{ fontWeight: 600 }}>{h.totalAtEnd}</span>
              </div>
              <div className="players-info">
                <span>🏏 {h.batsman}</span>
                <span>vs</span>
                <span>⚾ {h.bowler}</span>
              </div>
              <div className="current-over-ribbon" style={{ padding: "0.5rem 0", background: "none" }}>
                {h.runs.map((ball, idx) => (
                  <div key={idx} className={`ball-indicator ${ball.toString().toLowerCase()}`}>
                    {ball}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default App;