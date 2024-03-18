const time = 1 * 60 * 1000;

// Array of CSV URLs with corresponding storage keys
const csvLinks = [
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv', key: 'PrivteDataAll' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv&gid=1000375812', key: 'PrivateDataMain' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv', key: 'PublicDataPerson' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv&gid=622627727', key: 'PublicDataPlaces' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv', key: 'MainPage' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=471126613', key: 'MoreOption' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=2089505816', key: 'Post' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=1429441367', key: 'Inbox' },
    // Add more CSV URLs with keys as needed
];
// Function to fetch CSV data
function fetchCSVData(csvUrl) {
    return new Promise(function(resolve, reject) {
        Papa.parse(csvUrl, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function(results) {
                resolve(results.data);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// Function to update local storage with fetched data
async function updateLocalStorage(csvUrl, storageKey) {
    try {
        var newData = await fetchCSVData(csvUrl);
        var storedData = JSON.parse(localStorage.getItem(storageKey));
        
        // Check if fetched data differs from local storage data
        if (JSON.stringify(newData) !== JSON.stringify(storedData)) {
            localStorage.setItem(storageKey, JSON.stringify(newData));
            console.log('Local storage data updated successfully for', storageKey);
        } else {
            console.log('Local storage data is up to date for', storageKey);
        }
    } catch (error) {
        console.error('Error fetching or updating data for', storageKey, ':', error);
    }
}

// Function to update local storage and set interval for each CSV link
function updateAndSetInterval() {
    csvLinks.forEach(({ url, key }) => {
        updateLocalStorage(url, key);
        setInterval(() => updateLocalStorage(url, key), time); // 1 minute in milliseconds
    });
}

// Fetch data and update local storage initially
updateAndSetInterval();




  