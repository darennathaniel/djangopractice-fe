import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page from "./Page";
import Home from "./Home";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/posts/").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          key={0}
          element={<Home datas={data} setData={setData} />}
        ></Route>
        {data.map((route) => (
          <Route
            exact
            path={`/${route.id}`}
            key={route.id}
            element={<Page data={route}></Page>}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
