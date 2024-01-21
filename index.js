//img slider
async function fetchImageSources() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv&gid=1135667925';

    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').map(row => row.split(','));

        const imageSlider = document.getElementById("imageSlider");

        // Start from index 1 to skip the first row
        const imgSrcArray = rows.slice(1).map(row => row[0].trim()).filter(src => src !== "");

        imgSrcArray.forEach(imgSrc => {
            const imgElement = document.createElement("img");
            imgElement.src = imgSrc;
            imageSlider.appendChild(imgElement);
        });

        initImageSlider();
    } catch (error) {
        console.error('Error fetching image sources:', error);
    }
}

let touchStartX = 0;
let touchEndX = 0;
let isTouching = false;

function handleTouchStart(event) {
    isTouching = true;
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    isTouching = false;
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const sensitivity = 50; // Adjust this value as needed

    if (deltaX > sensitivity) {
        // Swipe right, move to the previous slide
        pauseSlider();
        slide(-1);
        resumeSlider();
    } else if (deltaX < -sensitivity) {
        // Swipe left, move to the next slide
        pauseSlider();
        slide(1);
        resumeSlider();
    }
}

let sliderInterval;
let counter = 0;

function initImageSlider() {
    const sliderContainer = document.getElementById("imageSliderContainer");
    const slider = document.getElementById("imageSlider");

    sliderContainer.addEventListener("touchstart", handleTouchStart);
    sliderContainer.addEventListener("touchend", handleTouchEnd);

    sliderInterval = setInterval(() => {
        if (!isTouching) {
            slide(1);
        }
    }, 2000);
}

function slide(direction) {
    if (direction === 1 && counter >= imageSlider.children.length - 1) {
        counter = 0;
    } else if (direction === -1 && counter <= 0) {
        counter = imageSlider.children.length - 1;
    } else {
        counter += direction;
    }

    imageSlider.style.transition = "transform 0.5s ease-in-out";
    imageSlider.style.transform = `translateX(${-counter * 100}%)`;
}

function pauseSlider() {
    clearInterval(sliderInterval);
}

function resumeSlider() {
    sliderInterval = setInterval(() => {
        if (!isTouching) {
            slide(1);
        }
    }, 2000);
}

fetchImageSources();

