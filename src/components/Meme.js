import React, { useEffect, useState } from "react";

export default function Meme() {
  const [allMemes, setAllMemes] = useState([]);
  const [meme, setMeme] = useState({
    upperText: "",
    bottomText: "",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function handleText(event) {
    const { name, value } = event.target;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  function handleGetNewImage() {
    setMeme((prevState) => {
      return {
        ...prevState,
        imageUrl: allMemes[Math.floor(Math.random() * allMemes.length)].url,
      };
    });
  }

  return (
    <main>
      <div className="meme--form">
        <input
          type="text"
          placeholder="Upper text"
          name="upperText"
          value={meme.upperText}
          onChange={handleText}
        />
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleText}
        />
        <button onClick={handleGetNewImage}>Get new image</button>
      </div>

      <div className="meme">
        <img src={meme.imageUrl} className="meme--image" />
        <h2 className="meme--text top">{meme.upperText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
