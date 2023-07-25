import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const App = () => {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    getRandomAdvice();
  }, []);

  const getRandomAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => setAdvice(response.data.slip.advice))
      .catch((error) => console.log(error));
  };

  const getSpecificAdvice = (id) => {
    axios
      .get(`https://api.adviceslip.com/advice/${id}`)
      .then((response) => setAdvice(response.data.slip.advice))
      .catch((error) => console.log(error));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Consejos</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/consejo-aleatorio">Consejo Aleatorio</Link>
              </li>
              <li>
                <Link to="/consejo-concreto">Consejo Concreto</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<p className="advice-text">{advice}</p>} />
            <Route
              path="/consejo-aleatorio"
              element={
                <>
                  <p className="advice-text">{advice}</p>
                  <button onClick={getRandomAdvice}>Obtener consejo aleatorio</button>
                </>
              }
            />
            <Route
              path="/consejo-concreto"
              element={
                <>
                  <input type="number" min="0" max="224" id="consejoId" />
                  <button
                    onClick={() => {
                      const id = document.getElementById("consejoId").value;
                      getSpecificAdvice(id);
                    }}
                  >
                    Obtener un consejo concreto
                  </button>
                  <p className="advice-text">{advice}</p>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
