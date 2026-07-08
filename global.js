const spiderSVG = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
     <path d="M405.513,279.308c0.699-5.86,1.068-11.783,1.068-17.743c0-5.978-0.355-11.9-1.038-17.748
     c57.065-7.674,101.212-56.684,101.212-115.818c0-9.22-7.475-16.696-16.696-16.696S473.365,118.78,473.365,128
     c0,43.318-33.169,79.025-75.441,83.083c-5.677-15.944-14.068-30.859-24.933-44.178c40.044-18.941,66.983-59.755,66.983-105.689
     c0-9.22-7.475-16.696-16.696-16.696s-16.696,7.475-16.696,16.696c0,37.334-24.887,69.95-60.139,80.177
     c-21.418-16.092-46.622-26.096-73.426-29.113V16.696c0-9.22-7.475-16.696-16.696-16.696c-9.22,0-16.696,7.475-16.696,16.696
     v95.541c-27.412,3.044-52.621,13.486-73.58,29.288c-35.509-10.069-60.628-42.803-60.628-80.307c0-9.22-7.475-16.696-16.696-16.696
     c-9.22,0-16.696,7.475-16.696,16.696c0,46.13,27.171,87.096,67.497,105.928c-10.566,13.045-18.994,27.886-24.75,43.991
     C72.171,207.406,38.635,171.556,38.635,128c0-9.22-7.475-16.696-16.696-16.696S5.244,118.78,5.244,128
     c0,59.356,44.479,108.518,101.858,115.908c-0.681,5.793-1.043,11.684-1.043,17.657c0,5.968,0.349,11.861,1.028,17.658
     C49.717,286.62,5.244,335.779,5.244,395.13c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696
     c0-43.543,33.517-79.387,76.103-83.134c5.728,16.094,14.123,30.957,24.691,44.032c-40.276,18.854-67.403,59.791-67.403,105.885
     c0,9.22,7.475,16.696,16.696,16.696c9.22,0,16.696-7.475,16.696-16.696c0-37.461,25.059-70.165,60.503-80.274
     c4.912,3.702,10.065,7.109,15.432,10.199c-5.546,11.341-8.51,23.88-8.51,36.684c0,46.03,37.448,83.478,83.478,83.478
     s83.478-37.448,83.478-83.478c0-12.799-2.962-25.334-8.505-36.671c5.246-3.03,10.33-6.397,15.231-10.089
     c35.209,10.253,60.056,42.848,60.056,80.151c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696
     c0-45.927-26.931-86.736-66.965-105.681c10.745-13.26,19.123-28.223,24.822-44.192c42.317,4.015,75.534,39.74,75.534,83.091
     c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696C506.756,335.987,462.594,286.97,405.513,279.308z M256.32,478.609
     c-27.618,0-50.087-22.469-50.087-50.087c0-8.19,2.009-16.201,5.772-23.347c14.831,4.559,29.255,6.594,44.235,6.594
     c15.288,0,30.204-2.231,44.403-6.576c3.758,7.14,5.764,15.146,5.764,23.329C306.407,456.14,283.938,478.609,256.32,478.609z
     M242.977,377.675c-59.024-6.764-103.526-56.669-103.526-116.109c0-64.431,52.405-116.85,116.832-116.87
     c64.465,0.299,116.907,52.719,116.907,116.87C373.19,329.681,314.774,385.209,242.977,377.675z"/>
</svg>`;

function spawnSpider() {
     const spider = document.createElement('div');
     spider.className = 'spider';
     spider.innerHTML = spiderSVG;
     document.body.appendChild(spider);

     // Pick a random edge to start from: 0=left, 1=right, 2=top, 3=bottom
     const edge = Math.floor(Math.random() * 4);
     const vw = window.innerWidth;
     const vh = window.innerHeight;

     let startX, startY, endX, endY;

     if (edge === 0) { // from left
          startX = -50; startY = Math.random() * vh;
          endX = vw + 50; endY = Math.random() * vh;
     } else if (edge === 1) { // from right
          startX = vw + 50; startY = Math.random() * vh;
          endX = -50; endY = Math.random() * vh;
     } else if (edge === 2) { // from top
          startX = Math.random() * vw; startY = -50;
          endX = Math.random() * vw; endY = vh + 50;
     } else { // from bottom
          startX = Math.random() * vw; startY = vh + 50;
          endX = Math.random() * vw; endY = -50;
     }

     spider.style.left = startX + 'px';
     spider.style.top = startY + 'px';

     const duration = 6000 + Math.random() * 6000; // 6-12s walk
     const startTime = performance.now();

     function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + (endY - startY) * progress;

          spider.style.left = currentX + 'px';
          spider.style.top = currentY + 'px';

          // slight rotation toward direction of travel
          const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
          spider.style.transform = `rotate(${angle + 90}deg)`;

          if (progress < 1) {
               requestAnimationFrame(animate);
          } else {
               spider.remove();
          }
     }

     requestAnimationFrame(animate);
}

function scheduleNextSpider() {
     const delay = 3000 + Math.random() * 7000; // spawn every 3-10s randomly
     setTimeout(() => {
          spawnSpider();
          scheduleNextSpider();
     }, delay);
}

scheduleNextSpider();