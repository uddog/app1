const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=0';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// img slider
async function fetchImageSources() {
    const data = await fetchData(csvUrl);

    if (data) {
        const rows = data.split('\n').map(row => row.split(','));

        const imageSlider = document.getElementById("imageSlider");
        const imgDataArray = rows.slice(1).map(row => ({
            src: row[0].trim(),
            href: row[1] ? row[1].trim() : null
        })).filter(imgData => imgData.src !== "");

        imgDataArray.forEach(imgData => {
            const imgElement = document.createElement("img");

            if (imgData.href) {
                imgElement.setAttribute("data-href", imgData.href);
                imgElement.addEventListener("click", handleImgClick);
                imgElement.style.cursor = "pointer";
            }

            imgElement.src = imgData.src;
            imageSlider.appendChild(imgElement);
        });

        initImageSlider();
    }
}
function handleImgClick() {
    const href = this.getAttribute("data-href");
    if (href) {
        window.location.href = href;
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






// 4 box
async function fetchProfileData() {
    const data = await fetchData(csvUrl);

    if (data) {
        const rows = parseCSV(data);

        const profileSection = document.getElementById("profileSection");

        rows.slice(1).forEach(row => {
            const isProfileEmpty = row.slice(2, 5).every(cell => cell.trim() === '');

            if (!isProfileEmpty) {
                const profileDiv = document.createElement("div");
                profileDiv.classList.add("profile");

                const hrefValue = row[5].trim();
                if (hrefValue !== '') {
                    const profileLink = document.createElement("a");
                    profileLink.href = hrefValue;

                    if (row[2].trim() !== '') {
                        const profileImage = document.createElement("img");
                        profileImage.src = row[2].trim();
                        profileLink.appendChild(profileImage);
                    }

                    if (row[3].trim() !== '') {
                        const profileName = document.createElement("h3");
                        profileName.textContent = row[3].trim();
                        profileLink.appendChild(profileName);
                    }

                    if (row[4].trim() !== '') {
                        const profileDetails = document.createElement("p");
                        profileDetails.textContent = row[4].trim();
                        profileLink.appendChild(profileDetails);

                        profileDiv.appendChild(profileLink);
                        profileSection.appendChild(profileDiv);
                    }
                } else {
                    if (row[2].trim() !== '') {
                        const profileImage = document.createElement("img");
                        profileImage.src = row[2].trim();
                        profileDiv.appendChild(profileImage);
                    }

                    if (row[3].trim() !== '') {
                        const profileName = document.createElement("h3");
                        profileName.textContent = row[3].trim();
                        profileDiv.appendChild(profileName);
                    }

                    if (row[4].trim() !== '') {
                        const profileDetails = document.createElement("p");
                        profileDetails.textContent = row[4].trim();
                        profileDiv.appendChild(profileDetails);
                    }

                    profileSection.appendChild(profileDiv);
                }
            }
        });
    }
}

function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const parsedData = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();
        let insideQuotes = false;
        let currentValue = '';
        const parsedRow = [];

        for (let j = 0; j < row.length; j++) {
            const char = row[j];

            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                parsedRow.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }

        parsedRow.push(currentValue); // Push the last cell value
        parsedData.push(parsedRow);
    }

    return parsedData;
}

// Mock fetchData function for testing
async function fetchData(url) {
    // This is a mock function, you should replace it with your actual fetchData implementation
    const response = await fetch(url);
    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('Failed to fetch data');
    }
}

//for post
async function fetchAndDisplayData() {

    const csvPost = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=2089505816';

    const data = await fetchData(csvPost);

    if (data) {
        const rows = parseCSV(data);
        const profilesContainer = document.getElementById('csvData');
        const startIndex = Math.max(0, rows.length - 2);

        for (let i = startIndex; i < rows.length; i++) {
            const columns = rows[i];

            const profileImageSrc = columns[0].trim();
            if (profileImageSrc) {
                const profileDiv = document.createElement('div');
                profileDiv.classList.add('threecontent');

                const profileImage = document.createElement('img');
                profileImage.src = profileImageSrc;
                profileImage.alt = 'Profile Image';
                profileDiv.appendChild(profileImage);

                const nameElement = document.createElement('h3');
                nameElement.textContent = columns[1].trim();
                profileDiv.appendChild(nameElement);

                for (let j = 2; j < columns.length; j++) {
                    const columnContent = columns[j].trim();
                    if (columnContent && j !== 4) {  // Skip column E (index 4)
                        const element = document.createElement(j === 3 ? 'button' : 'p');
                        if (j === 3) {
                            element.textContent = 'Details';
                            element.addEventListener('click', function () {
                                localStorage.setItem('PostNo', i);
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
}

function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const parsedData = [];

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i].trim();
        let insideQuotes = false;
        let currentValue = '';
        const parsedRow = [];

        for (let j = 0; j < row.length; j++) {
            const char = row[j];

            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                parsedRow.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }

        parsedRow.push(currentValue); // Push the last cell value
        parsedData.push(parsedRow);
    }

    return parsedData;
}

// Mock fetchData function for testing
async function fetchData(url) {
    // This is a mock function, you should replace it with your actual fetchData implementation
    const response = await fetch(url);
    if (response.ok) {
        return await response.text();
    } else {
        throw new Error('Failed to fetch data');
    }
}

// Call fetchAndDisplayData function


// Call the functions
fetchImageSources();
fetchProfileData();
fetchAndDisplayData();

//animation

document.addEventListener("DOMContentLoaded", function(event) { 
    // Function to handle scroll animation
    function handleScrollAnimation(elements) {
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
          element.classList.add('animate');
        } else {
          element.classList.remove('animate');
        }
      });
    }

    // Select elements to animate (you can pass any CSS selector to this function)
    function animateOnScroll(selector) {
      const elements = document.querySelectorAll(selector);
      handleScrollAnimation(elements);

      // Add scroll event listener
      window.addEventListener('scroll', function() {
        handleScrollAnimation(elements);
      });
    }

    // Example usage: animate list items inside .udop class
    animateOnScroll('.udop li');

  });

  
