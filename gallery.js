const images = document.querySelectorAll(".gallery-item img");
const titles = document.querySelectorAll(".gallery-item h4");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");

const closeBtn = document.getElementById("closeLightbox");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;


images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();

        lightbox.classList.add("active");
        document.body.classList.add("no-scroll");
    });
});


function showImage() {
    lightboxImg.src = images[currentIndex].src;
    lightboxTitle.textContent = titles[currentIndex].textContent;
}


nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});