import Swiper from 'swiper';
import './App.css';

function App() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((navItem, i) => {
    navItem.addEventListener("click", () => {
      navItems.forEach((item, j) => {
        item.className = "nav-item";
      });
      navItem.className = "nav-item active";
    });
  });

  const containers = document.querySelectorAll(".containers");

  containers.forEach((container) => {
    let isDragging = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const x = e.pageX - container.offsetLeft;
      const step = (x - startX) * 0.6;
      container.scrollLeft = scrollLeft - step;
    });

    container.addEventListener("mouseup", () => {
      isDragging = false;
    });

    container.addEventListener("mouseleave", () => {
      isDragging = false;
    });
  });

  const progress = document.getElementById("progress");
  const song = document.getElementById("song");
  const controlIcon = document.getElementById("controlIcon");
  const playPauseButton = document.querySelector(".play-pause-btn");
  const forwardButton = document.querySelector(".controls button.forward");
  const backwardButton = document.querySelector(".controls button.backward");
  const rotatingImage = document.getElementById("rotatingImage");
  const songName = document.querySelector(".music-player h2");
  const artistName = document.querySelector(".music-player p");

  let rotating = false;
  let currentRotation = 0;
  let rotationInterval;

  const songs = [
    {
      title: "Redemption",
      name: "Besomorph & Coopex",
      source:
        "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Besomorph-Coopex-Redemption.mp3",
      cover:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/398875d0-9b9e-494a-8906-210aa3f777e0",
    },
    {
      title: "What's The Problem?",
      name: "OSKI",
      source:
        "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/OSKI-Whats-The-Problem.mp3",
      cover:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/810d1ddc-1168-4990-8d43-a0ffee21fb8c",
    },
    {
      title: "Control",
      name: "Unknown Brain x Rival",
      source:
        "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Unknown-BrainxRival-Control.mp3",
      cover:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
    },
  ];

  let currentSongIndex = 0;

  function startRotation() {
    if (!rotating) {
      rotating = true;
      rotationInterval = setInterval(rotateImage, 50);
    }
  }

  function pauseRotation() {
    clearInterval(rotationInterval);
    rotating = false;
  }

  function rotateImage() {
    currentRotation += 1;
    rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
  }

  function updateSongInfo() {
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;
    rotatingImage.src = songs[currentSongIndex].cover;

    song.addEventListener("loadeddata", function () { });
  }

  song.addEventListener("loadedmetadata", function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
  });

  song.addEventListener("ended", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
  });

  song.addEventListener("timeupdate", function () {
    if (!song.paused) {
      progress.value = song.currentTime;
    }
  });

  function playPause() {
    if (song.paused) {
      song.play();
      controlIcon.classList.add("fa-pause");
      controlIcon.classList.remove("fa-play");
      startRotation();
    } else {
      song.pause();
      controlIcon.classList.remove("fa-pause");
      controlIcon.classList.add("fa-play");
      pauseRotation();
    }
  }

  playPauseButton.addEventListener("click", playPause);

  progress.addEventListener("input", function () {
    song.currentTime = progress.value;
  });

  progress.addEventListener("change", function () {
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
    startRotation();
  });

  forwardButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
  });

  backwardButton.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    playPause();
  });

  updateSongInfo();

  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    speed: 600,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 10,
      stretch: 120,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    on: {
      click(event) {
        swiper.slideTo(this.clickedIndex);
      },
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
  return (
    <main>
      <nav className="main-menu">
        <div>
          <div className="user-info">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/user-9402915-7655843.png?f=webp"
              alt="user"
            />
            <p>User</p>
          </div>
          <ul>
            <li className="nav-item active">
              <a href="#">
                <i className="fa fa-map nav-icon" />
                <span className="nav-text">Discover</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <i className="fa fa-arrow-trend-up nav-icon" />
                <span className="nav-text">Trending</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <i className="fa fa-compact-disc nav-icon" />
                <span className="nav-text">Album</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <i className="fa fa-circle-play nav-icon" />
                <span className="nav-text">Playlist</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#">
                <i className="fa fa-heart nav-icon" />
                <span className="nav-text">Favorites</span>
              </a>
            </li>
          </ul>
        </div>
        <ul>
          <li className="nav-item">
            <a href="#">
              <i className="fa fa-user nav-icon" />
              <span className="nav-text">Account</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <i className="fa fa-gear nav-icon" />
              <span className="nav-text">Settings</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <i className="fa fa-right-from-bracket nav-icon" />
              <span className="nav-text">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
      <section className="content">
        <div className="left-content">
          <div className="slider-container">
            <h1>Popular Playlist</h1>
            <div className="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/95b52c32-f5da-4fe6-956d-a5ed118bbdd2" />
                  <div className="slide-overlay">
                    <h2>Midnight Moods</h2>
                    <button>
                      Listen Now <i className="fa-solid fa-circle-play" />
                    </button>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6ddf81f5-2689-4f34-bf80-a1e07f14621c" />
                  <div className="slide-overlay">
                    <h2>Party Starters</h2>
                    <button>
                      Listen Now <i className="fa-solid fa-circle-play" />
                    </button>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ab52d9d0-308e-43e0-a577-dce35fedd2a3" />
                  <div className="slide-overlay">
                    <h2>Relaxing Tones</h2>
                    <button>
                      Listen Now <i className="fa-solid fa-circle-play" />
                    </button>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/20c8fdd5-9f4a-4917-ae90-0239a52e8334" />
                  <div className="slide-overlay">
                    <h2>Smooth Jazz Journey</h2>
                    <button>
                      Listen Now <i className="fa-solid fa-circle-play" />
                    </button>
                  </div>
                </div>
                <div className="swiper-slide">
                  <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/df461a99-2fb3-4d55-ac16-2e0c6dd783e1" />
                  <div className="slide-overlay">
                    <h2>Uplifting Rhythms</h2>
                    <button>
                      Listen Now <i className="fa-solid fa-circle-play" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
          <div className="artists">
            <h1>Featured Artists</h1>
            <div className="artist-container containers">
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/c8feaa0f-6ae7-4c69-bb7d-4a11de76b4f5"
                  alt=""
                />
                <p>Taylor Swift</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/bf80314e-5a02-4702-bb64-eae8c113c417"
                  alt=""
                />
                <p>The Weeknd</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e4576af8-0e84-4343-8f90-7a01acb9c8b7"
                  alt=""
                />
                <p>Dua Lipa</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d8eb2888-1e74-4117-82d7-833ad29e3cc1"
                  alt=""
                />
                <p>Jimin</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/f23adc16-11d7-41dc-af6a-191e03a81603"
                  alt=""
                />
                <p>Alicia Keys</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/f511c102-3217-4bea-bede-8be23b969bd8"
                  alt=""
                />
                <p>Maroon 5</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/9a8bd237-b525-43e6-a37c-daaac39db8ce"
                  alt=""
                />
                <p>Imagine Dragons</p>
              </div>
              <div className="artist">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/99452c85-26f4-4ccd-b439-7d1bd3875634"
                  alt=""
                />
                <p>Billie Eilish</p>
              </div>
            </div>
          </div>
          {/* <div class="albums">
          <h1>Recommended Albums</h1>
          <div class="album-container containers">
            <div class="album">
              <div class="album-frame">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/74c4f0f9-d73e-4737-83fa-ea4afe392229"
                  alt="" />
              </div>
              <div>
                <h2>Views</h2>
                <p>Drake</p>
              </div>
            </div>
    
            <div class="album">
              <div class="album-frame">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d3a0bac0-fdb4-467e-bdf5-f3f415928f24"
                  alt="" />
              </div>
              <div>
                <h2>Speak Now</h2>
                <p>Taylor Swift</p>
              </div>
            </div>
    
            <div class="album">
              <div class="album-frame">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/85521a12-cc46-4b9f-a742-21ba407ebd5e"
                  alt="" />
              </div>
              <div>
                <h2>Born to Die</h2>
                <p>Lana Del Rey</p>
              </div>
            </div>
    
            <div class="album">
              <div class="album-frame">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/4e7bf466-7fa5-4dad-b628-5bca12833b64"
                  alt="" />
              </div>
              <div>
                <h2>Endless Summer Vacation</h2>
                <p>Miley Cyrus</p>
              </div>
            </div>
    
            <div class="album">
              <div class="album-frame">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/f01f546a-7ab7-4e90-acb9-1c1e817b676d"
                  alt="" />
              </div>
              <div>
                <h2>The Dark Side of The Moon</h2>
                <p>Pink Floyd</p>
              </div>
            </div>
          </div>
        </div> */}
        </div>
        <div className="right-content">
          <div className="recommended-songs">
            <h1 id="heading">Recommended Songs</h1>
            <div className="song-container">
              <div className="song">
                <div className="song-img">
                  <img
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ea61baa7-9c4b-4f43-805e-81de5fc8aa2b"
                    alt=""
                  />
                  <div className="overlay">
                    <i className="fa-solid fa-play" />
                  </div>
                </div>
                <div className="song-title">
                  <h2>Blank Space</h2>
                  <p>Taylor Swift</p>
                </div>
                <span>4:33</span>
              </div>
              {/* <div class="song">
              <div class="song-img">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/6f72f702-c049-46fe-af76-a3b188b9a909"
                  alt="" />
                <div class="overlay">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>
              <div class="song-title">
                <h2>One Dance</h2>
                <p>Drake</p>
              </div>
              <span>4:03</span>
            </div>
    
            <div class="song">
              <div class="song-img">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/ad2e664a-3ab9-4f30-933a-623e26999030"
                  alt="" />
                <div class="overlay">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>
              <div class="song-title">
                <h2>Pawn It All</h2>
                <p>Alicia Keys</p>
              </div>
              <span>3:10</span>
            </div> */}
              {/* <div class="song">
              <div class="song-img">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/666e065b-eb53-4320-a580-30e266370955"
                  alt="" />
                <div class="overlay">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>
              <div class="song-title">
                <h2>Lose Control</h2>
                <p>Teddy Swims</p>
              </div>
              <span>3:30</span>
            </div> */}
              {/* <div class="song">
              <div class="song-img">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/619ed17f-5df2-4d32-a419-78f120a1aa5c"
                  alt="" />
                <div class="overlay">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>
              <div class="song-title">
                <h2>Be The One</h2>
                <p>Dua Lipa</p>
              </div>
              <span>3:24</span>
            </div> */}
              {/* <div class="song">
              <div class="song-img">
                <img
                  src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/0ed3f51d-b769-4256-a4dd-8f35b12a1690"
                  alt="" />
                <div class="overlay">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>
              <div class="song-title">
                <h2>Delicate</h2>
                <p>Taylor Swift</p>
              </div>
              <span>3:54</span>
            </div> */}
              <div className="song">
                <div className="song-img">
                  <img
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/33779e1a-55f9-402a-b004-002395d0fbf1"
                    alt=""
                  />
                  <div className="overlay">
                    <i className="fa-solid fa-play" />
                  </div>
                </div>
                <div className="song-title">
                  <h2>Last Christmas</h2>
                  <p>Wham!</p>
                </div>
                <span>4:39</span>
              </div>
              <div className="song">
                <div className="song-img">
                  <img
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/96bc0648-51f9-46ab-a426-766c6bc93d80"
                    alt=""
                  />
                  <div className="overlay">
                    <i className="fa-solid fa-play" />
                  </div>
                </div>
                <div className="song-title">
                  <h2>Paradise</h2>
                  <p>Coldplay</p>
                </div>
                <span>4:20</span>
              </div>
              <div className="song">
                <div className="song-img">
                  <img
                    src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/885b67a7-1816-4235-9dd3-5d879a202728"
                    alt=""
                  />
                  <div className="overlay">
                    <i className="fa-solid fa-play" />
                  </div>
                </div>
                <div className="song-title">
                  <h2>Easy On Me</h2>
                  <p>Adele</p>
                </div>
                <span>3:45</span>
              </div>
            </div>
          </div>
          <div className="music-player">
            <div className="album-cover">
              <img src="images/album-cover.png" id="rotatingImage" alt="" />
              <span className="point" />
            </div>
            <h2>Redemption</h2>
            <p>Besomorph &amp; Coopex</p>
            <audio id="song">
              <source src="Besomorph-Coopex-Redemption.mp3" type="audio/mpeg" />
            </audio>
            <input type="range" defaultValue={0} id="progress" />
            <div className="controls">
              <button className="backward">
                <i className="fa-solid fa-backward" />
              </button>
              <button className="play-pause-btn">
                <i className="fa-solid fa-play" id="controlIcon" />
              </button>
              <button className="forward">
                <i className="fa-solid fa-forward" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

  );
}

export default App;
