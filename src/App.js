import React, { useState } from "react";
import "./App.css";
import "./puzzle.css";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";
import img from "./puzzle-img.png";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

function App() {
  const [text, setText] = useState("Hi!");
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const set = () => {
    setText("Please don't leave! ... refresh to play again :D");
  };
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>

      <span className="puzzle-body">
        <h2 className="tag">{text}</h2>
        <div className="controls"><button onClick={refreshPage}>Click to reload!</button></div>
        <br />
        <Box sx={{ width: 300 }}>
          <Slider
            aria-label="Always visible"
            defaultValue={3}
            getAriaValueText={valuetext}
            step={1}
            valueLabelDisplay="on"
            min={3}
            max={30}
            value={value} onChange={handleChange}
          />
        </Box>
      </span>
      <JigsawPuzzle
        imageSrc={img}
        rows={value}
        columns={value}
        onSolved={set}
        className="jigsaw-puzzle"
      />

    </>
  );
}

export default App;