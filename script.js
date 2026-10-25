
const homeScreen = document.getElementById("home");
const appView = document.getElementById("appView");
const appContent = document.getElementById("appContent");
const backButton = document.getElementById("back");

const apps = {
  gallery: {
    title: "The Archive",
    description: "A collection of favorite moments.",
    content: `
      <div class="gallery-grid">
        <button class="gallery-photo" data-photo="cover.jpg">
          <img src="cover.jpg" alt="Favorite view">
        </button>
      </div>
      <p class="gallery-note">
        More memories will be added here.
      </p>
    `
  }
};

function openApp(appName) {
  const app = apps[appName];

  if (!app) return;

  appContent.innerHTML = `
    <p class="eyebrow">PERSONAL ARCHIVE</p>
    <h2>${app.title}</h2>
    <p>${app.description}</p>
    ${app.content}
  `;

  homeScreen.classList.add("hidden");
  appView.classList.remove("hidden");

  appContent.querySelectorAll("[data-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      const imagePath = button.dataset.photo;
      const image = document.createElement("img");

      image.src = imagePath;
      image.alt = "Gallery photo";
      image.className = "lightbox-image";

      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.setAttribute("role", "button");
      lightbox.setAttribute("tabindex", "0");
      lightbox.setAttribute("aria-label", "Close photo");

      lightbox.appendChild(image);
      document.body.appendChild(lightbox);

      function closeLightbox() {
        lightbox.remove();
      }

      lightbox.addEventListener("click", closeLightbox);
      lightbox.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          closeLightbox();
        }
      });
    });
  });
}

document.querySelectorAll(".app[data-app]").forEach((button) => {
  button.addEventListener("click", () => {
    openApp(button.dataset.app);
  });
});

backButton.addEventListener("click", () => {
  appView.classList.add("hidden");
  homeScreen.classList.remove("hidden");
});

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 24px;
}

.gallery-photo {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  background: #eeeeee;
  cursor: pointer;
}

.gallery-photo img {
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

.gallery-note {
  margin-top: 18px;
  color: #888888;
  font-size: 12px;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(0 0 0 / 88%);
  cursor: zoom-out;
}

.lightbox-image {
  display: block;
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}
