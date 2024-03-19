document.addEventListener("DOMContentLoaded", function () {
  const savedRowIndex = localStorage.getItem("rowIndex");
  const savedUserPassword = localStorage.getItem("userPassword");
  const sidebarButton = document.getElementById("sidebarButton");
  const sidebar = document.getElementById("sidebar");
  const navbar = document.getElementById("navbar");
  const bioSection = document.getElementById("bioSection");
  const profileBtn = document.getElementById("profileBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (savedRowIndex && savedUserPassword) {
    displayUserProfile(navbar, bioSection); // Call the function to display user profile
    profileBtn.style.display = "block";
  } else {
    // If rowIndex or userPassword is not found, show login option
    sidebar.style.display = "none";
    sidebarButton.style.display = "none"; // Hide the sidebar button
    navbar.innerHTML = '<ul><li><a href="login.html">Login</a></li></ul>';
    console.error("Row index or user password not found in localStorage.");
    profileBtn.style.display = "none";
    logoutBtn.style.display = "none";
  }
});

function displayUserProfile(navbar, bioSection) {
  const userName = localStorage.getItem("userName");
  const bloodGroup = localStorage.getItem("userBloodGroup");
  const address = localStorage.getItem("userAddress");
  const balance = localStorage.getItem("userDonate");
  const photoUrl = localStorage.getItem("userImg");

  navbar.innerHTML = `<ul><li><img src="${photoUrl}" alt="User Photo" onclick="toggleBio()" onerror="this.onerror=null; this.src='https://uddog.github.io/testing/Default_pfp.svg.png';"></li></ul>`;
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

  const profession = localStorage.getItem('userProfession');
  switch (profession) {
    default:
      addAdminButton(profession, "profession.html"); // Use 'profession' as button name and link to profession.html
      break;
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
  localStorage.removeItem("userUsername");
  localStorage.removeItem("userName");
  localStorage.removeItem("userBName");
  localStorage.removeItem("userFName");
  localStorage.removeItem("userNumber");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userBloodGroup");
  localStorage.removeItem("userAddress");
  localStorage.removeItem("userDonate");
  localStorage.removeItem("userPoint");
  localStorage.removeItem("userBirthDay");
  localStorage.removeItem("userSchool");
  localStorage.removeItem("userCollege");
  localStorage.removeItem("userVarsity");
  localStorage.removeItem("userGender");
  localStorage.removeItem("userProfession");
  localStorage.removeItem("userHobby");
  localStorage.removeItem("userImg");
  localStorage.removeItem("userJDate");
  localStorage.removeItem("userReference");
  localStorage.removeItem("userEvents");
  localStorage.removeItem("userBDonate");
  localStorage.removeItem("userMDate");
  localStorage.removeItem("userBDate");
  localStorage.removeItem("userPower");
  localStorage.removeItem("rowIndex");

    location.reload();
}
