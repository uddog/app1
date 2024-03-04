document.addEventListener("DOMContentLoaded", function () {
  const savedRowIndex = localStorage.getItem("rowIndex");
  const savedUserPassword = localStorage.getItem("userPassword"); // Added line to get userPassword from localStorage
  const sidebarButton = document.getElementById("sidebarButton");
  const sidebar = document.getElementById("sidebar");

  const navbar = document.getElementById("navbar");
  const profileBtn = document.getElementById("profileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (savedRowIndex && savedUserPassword) {
    displayUserProfile(savedRowIndex, savedUserPassword, navbar); // Pass user password to displayUserProfile
    profileBtn.style.display = "block";
  } else {
    // If rowIndex or userPassword is not found, hide the entire sidebar
    sidebar.style.display = "none";
    sidebarButton.style.display = "none"; // Hide the sidebar button
    navbar.innerHTML = '<ul><li><a href="login.html">Login</a></li></ul>';
    console.error("Row index or user password not found in localStorage.");
    profileBtn.style.display = "none";
    logoutBtn.style.display = "none";
  }
});

async function displayUserProfile(rowIndex, userPassword, navbar) {
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
        return;
      }

      // The rest of your existing code for displaying user profile
      const photoUrl = userRow[18];
      navbar.innerHTML = `<ul><li><img src="${photoUrl}" alt="User Photo" onclick="toggleBio()"></li></ul>`;

      const bioSection = document.getElementById("bioSection");

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




      bioSection.innerHTML = `<p>${userName}</p><p>Blood Group: ${bloodGroup}</p><p>Address: ${address}</p><p>Total Donate ${balance}</p>`;






     const power = localStorage.getItem('userPower');


      // Check the value in column AB and show the corresponding Admin button(s)
      switch (power) {
        case "0":
          addAdminButton("Search", "admin0.html"); // Set the link for Admin 1
          addAdminButton("Udrita", "https://kilt-bluefish.cyclic.app/"); // Set the link for Admin 1
          break;
        case "1":
          addAdminButton("Search", "admin0.html"); // Set the link for Admin 1
          addAdminButton("Access", "admin1.html"); // Set the link for Admin 1
          addAdminButton("Udrita", "https://kilt-bluefish.cyclic.app/"); // Set the link for Admin 1
          break;
        case "2":
          addAdminButton("Search", "admin0.html"); // Set the link for Admin 1
          addAdminButton("Access Pro", "admin2.html"); // Set the link for Admin 2
          addAdminButton("Access", "admin1.html"); // Set the link for Admin 1
          addAdminButton("Udrita", "https://kilt-bluefish.cyclic.app/"); // Set the link for Admin 1
          break;
        case "3":
          addAdminButton("Search", "admin0.html"); // Set the link for Admin 1
          addAdminButton("Access Pro", "admin2.html"); // Set the link for Admin 2
          addAdminButton("Access", "admin1.html"); // Set the link for Admin 1
          addAdminButton("Admin", "admin3.html"); // Set the link for Admin 1
          addAdminButton("Udrita", "https://kilt-bluefish.cyclic.app/"); // Set the link for Admin 1
          break;
        // Add more cases as needed
        default:
          break;
      }
      switch (profession) {
        default:
          addAdminButton(profession, "profession.html"); // Use 'profession' as button name and link to profession.html
          break;
      }
    } else {
      navbar.innerHTML = '<ul><li><a href="login.html">Login</a></li></ul>';
      console.error("Invalid row index:", rowIndex);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function addAdminButton(adminButtonText, adminButtonLink) {
  const sidebar = document.getElementById("sidebar");
  const adminButton = document.createElement("a");
  adminButton.href = adminButtonLink; // Set the href attribute for the link
  adminButton.textContent = adminButtonText;
  adminButton.onclick = adminButtonClick;

  // Insert the Admin button after the "Home" link
  const homeLink = document.getElementById("homeLink");
  if (homeLink) {
    sidebar.insertBefore(adminButton, homeLink.nextSibling);
  }
}

function adminButtonClick() {
  // Add your admin button click logic here
  console.log("Admin button clicked");
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.style.width = sidebar.style.width === "40vw" ? "0" : "40vw";
}

function toggleBio() {
  const bioSection = document.getElementById("bioSection");
  bioSection.style.display =
    bioSection.style.display === "block" ? "none" : "block";
}

function openLogoutPopup() {
  const overlay = document.getElementById("overlay");
  const logoutPopup = document.getElementById("logoutPopup");
  overlay.style.display = "block";
  logoutPopup.style.display = "block";
}

function closeLogoutPopup() {
  const overlay = document.getElementById("overlay");
  const logoutPopup = document.getElementById("logoutPopup");
  overlay.style.display = "none";
  logoutPopup.style.display = "none";
}

function logout() {
  localStorage.clear();
  location.reload();
}
