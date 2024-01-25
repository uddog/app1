//img slider
async function fetchImageSources() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=0';

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

async function fetchProfileData() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=0';

    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').map(row => row.split(','));

        const profileSection = document.getElementById("profileSection");

        // Start from index 1 to skip the header row
        rows.slice(1).forEach(row => {
            // Check if the profile data is empty
            const isProfileEmpty = row.slice(1, 4).every(cell => cell.trim() === '');

            if (!isProfileEmpty) {
                const profileDiv = document.createElement("div");
                profileDiv.classList.add("profile");

                // Column E contains the href (link) for the profile
                if (row[4].trim() !== '') {
                    const profileLink = document.createElement("a");
                    profileLink.href = row[4].trim();

                    // Column B contains the image URL
                    if (row[1].trim() !== '') {
                        const profileImage = document.createElement("img");
                        profileImage.src = row[1].trim();
                        profileLink.appendChild(profileImage);
                    }

                    // Column C contains the profile name
                    if (row[2].trim() !== '') {
                        const profileName = document.createElement("h3");
                        profileName.textContent = row[2].trim();
                        profileLink.appendChild(profileName);
                    }

                    // Column D contains the profile details
                    if (row[3].trim() !== '') {
                        const profileDetails = document.createElement("p");
                        profileDetails.textContent = row[3].trim();
                        profileLink.appendChild(profileDetails);
                    }

                    profileDiv.appendChild(profileLink);
                    profileSection.appendChild(profileDiv);
                }
            }
        });
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

// Call the function to fetch and display profile data
fetchProfileData();

