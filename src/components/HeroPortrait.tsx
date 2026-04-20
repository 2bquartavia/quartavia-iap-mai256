import { useEffect, useState } from "react";
import img1 from "@/assets/adrian.png";
import img2 from "@/assets/hero-trader.jpg";
import img3 from "@/assets/adrian-carvalho.png";

const images = [img1, img2, img3];

export default function HeroPortrait() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero__portrait">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Adrian Carvalho na Mansão Davos"
          className="hero__portrait-img"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
