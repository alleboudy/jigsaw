import React, { useEffect, useState } from 'react';

const JigsawPuzzle = ({ imageSrc }) => {
  let [puzzleTiles, setPuzzleTiles] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.addEventListener('load', function () {
      const tileWidth = image.width / 3;
      const tileHeight = image.height / 2;
      let tiles = [];

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = tileWidth;
          canvas.height = tileHeight;
          context.drawImage(
            image,
            j * tileWidth,
            i * tileHeight,
            tileWidth,
            tileHeight,
            0,
            0,
            tileWidth,
            tileHeight
          );

          const tile = {
            id: i * 3 + j,
            image: canvas.toDataURL(),
            containerId: i * 3 + j, // Initialize containerId
          };
          tiles.push(tile);
        }
      }
      setPuzzleTiles(tiles);
    });
  }, [imageSrc]);
  const refreshPage = function () {
    window.location.reload(true);
  }
  const handleDragStart = (event, tileId) => {
    event.dataTransfer.setData('text/plain', tileId.toString());
  };


  const handleDragOver = (event, tileid) => {
    event.preventDefault();
    let all_dzs = document.getElementsByClassName("drop-zone");
    for (let i = 0; i < all_dzs.length; ++i) {
      all_dzs[i].style.borderColor = "black";
    }
    document.getElementById("drop-zone" + tileid.toString()).style.borderColor = "white";

  };

  const handleDrop = (event, tileContainerId) => {
    event.preventDefault();
    let all_dzs = document.getElementsByClassName("drop-zone");
    for (let i = 0; i < all_dzs.length; ++i) {
      all_dzs[i].style.borderColor = "black";
    }
    const tileId = parseInt(event.dataTransfer.getData('text/plain'));
    console.log("tileId", tileId)
    console.log("puzzleTiles", puzzleTiles)
    if (tileContainerId == tileId) {
      document.getElementById("dz-" + tileId.toString()).style.visibility = "visible";
      document.getElementById("tile-" + tileId.toString()).style.display = "none";
      const draggedTile = puzzleTiles.find((tile) => tile.id === tileId);
      console.log(draggedTile)
      if (draggedTile) {
        setPuzzleTiles((prevTiles) => {
          const updatedTiles = prevTiles.map((tile) => {
            if (tile.id === tileId) {
              return {
                ...tile,
                containerId: tileContainerId,
              };
            }
            return tile;
          });
          let isPuzzleCompleted = true;
          let all_dzs = document.getElementsByClassName("dz");
          for (let i = 0; i < all_dzs.length; ++i) {
            isPuzzleCompleted = isPuzzleCompleted && all_dzs[i].style.visibility == "visible";
          }
          setCompleted(isPuzzleCompleted);
          return updatedTiles;
        });
      }
    }


  };
  let tilesShuffled = puzzleTiles.map((tile) => (
    <div
      key={tile.id}
      data-index={tile.id}
      onDrop={(event) => handleDrop(event, tile.id)}
    >
      {tile.containerId === tile.id ? (
        <img
          id={"tile-" + tile.id.toString()}
          src={tile.image}
          alt={`Tile ${tile.id}`}
          className="tile"
          draggable
          onDragStart={(event) => handleDragStart(event, tile.id)}
        />
      ) : null}
    </div>
  )).sort(() => Math.random() - 0.5);
  return (
    <div className="puzzle-board">
      <div className='tiles-start-container' style={{ float: "left" }}>
        <div className='tiles-start'>
          {tilesShuffled}
        </div>
      </div>
      <div className='dropzones_container'>
        <div className='drop-zones' style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: "0",
          gridRowGap: "0"
        }}>
          {puzzleTiles.map((tile) => (
            <div
              style={{ border: '1px solid rgba(0, 0, 0, 1)' }}
              key={tile.id}
              className="drop-zone"
              id={"drop-zone" + tile.id}
              data-index={tile.id}
              onDragOver={(event) => handleDragOver(event, tile.id)}
              onDrop={(event) => handleDrop(event, tile.id)}
            >
              {tile.containerId === tile.id ? (
                <img
                  style={{ visibility: "hidden" }}
                  src={tile.image}
                  alt={`Tile ${tile.id}`}
                  id={"dz-" + tile.id.toString()}
                  className={"dz"}
                  draggable
                //onDragStart={(event) => handleDragStart(event, tile.id)}
                />
              ) : null}
            </div>
          ))}
          {completed && <div className="controls"><button onClick={refreshPage}>Click to reload!</button></div>}
        </div>
      </div>
    </div>
  );
};

export default JigsawPuzzle;
