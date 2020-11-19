import React, { useState, useEffect } from 'react';
import mainImg from "../assets/IMG_20200215_123255.png";
import Dot from "../components/dot";
import { TweenLite } from 'gsap';

const maxRadius = 50;


const Home = () => {

   const [mouse, setMouse] = useState({ x: 0, y: 0 });
   const cRef = React.useRef();
   const requestRef = React.useRef();


   useEffect(() => {
      let listener = e => { setMouse({ x: e.clientX, y: e.clientY })};
      document.addEventListener('mousemove', listener);

      return () => {
         document.removeEventListener('mousemove', listener);
      }
   }, [mouse]);

   useEffect(() => {
      const image = new Image();
      // image.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35418/charizard.png";
      image.src = mainImg;
      image.crossOrigin = "Anonymous";

      const canvas = cRef.current;
      const c = canvas.getContext('2d');

      
      image.onload = () => {

         c.drawImage(image, 0, 0, canvas.width, canvas.height);
         const imageData = c.getImageData(0, 0, image.naturalWidth, image.naturalHeight).data;
         const pixels = [];
         let dots = [];

         for (let i = 0; i < imageData.length; i += 4) {
            if (imageData[i] === 0) continue
            const x = (i / 4) % image.naturalWidth
            const y = Math.floor(Math.floor(i / image.naturalWidth) / 4)
            if (x % 5 === 0 && y % 5 === 0) {

               pixels.push({
                  x,
                  y,
                  r: imageData[i],
                  g: imageData[i + 1],
                  b: imageData[i + 2]
               })
            }
         }

         pixels.forEach((pixel, i) => {
            const imgX = pixel.x
            const imgY = pixel.y
            dots.push(new Dot(imgX, imgY, pixel.r, pixel.g, pixel.b))
         })

         const animate = () => { 
            const canvas = cRef.current;
            const c = canvas.getContext('2d');
            c.clearRect(0, 0, window.innerWidth, window.innerHeight)
            dots.forEach(dot => {
               if (mouse.x - dot.x < 50 && mouse.x - dot.x > -50 && mouse.y - dot.y < 50 && mouse.y - dot.y > -50) {
                  if (dot.radius < maxRadius) {
                    dot.radius += 10;
                  }
                }
                else if (dot.radius > dot.minRadius) {
                  dot.radius -= 1;
                }
                dot.draw(c);
            })
             requestRef.current = requestAnimationFrame(animate);
      
            return () => {
               cancelAnimationFrame(requestRef.current);
            }
         };

         animate();

         
      }
   }, [mouse]);

   return (
      <>
         <canvas ref={cRef} width={window.innerWidth} height={window.innerHeight} />
      </>
   )
};
export default Home;