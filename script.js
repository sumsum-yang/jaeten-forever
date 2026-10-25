
const homeScreen = document.getElementById("home");
const appView = document.getElementById("appView");
const appContent = document.getElementById("appContent");
const backButton = document.getElementById("back");

const photos = [
  { src: "cover.jpg", caption: "A little piece of happiness." },
  { src: "cover.jpg", caption: "A moment worth keeping." },
  { src: "cover.jpg", caption: "One of my favorite views." },
  { src: "cover.jpg", caption: "A memory for a quiet day." }
];

const posts = [
  {
    src: "cover.jpg",
    caption: "somewhere in my favorite little universe ♡",
    likes: 128
  },
  {
    src: "cover.jpg",
    caption: "collecting moments, not things.",
    likes: 86
  }
];

const chats = [
  { name: "My favorite person", preview: "Have a lovely day ♡", avatar: "♡" },
  { name: "Little diary", preview: "See you in my dreams.", avatar: "✳" }
];

const songs = [
  { title: "A Little Love", artist: "Your imaginary playlist" },
  { title: "Quiet Moments", artist: "Your imaginary playlist" },
  { title: "Stay Awhile", artist: "Your imaginary playlist" }
];

let currentSong = 0;
let isPlaying = false;
let progressTimer = null;
let progress = 0;

function openApp(appName) {
  stopProgress();

  homeScreen.classList.add("hidden");
  appView.classList.remove("hidden");

  if (appName === "gallery") showGallery();
  if (appName === "instagram") showInstagram();
  if (appName === "line") showChats();
  if (appName === "spotify") showSpotify();
}

function showGallery() {
  appContent.innerHTML = `
    <p class="eyebrow">YOUR MEMORIES</p>
    <h2>The Gallery</h2>
    <p>A little collection of moments worth keeping.</p>

    <div class="gallery-grid">
      ${photos.map((photo, index) => `
        <button class="gallery-photo" data-photo-index="${index}">
          <img src="${photo.src}" alt="${photo.caption}">
        </button>
      `).join("")}
    </div>
    <p class="gallery-note">Tap a photo to see it closer.</p>
  `;

  appContent.querySelectorAll("[data-photo-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const photo = photos[Number(button.dataset.photoIndex)];
      showLightbox(photo.src, photo.caption);
    });
  });
}

function showLightbox(src, caption) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close photo">×</button>
    <img class="lightbox-image" src="${src}" alt="${caption}">
    <p class="lightbox-caption">${caption}</p>
  `;

  document.body.appendChild(lightbox);

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
    lightbox.remove();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.remove();
  });
}

function showInstagram() {
  appContent.innerHTML = `
    <div class="mock-instagram">
      <div class="mock-app-header">
        <h2>Instagram</h2>
        <span>♡</span>
      </div>

      <button class="profile-link" id="openProfile">
        <span class="profile-avatar">M</span>
        <span>
          <strong>my.little.archive</strong>
          <small>Personal moments</small>
        </span>
        <span class="profile-arrow">→</span>
      </button>

      <div id="instaFeed">
        ${posts.map((post, index) => `
          <article class="insta-post">
            <div class="post-user">
              <span class="mini-avatar">M</span>
              <strong>my.little.archive</strong>
              <span class="post-menu">···</span>
            </div>

            <button class="post-image-button" data-open-post="${index}">
              <img class="post-image" src="${post.src}" alt="Post photo">
            </button>

            <div class="post-actions">
              <button class="like-button" data-like="${index}">♡</button>
              <button class="comment-button" data-comment="${index}">○</button>
              <span>↗</span>
            </div>

            <p class="like-count" id="likes-${index}">
              ${post.likes} likes
            </p>
            <p class="post-caption">
              <strong>my.little.archive</strong> ${post.caption}
            </p>
          </article>
        `).join("")}
      </div>
    </div>
  `;

  appContent.querySelectorAll("[data-like]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.like);
      const liked = button.classList.toggle("liked");
      button.textContent = liked ? "♥" : "♡";
      button.setAttribute("aria-label", liked ? "Unlike post" : "Like post");
      const count = posts[index].likes + (liked ? 1 : 0);
      document.getElementById(`likes-${index}`).textContent = `${count} likes`;
    });
  });

  appContent.querySelectorAll("[data-open-post]").forEach((button) => {
    button.addEventListener("click", () => {
      const post = posts[Number(button.dataset.openPost)];
      appContent.innerHTML = `
        <button class="inner-back" id="backToInsta">← Instagram</button>
        <p class="eyebrow">POST</p>
        <h2>A moment</h2>
        <img class="single-post-image" src="${post.src}" alt="Post photo">
        <p>${post.caption}</p>
      `;
      document.getElementById("backToInsta").addEventListener("click", showInstagram);
    });
  });

  document.getElementById("openProfile").addEventListener("click", showProfile);
}

function showProfile() {
  appContent.innerHTML = `
    <button class="inner-back" id="backToFeed">← Back to feed</button>
    <div class="mock-profile">
      <div class="profile-avatar profile-avatar-large">M</div>
      <h2>my.little.archive</h2>
      <p>A small archive of favorite things.</p>

      <div class="profile-stats">
        <div><strong>${posts.length}</strong><span>posts</span></div>
        <div><strong>128</strong><span>followers</span></div>
        <div><strong>88</strong><span>following</span></div>
      </div>

      <div class="gallery-grid">
        ${posts.map((post) => `
          <img src="${post.src}" alt="${post.caption}">
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("backToFeed").addEventListener("click", showInstagram);
}

function showChats() {
  appContent.innerHTML = `
    <div class="mock-line">
      <div class="mock-app-header">
        <h2>LINE</h2>
        <span>＋</span>
      </div>
      <p class="eyebrow">MESSAGES</p>
      <div class="chat-list">
        ${chats.map((chat, index) => `
          <button class="chat-row" data-chat="${index}">
            <span class="chat-avatar">${chat.avatar}</span>
            <span class="chat-details">
              <strong>${chat.name}</strong>
              <small>${chat.preview}</small>
            </span>
            <span class="chat-chevron">›</span>
          </button>
        `).join("")}
      </div>
      <p class="gallery-note">Your own little simulated chat space.</p>
    </div>
  `;

  appContent.querySelectorAll("[data-chat]").forEach((button) => {
    button.addEventListener("click", () => {
      showChat(Number(button.dataset.chat));
    });
  });
}

function showChat(chatIndex) {
  const chat = chats[chatIndex];
  const messages = chat.messages || [
    { from: "them", text: "Hey! Hope you're having a good day ♡" },
    { from: "me", text: "I hope you are too." }
  ];
  chat.messages = messages;

  appContent.innerHTML = `
    <div class="mock-chat">
      <div class="chat-header">
        <button id="backToChats">←</button>
        <span class="chat-avatar">${chat.avatar}</span>
        <strong>${chat.name}</strong>
      </div>

      <div class="chat-messages" id="chatMessages">
        ${messages.map((message) => `
          <div class="message ${message.from === "me" ? "message-me" : "message-them"}">
            ${escapeHTML(message.text)}
          </div>
        `).join("")}
      </div>

      <form class="chat-input-row" id="chatForm">
        <input id="messageInput" type="text" placeholder="Write a message..." autocomplete="off" required>
        <button type="submit">Send</button>
      </form>
    </div>
  `;

  document.getElementById("backToChats").addEventListener("click", showChats);

  document.getElementById("chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("messageInput");
    const text = input.value.trim();
    if (!text) return;

    chat.messages.push({ from: "me", text });
    showChat(chatIndex);

    const messageBox = document.getElementById("chatMessages");
    messageBox.scrollTop = messageBox.scrollHeight;
    document.getElementById("messageInput").focus();
  });
}

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function showSpotify() {
  const song = songs[currentSong];

  appContent.innerHTML = `
    <div class="mock-spotify">
      <div class="mock-app-header">
        <h2>Spotify</h2>
        <span>♫</span>
      </div>

      <p class="eyebrow">MADE FOR YOU</p>
      <h3 class="playlist-title">Little things,<br>lasting memories.</h3>
      <p class="playlist-description">A playlist for your favorite person.</p>

      <div class="album-art">
        <span>♫</span>
        <small>PERSONAL<br>PLAYLIST</small>
      </div>

      <div class="song-info">
        <div>
          <strong id="songTitle">${song.title}</strong>
          <p id="songArtist">${song.artist}</p>
        </div>
        <span>♡</span>
      </div>

      <input class="music-progress" id="musicProgress"
             type="range" min="0" max="100" value="${progress}"
             aria-label="Song progress">

      <div class="music-times">
        <span id="currentTime">${formatTime(progress * 2.4)}</span>
        <span>04:00</span>
      </div>

      <div class="music-controls">
        <button id="previousSong" aria-label="Previous song">|◀</button>
        <button id="playPause" class="play-button">${isPlaying ? "Ⅱ" : "▶"}</button>
        <button id="nextSong" aria-label="Next song">▶|</button>
      </div>

      <p class="gallery-note">
        Demo player — add an audio file to play real music.
      </p>
    </div>
  `;

  document.getElementById("playPause").addEventListener("click", () => {
    isPlaying = !isPlaying;
    showSpotify();
    if (isPlaying) startProgress();
    else stopProgress();
  });

  document.getElementById("nextSong").addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    progress = 0;
    showSpotify();
    if (isPlaying) startProgress();
  });

  document.getElementById("previousSong").addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    progress = 0;
    showSpotify();
    if (isPlaying) startProgress();
  });

  document.getElementById("musicProgress").addEventListener("input", (event) => {
    progress = Number(event.target.value);
    document.getElementById("currentTime").textContent = formatTime(progress * 2.4);
  });
}

function startProgress() {
  stopProgress();
  progressTimer = setInterval(() => {
    if (!isPlaying || !appView.classList.contains("hidden") === false) {
      progress = (progress + 1) % 101;
      const bar = document.getElementById("musicProgress");
      const time = document.getElementById("currentTime");
      if (bar) bar.value = progress;
      if (time) time.textContent = formatTime(progress * 2.4);
    }
  }, 1000);
}

function stopProgress() {
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

document.querySelectorAll(".app[data-app]").forEach((button) => {
  button.addEventListener("click", () => {
    openApp(button.dataset.app);
  });
});

backButton.addEventListener("click", () => {
  stopProgress();
  isPlaying = false;
  appView.classList.add("hidden");
  homeScreen.classList.remove("hidden");
});
