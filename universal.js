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
      const photoUrl = userRow[18];
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
