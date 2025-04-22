
function App() {

  return (
    <main>
      <div className="inpBox">
        <input type="text" name="goal" id="goal" />
        <label htmlFor="goal">Enter Goal . . .</label>
      </div>
      <section className="player player--0 player--active">
        <h2 className="name" id="name--0">Player 1</h2>
        <p className="score" id="score--0">43</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--0">0</p>
        </div>
      </section>
      <section className="player player--1">
        <h2 className="name" id="name--1">Player 2</h2>
        <p className="score" id="score--1">24</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score" id="current--1">0</p>
        </div>
      </section>

      <img src="dice-5.png" alt="Playing dice" className="dice" />
      <button className="btn btn--new">🔄 New game</button>
      <button className="btn btn--roll">🎲 Roll dice</button>
      <button className="btn btn--hold">📥 Hold</button>
    </main>
  )
}

export default App
