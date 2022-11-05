import "./App.css";
import { useState, React } from "react";
import axios from "axios";
import loading from "./images/loading.svg";

function App() {
  const axios = require("axios");
  const [answer, updateAnswer] = useState("");
  const [critterQuery, updateCritter] = useState("");

  const searchCritter = (critterQuery) => {
    axios
      .get(`https://dinosaurproxy.herokuapp.com/search?subject=${critterQuery}`)
      .then((response) => {
        console.log(response.data);
        updateAnswer(response.data.answer);
      })
      .catch((error) => {
        console.log(<section>{error.response.data.message}</section>);
      });
  };

  const updateFriend = (event) => {
    updateCritter(event.target.value);
  };

  const submitSearch = (event) => {
    event.preventDefault();
    updateAnswer(<img src={loading} alt="loading" />);
    searchCritter(critterQuery);
  };
  return (
    <div className="App">
      <form onSubmit={submitSearch}>
        is a <input onChange={updateFriend} value={critterQuery} /> a dinosaur?{" "}
        <input type="submit" value="go ->" />
      </form>
      {answer}
    </div>
  );
}

export default App;
