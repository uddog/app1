// Check if data needs to be updated based on a predefined interval (e.g., 1 hour)
const updateInterval = 10*60000; 

function shouldUpdateData(lastUpdated) {
    return !lastUpdated || Date.now() - lastUpdated > updateInterval;
}

// Fetch data with caching mechanism
async function fetchDataWithCache(url) {
    const cachedData = localStorage.getItem(url);
    const lastUpdated = localStorage.getItem(`${url}_lastUpdated`);

    if (cachedData && !shouldUpdateData(lastUpdated)) {
        return cachedData;
    }

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.text();
            localStorage.setItem(url, data);
            localStorage.setItem(`${url}_lastUpdated`, Date.now());
            return data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Parse CSV data
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

// Create HTML element
function createElem(tag, text) {
    const elem = document.createElement(tag);
    if (tag === "img") elem.src = text;
    else elem.textContent = text;
    return elem;
}

// Fetch and display image slider
async function fetchImageSources() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=0';
    const data = await fetchDataWithCache(csvUrl);

    if (data) {
        const rows = parseCSV(data);
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

// Fetch and display profile data
async function fetchProfileData() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=0';
    const data = await fetchDataWithCache(csvUrl);

    if (data) {
        const rows = parseCSV(data);
        const profileSection = document.getElementById("profileSection");

        rows.slice(1).forEach(row => {
            const isEmpty = row.slice(2, 5).every(cell => cell.trim() === '');
            if (isEmpty) return;

            const profileDiv = document.createElement("div");
            profileDiv.classList.add("profile");

            const hrefValue = row[5].trim();
            if (hrefValue !== '') {
                const profileLink = document.createElement("a");
                profileLink.href = hrefValue;

                const profileImage = row[2].trim() !== '' ? createElem("img", row[2].trim()) : null;
                const profileName = row[3].trim() !== '' ? createElem("h3", row[3].trim()) : null;
                const profileDetails = createElem("p", row[4].trim());

                [profileImage, profileName].forEach(elem => elem && profileLink.appendChild(elem));
                profileLink.appendChild(profileDetails);
                profileDiv.appendChild(profileLink);
            } else {
                [row[2], row[3]].forEach((text, index) => {
                    if (text.trim() !== '') {
                        const elem = createElem(index === 0 ? "img" : "h3", text.trim());
                        profileDiv.appendChild(elem);
                    }
                });
                profileDiv.appendChild(createElem("p", row[4].trim()));
            }

            profileSection.appendChild(profileDiv);
        });
    }
}

// Fetch and display post data
async function fetchAndDisplayData() {
    const csvPost = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=2089505816';
    const data = await fetchDataWithCache(csvPost);

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

// Call the functions
fetchImageSources();
fetchProfileData();
fetchAndDisplayData();
