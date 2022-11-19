import { useEffect, useState } from "react";
import axios from "axios";
import "./Test01.css";

function Pic({ src, alt }) {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
}

function Test01() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPicture = async () => {
      try {
        const res = await axios.get("https://picsum.photos/v2/list");
        setPictures(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPicture();
  }, []);

  return (
    <div className="test01-container">
      <div className="remark">
        <h1>
          <span>Remark</span>: Since it cannot set the width of each image to
          its aspect ratio while having gutter consistently at 4px and images
          are aligned on left and right edges.
        </h1>
        <h1>
          So I decide to vary width of the image to make the overview to be
          similar to example.
        </h1>
      </div>
      <h1>Everyone's Photos</h1>
      <div className="pic-container">
        {pictures.map((pic) => (
          <Pic src={pic.download_url} alt={`author: ${pic.author}`} />
        ))}
      </div>
    </div>
  );
}

export default Test01;
