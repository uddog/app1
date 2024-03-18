async function fetchUserProfileData(rowIndex, userPassword) {
  const csvUrl ="https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv&gid=0";

  try {
    const response = await fetch(csvUrl);
    const data = await response.text();
    const rows = data.split("\n").map((row) => row.split(","));

    if (rowIndex >= 1 && rowIndex < rows.length) {
      const userRow = rows[rowIndex];
      const storedUserPassword = userRow[26].trim(); // Assuming column AA is at index 26

      // Check if the stored user password matches the one in the spreadsheet
      if (userPassword !== storedUserPassword) {
        // If passwords don't match, remove rowIndex from localStorage and redirect to login page
        localStorage.removeItem("rowIndex");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPassword");
        location.href = "index.html";
        localStorage.clear();
        return false;
      }
      // The rest of your code for storing user profile data in localStorage
      const userUsername = userRow[1].trim();
      const role = userRow[2].trim();
      const userBName = userRow[3].trim();
      const userName = userRow[4].trim();
      const userFName = userRow[5].trim();
      const number = userRow[6].trim();
      const email = userRow[7].trim();
      const birthdate = userRow[8].trim();
      const bloodGroup = userRow[9].trim();
      const gender = userRow[10].trim();
      const address = userRow[11].trim();
      const school = userRow[12].trim();
      const college = userRow[13].trim();
      const varsity = userRow[14].trim();
      const profession = userRow[15].trim();
      const hobby = userRow[16].trim(); 
      const point = userRow[17].trim();
      const photoUrl = userRow[18];
      const userJDate = userRow[19].trim();
      const balance = userRow[20].trim();
      const reference = userRow[21].trim();
      const events = userRow[22].trim();
      const BDonate = userRow[23].trim();
      const MDate = userRow[24].trim();
      const BDate = userRow[25].trim();
      const additionalValue = userRow[27].trim(); // Assuming column AB is at index 27

      //saving in local storage
      localStorage.setItem("userUsername", userUsername);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userBName", userBName);
      localStorage.setItem("userFName", userFName);
      localStorage.setItem("userNumber", number);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userBloodGroup", bloodGroup);
      localStorage.setItem("userAddress", address);
      localStorage.setItem("userDonate", balance);
      localStorage.setItem("userPoint", point);
      localStorage.setItem("userBirthDay", birthdate);
      localStorage.setItem("userSchool", school);
      localStorage.setItem("userCollege", college);
      localStorage.setItem("userVarsity", varsity);
      localStorage.setItem("userGender", gender);
      localStorage.setItem("userProfession", profession); 
      localStorage.setItem("userHobby", hobby); 
      localStorage.setItem("userImg", photoUrl);
      localStorage.setItem("userJDate", userJDate);
      localStorage.setItem("userReference", reference);
      localStorage.setItem("userEvents", events);
      localStorage.setItem("userBDonate", BDonate);
      localStorage.setItem("userMDate", MDate);
      localStorage.setItem("userBDate", BDate);
      localStorage.setItem("userPower", additionalValue);

      return true; // Indicate successful data retrieval and storage
    } else {
      console.error("Invalid row index:", rowIndex);
      return false; // Indicate failure due to invalid row index
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return false; // Indicate failure due to error fetching data
  }
}

// Fetch user profile data initially
const savedRowIndex = localStorage.getItem("rowIndex");
const savedUserPassword = localStorage.getItem("userPassword");

if (savedRowIndex && savedUserPassword) {
  fetchUserProfileData(savedRowIndex, savedUserPassword)
    .then((success) => {
      if (!success) {
        // Handle error or invalid row index here
      }
    });
}

// Fetch user profile data every 5 minutes
setInterval(() => {
  const savedRowIndex = localStorage.getItem("rowIndex");
  const savedUserPassword = localStorage.getItem("userPassword");

  if (savedRowIndex && savedUserPassword) {
    fetchUserProfileData(savedRowIndex, savedUserPassword)
      .then((success) => {
        if (!success) {
          // Handle error or invalid row index here
        }
      });
  }
}, 5 * 60 * 1000); // 5 minutes in milliseconds








































































////main part


const time = 1 * 60 * 1000;

// Array of CSV URLs with corresponding storage keys
const csvLinks = [
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv', key: 'PrivteDataAll' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv&gid=1000375812', key: 'PrivateDataMain' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv', key: 'PublicDataPerson' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv&gid=622627727', key: 'PublicDataPlaces' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMec3rLMJvXIWdyVxO_ZVzKaJTrxrxqp4Wk1G2jjzEbRAr2x0df81w-6C3UrYpgNgilUTmz_ct4seU/pub?output=csv&gid=497879876', key: 'PublicDataTransport' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv', key: 'MainPage' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=471126613', key: 'MoreOption' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=2089505816', key: 'Post' },
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT5yPBQL7OkwisJJ6Dq4jpzATrchx3wbyxQQ09mH0BoPrTFr8FYnKxkT7xjvWB8P51Gled65w6S8VQH/pub?output=csv&gid=1429441367', key: 'Inbox' },  
    { url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGA2LCR9epb--Kqdl1U0VXO-4ehjdwFtJeuYWdhspBE7Zl-WGdUA7DG2MaIDKcABGcHThL9fnmnHhx/pub?output=csv', key: 'anik' },  

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

// Function to convert JSON data to CSV format
function convertJSONToCSV(data) {
    const csv = Papa.unparse(data);
    return csv;
}

// Function to update local storage with fetched data in CSV format
async function updateLocalStorage(csvUrl, storageKey) {
    try {
        var newData = await fetchCSVData(csvUrl);
        var storedData = localStorage.getItem(storageKey);

        // Convert new data to CSV format
        const newCSVData = convertJSONToCSV(newData);

        // Check if fetched data differs from local storage data
        if (newCSVData !== storedData) {
            localStorage.setItem(storageKey, newCSVData);
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
