
import React from 'react';



export const Text = () => {

  return (

    <div className="relative isolate px-6 lg:px-8">

      {/* Header样式的div，仅作为占位符 */}

      <div className="header" />



      {/* 文字内容区域，放置在Header下方，并添加适当的间距 */}

      <div className="mx-auto max-w-2xl pt-20">

        <style>

          {`

            body, html {

              margin: 0;

              padding: 0;

              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

              background-image: url('https://img.picgo.net/2024/08/09/100001016678588bce22cf558f.md.png');

              background-repeat: repeat;

              background-position: 0 0;

              text-align: center;

              overflow-x: hidden;

            }

            .header {

              position: relative;

              padding: 20px 0;

              background: #fff0f7;

            }

            .header h1, .header h2 {

              margin: 0;

            }

            .date-time {

              position: fixed;

              top: 50%;

              right: 20px;

              transform: translateY(-50%);

              display: flex;

              flex-direction: column;

              align-items: center;

              justify-content: center;

              background: linear-gradient(135deg, #89f7fe, #66a6ff);

              color: #003c82;

              padding: 10px;

              border-radius: 5px;

              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

              writing-mode: vertical-rl;

              text-align: center;

              font-size: 16px;

              line-height: 1.5;

              z-index: 1000;

            }

            .carousel {

              position: relative;

              width: 220px;

              height: 180px;

              margin: 10px;

              border: 2px solid #000;

              overflow: hidden;

            }

            .carousel img {

              width: 220px;

              height: 180px;

              display: none;

            }

            .carousel img.active {

              display: block;

              animation: scaleUp 0.5s ease-in-out;

            }

            .gallery {

              display: flex;

              flex-direction: column;

              align-items: center;

            }

            @keyframes scaleUp {

              from { transform: scale(0.5); }

              to { transform: scale(1); }

            }

            .overlay {

              display: none;

              position: fixed;

              top: 0;

              left: 0;

              right: 0;

              bottom: 0;

              background: rgba(0, 0, 0, 0.5);

              z-index: 90;

            }

            .contact-info {

              background: #343a40;

              color: #fff;

              padding: 20px;

              text-align: center;

              margin-top: 30px;

              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

            }

            .contact-info h2 {

              margin-bottom: 10px;

            }

            .contact-info p {

              margin: 5px 0;

            }

            .contact-info a {

              color: #fff;

              text-decoration: none;

            }

            #waline {

              width: auto;

              height: auto;

              margin: 20px auto;

            }

            #waline:hover {

              box-shadow: 0 4px 8px rgba(0,0,0,0.2);

            }

            .center-content {

              display: flex;

              flex-direction: column;

              align-items: center;

              margin-top: 30px;

            }

            .video-container {

              position: relative;

              width: auto;

              padding-bottom: 56.25%;

              margin: auto;

            }

            .video-container iframe {

              position: absolute;

              top: 0;

              left: 0;

              width: 100%;

              height: 100%;

              border: none;

            }

          `}

        </style>

        <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />

        <div className="header">

          <h1>老吳動物模型手工坊</h1>

          <h2>正宗純手工制造</h2>

        </div>

        <div className="date-time">

          <span>今天是</span>

          <span id="dateTime"></span>

        </div>

        <div className="center-content">

          <div className="carousel">

            <div className="gallery">

              <img src="https://ossk.cc/file/2a4dbce26a0a292ec7b9e.jpg" alt="Image 1" className="active" />

              <img src="https://ossk.cc/file/a549d6369564d95293ec4.jpg" alt="Image 2" />

              <img src="https://ossk.cc/file/e6cf2f8f673b22749c289.jpg" alt="Image 3" />

              <img src="https://ossk.cc/file/4d5f87eb47bbbaab727e5.jpg" alt="Image 4" />

              <img src="https://ossk.cc/file/34b9971cb2ee5a952e708.jpg" alt="Image 5" />

              <img src="https://ossk.cc/file/be42fb1e0b378ea613071.jpg" alt="Image 6" />

            </div>

          </div>

        </div>

        <h2>制作視頻</h2>

        <div style={{ position: 'relative', width: 'auto', height: '0px', paddingBottom: '100.000%' }}>

          <iframe

            allow="fullscreen;autoplay"

            allowFullScreen

            height="25%"

            src="https://streamable.com/e/fzzvlw?autoplay=1"

            width="auto"

            style={{ border: 'none', width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px', overflow: 'hidden' }}

          />

        </div>

        <div id="waline">留言區域</div>

        <div id="article-info">

          當前瀏覽量: <span className="waline-pageview-count" />

        </div>

        <div id="waline"></div>

        <script type="module">

          {`

            import { init } from 'https://unpkg.com/@waline/client@v3/dist/waline.js';

            init({

              el: '#waline',

              serverURL: 'https://message-eight-gules.vercel.app',

              lang: 'zh-TW',

              meta: ['nick'],

              requiredMeta: ['nick'],

              login: 'disable',

              copyright: false,

              pageview: true,

              comment: true,

            });

          `}

        </script>

        <div className="contact-info">

          <h2>聯繫方式</h2>

          <h2>老吳</h2>

          <p><strong>Line:</strong> <a href="https://line.me/ti/p/5001120">5001120</a></p>

        </div>

        <div className="overlay" id="overlay"></div>

      </div>

    </div>

  );

};


<script>

  {`

    function updateDateTime() {

      const now = new Date();

      const year = now.getFullYear();

      const month = (now.getMonth() + 1).toString().padStart(2, '0');

      const day = now.getDate().toString().padStart(2, '0');

      const hours = now.getHours().toString().padStart(2, '0');

      const minutes = now.getMinutes().toString().padStart(2, '0');

      const seconds = now.getSeconds().toString().padStart(2, '0');

      document.getElementById('dateTime').textContent = \`\{year}-\{month}-\{day} \{hours}:\{minutes}:\{seconds}\`;

    }

    setInterval(updateDateTime, 1000);

    updateDateTime();



    let expandedImg = null;

    const overlay = document.getElementById('overlay');



    document.querySelectorAll('.carousel img').forEach(img => {

      img.addEventListener('click', function() {

        if (expandedImg === this) {

          this.classList.remove('expanded');

          expandedImg = null;

          overlay.style.display = 'none';

        } else {

          if (expandedImg) {

            expandedImg.classList.remove('expanded');

          }

          this.classList.add('expanded');

          expandedImg = this;

          overlay.style.display = 'block';

          this.style.position = 'fixed';

          this.style.top = '50%';

          this.style.left = '50%';

          this.style.transform = 'translate(-50%, -50%) scale(2)';

          this.style.zIndex = '100';

          this.style.pointerEvents = 'none';

        }

      });

    });



    overlay.addEventListener('click', function() {

      if (expandedImg) {

        expandedImg.classList.remove('expanded');

        expandedImg.style.transform = '';

        expandedImg.style.position = '';

        expandedImg.style.top = '';

        expandedImg.style.left = '';

        expandedImg.style.zIndex = '';

        expandedImg.style.pointerEvents = '';

        expandedImg = null;

        overlay.style.display = 'none';

      }

    });



    var images = document.querySelectorAll('.carousel img');

    let intervalId;



    function cycle() {

      var current = document.querySelector('.carousel img.active');

      if (current) current.classList.remove('active');

      var nextIndex = Array.from(images).indexOf(current) + 1;

      images[nextIndex % images.length].classList.add('active');

    }



    intervalId = setInterval(cycle, 8000);



    overlay.addEventListener('click', function() {

      clearInterval(intervalId);

      cycle(); // 恢复轮播

      intervalId = setInterval(cycle, 8000);

    });



    images.forEach(function(img, index) {

      img.addEventListener('click', function() {

        clearInterval(intervalId); // 停止轮播

      });

    });

  `}

</script>
