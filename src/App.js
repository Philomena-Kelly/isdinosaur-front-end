import "./App.css";
import { useState, React } from "react";
import { SpinningCircles } from "react-loading-icons";

function App() {
  const axios = require("axios");
  const [answer, updateAnswer] = useState(" ");
  const [critterQuery, updateCritter] = useState("");

  window.onload = function () {
    var input = document.getElementById("userGuess");
    input.focus();
    input.select();
  };

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
    updateAnswer(<SpinningCircles height="31px" />);
    searchCritter(critterQuery);
  };
  return (
    <div className="App">
      <h1>
        <form onSubmit={submitSearch}>
          is a <br />
          <input
            onChange={updateFriend}
            value={critterQuery}
            id="userGuess"
            // autofocus
            // onFocus="this.select()"
            placeholder="squirrel"
            autocomplete="off"
          />
          <br />a dinosaur? <input type="submit" value="go ->" class="go" />
        </form>
        {answer}
      </h1>
    </div>
  );
}

export default App;
