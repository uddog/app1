document.addEventListener('DOMContentLoaded', function () {
    const savedRowIndex = localStorage.getItem('rowIndex');
    const sidebarTop = document.getElementById('sidebarTop');
    const homeLink = document.getElementById('homeLink');
    const sidebarButton = document.getElementById('sidebarButton');
    const sidebar = document.getElementById('sidebar');

    const navbar = document.getElementById('navbar');
    const profileBtn = document.getElementById('profileBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (savedRowIndex) {
        displayUserProfile(savedRowIndex, navbar);
        profileBtn.style.display = 'block';
    } else {
        // If rowIndex is not found, hide the entire sidebar
        sidebar.style.display = 'none';
        sidebarButton.style.display = 'none'; // Hide the sidebar button
        navbar.innerHTML = '<ul><li><a href="login.html">Login</a></li></ul>';
        console.error('Row index not found in localStorage.');
        profileBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
});

async function displayUserProfile(rowIndex, navbar) {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDv7MQUbN2J6k-mj5UI9RsITtNmwhR1LwkxBc3tQ_aUU984nUy1aEIQIWgVUeOJyKTDVkrggQBqn7n/pub?output=csv&gid=0';

    try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        const rows = data.split('\n').map(row => row.split(','));

        if (rowIndex >= 1 && rowIndex < rows.length) {
            const userRow = rows[rowIndex];
            const photoUrl = userRow[18];

            navbar.innerHTML = `<ul><li><img src="${photoUrl}" alt="User Photo" onclick="toggleBio()"></li></ul>`;

            const bioSection = document.getElementById('bioSection');
            const userName = userRow[4];
            const bloodGroup = userRow[8].trim();
            const address = userRow[11].trim();
            const balance = userRow[20].trim();
            const additionalValue = userRow[27].trim(); // Assuming column AB is at index 27

            bioSection.innerHTML = `<p>${userName}</p><p>Blood Group: ${bloodGroup}</p><p>Address: ${address}</p><p>Total Donate ${balance}</p>`;

            // Check the value in column AB and show the corresponding Admin button(s)
            switch (additionalValue) {
                case '1':
                    addAdminButton('Access', 'admin1.html'); // Set the link for Admin 1
                    break;
                case '2':
                    addAdminButton('Access Pro', 'admin2.html'); // Set the link for Admin 2
                    addAdminButton('Access', 'admin1.html'); // Set the link for Admin 1
                    break;
                 case '3':
                    addAdminButton('Access Pro', 'admin2.html'); // Set the link for Admin 2
                    addAdminButton('Access', 'admin1.html'); // Set the link for Admin 1
                    addAdminButton('Admin', 'admin3.html'); // Set the link for Admin 1
                    break;
                // Add more cases as needed
                default:
                    break;
            }
        } else {
            navbar.innerHTML = '<ul><li><a href="login.html">Login</a></li></ul>';
            console.error('Invalid row index:', rowIndex);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function addAdminButton(adminButtonText, adminButtonLink) {
    const sidebar = document.getElementById('sidebar');
    const adminButton = document.createElement('a');
    adminButton.href = adminButtonLink; // Set the href attribute for the link
    adminButton.textContent = adminButtonText;
    adminButton.onclick = adminButtonClick;

    // Insert the Admin button after the "Home" link
    const homeLink = document.getElementById('homeLink');
    if (homeLink) {
        sidebar.insertBefore(adminButton, homeLink.nextSibling);
    }
}

function adminButtonClick() {
    // Add your admin button click logic here
    console.log('Admin button clicked');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.width = sidebar.style.width === '40vw' ? '0' : '40vw';
}

function toggleBio() {
    const bioSection = document.getElementById('bioSection');
    bioSection.style.display = (bioSection.style.display === 'block') ? 'none' : 'block';
}

function openLogoutPopup() {
    const overlay = document.getElementById('overlay');
    const logoutPopup = document.getElementById('logoutPopup');
    overlay.style.display = 'block';
    logoutPopup.style.display = 'block';
}

function closeLogoutPopup() {
    const overlay = document.getElementById('overlay');
    const logoutPopup = document.getElementById('logoutPopup');
    overlay.style.display = 'none';
    logoutPopup.style.display = 'none';
}

function logout() {
    localStorage.removeItem('rowIndex');
    localStorage.removeItem('mainColor');
    location.reload();
}