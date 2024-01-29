/// img slider
async function fetchImageSources() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=0';

    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').map(row => row.split(','));

        const imageSlider = document.getElementById("imageSlider");

        // Start from index 1 to skip the first row
        const imgDataArray = rows.slice(1).map(row => ({
            src: row[0].trim(),
            href: row[1] ? row[1].trim() : null
        })).filter(imgData => imgData.src !== "");

        imgDataArray.forEach(imgData => {
            const imgElement = document.createElement("img");
            
            // Check if there is a valid href link
            if (imgData.href) {
                imgElement.setAttribute("data-href", imgData.href);
                imgElement.addEventListener("click", handleImgClick);
                imgElement.style.cursor = "pointer";
            }

            imgElement.src = imgData.src;
            imageSlider.appendChild(imgElement);
        });

        initImageSlider();
    } catch (error) {
        console.error('Error fetching image sources:', error);
    }
}

function handleImgClick() {
    const href = this.getAttribute("data-href");
    if (href) {
        window.location.href = href;
    }
}

// ... (rest of the code remains unchanged)


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
    }, 4000);  //time
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
    }, 4000);
}

fetchImageSources();






// 4 box
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
            const isProfileEmpty = row.slice(1, 5).every(cell => cell.trim() === '');

            if (!isProfileEmpty) {
                const profileDiv = document.createElement("div");
                profileDiv.classList.add("profile");

                // Column F contains the href (link) for the profile
                const hrefValue = row[5].trim();
                if (hrefValue !== '') {
                    const profileLink = document.createElement("a");
                    profileLink.href = hrefValue;

                    // Column C contains the image URL
                    if (row[2].trim() !== '') {
                        const profileImage = document.createElement("img");
                        profileImage.src = row[2].trim();
                        profileLink.appendChild(profileImage);
                    }

                    // Column D contains the profile name
                    if (row[3].trim() !== '') {
                        const profileName = document.createElement("h3");
                        profileName.textContent = row[3].trim();
                        profileLink.appendChild(profileName);
                    }

                    // Column E contains the profile details
                    if (row[4].trim() !== '') {
                        const profileDetails = document.createElement("p");
                        profileDetails.textContent = row[4].trim();
                        profileLink.appendChild(profileDetails);

                        profileDiv.appendChild(profileLink);
                        profileSection.appendChild(profileDiv);
                    }
                } else {
                    // If href is empty, create profile without anchor tag
                    // Column C contains the image URL
                    if (row[2].trim() !== '') {
                        const profileImage = document.createElement("img");
                        profileImage.src = row[2].trim();
                        profileDiv.appendChild(profileImage);
                    }

                    // Column D contains the profile name
                    if (row[3].trim() !== '') {
                        const profileName = document.createElement("h3");
                        profileName.textContent = row[3].trim();
                        profileDiv.appendChild(profileName);
                    }

                    // Column E contains the profile details
                    if (row[4].trim() !== '') {
                        const profileDetails = document.createElement("p");
                        profileDetails.textContent = row[4].trim();
                        profileDiv.appendChild(profileDetails);
                    }

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


//for post
const csvDataURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv';

async function fetchAndDisplayData() {
    try {
        const response = await fetch(csvDataURL);
        const csvData = await response.text();
        displayData(csvData);
    } catch (error) {
        console.error('Error fetching CSV data:', error);
    }
}

function displayData(csv) {
    const rows = csv.split('\n');
    const profilesContainer = document.getElementById('csvData');

    const startIndex = Math.max(0, rows.length - 3);

    for (let i = startIndex; i < rows.length; i++) {
        const columns = rows[i].split(',');

        const profileImageSrc = columns[7].trim();
        if (profileImageSrc) {
            const profileDiv = document.createElement('div');
            profileDiv.classList.add('threecontent'); // Class name 'profile'

            const profileImage = document.createElement('img');
            profileImage.src = profileImageSrc;
            profileImage.alt = 'Profile Image';
            profileDiv.appendChild(profileImage);

            const nameElement = document.createElement('h3');
            nameElement.textContent = columns[8].trim();
            profileDiv.appendChild(nameElement);

            for (let j = 9; j < columns.length; j++) {
                const columnContent = columns[j].trim();
                if (columnContent) {
                    const element = document.createElement(j === 10 ? 'button' : 'p');
                    if (j === 10) {
                        element.textContent = 'Visit';
                        element.addEventListener('click', function () {
                            window.location.href = columnContent;
                        });
                    } else {
                        element.textContent = columnContent;
                    }
                    profileDiv.appendChild(element);
                }
            }

            profilesContainer.appendChild(profileDiv);
        }
    }
}

fetchAndDisplayData();

