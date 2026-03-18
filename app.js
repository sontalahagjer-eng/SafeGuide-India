function login() {
  window.location.href = "dashboard.html";
}

function searchGuide() {
  const location = document.getElementById("location").value;
  const time = document.getElementById("time").value;

  if (!location || !time) {
    alert("Please enter location and time");
    return;
  }

  // Save temporarily
  localStorage.setItem("location", location);
  localStorage.setItem("time", time);

  window.location.href = "book.html";
}
function loadGuides() {
  const guideList = document.getElementById("guideList");

  // Dummy guides (later from Firebase)
  const guides = [
    { name: "Rahul", location: "Delhi", bio: "Local expert" },
    { name: "Aman", location: "Assam", bio: "Tea garden specialist" }
  ];

  const userLocation = localStorage.getItem("location");

  guideList.innerHTML = "";

  guides.forEach(guide => {
    if (guide.location.toLowerCase().includes(userLocation.toLowerCase())) {

      guideList.innerHTML += `
        <div class="guide-card">
          <h3>${guide.name}</h3>
          <p>${guide.bio}</p>

          <div class="price-box">
            <button onclick="book('2h ₹699')">2h ₹699</button>
            <button onclick="book('5h ₹1099')">5h ₹1099</button>
            <button onclick="book('8h ₹1199')">8h ₹1199</button>
            <button onclick="book('12h ₹1699')">12h ₹1699</button>
            <button onclick="book('24h ₹2199')">24h ₹2199</button>
            <button onclick="book('48h ₹6999')">48h ₹6999</button>
          </div>
        </div>
      `;
    }
  });
}

function book(plan) {
  const bookingFee = 99;

  let price = 0;

  if (plan.includes("699")) price = 699;
  else if (plan.includes("1099")) price = 1099;
  else if (plan.includes("1199")) price = 1199;
  else if (plan.includes("1699")) price = 1699;
  else if (plan.includes("2199")) price = 2199;
  else if (plan.includes("6999")) price = 6999;

  // 💰 Calculations
  const platformCommission = price * 0.25;
  const guideEarning = price * 0.75;
  const totalUserPays = price + bookingFee;

  alert(
    "Plan: " + plan +
    "\n\nGuide Earns (75%): ₹" + guideEarning +
    "\nPlatform Earns (25%): ₹" + platformCommission +
    "\nBooking Fee: ₹99" +
    "\n\nTotal You Pay: ₹" + totalUserPays
  );
}
function sendRequest(guideName) {
  localStorage.setItem("requestedGuide", guideName);
  alert("Request sent to " + guideName);

  // Redirect to guide panel (demo)
  window.location.href = "guide-dashboard.html";
}
window.onload = function () {

  // Show request to guide
  if (document.getElementById("requestText")) {
    const guide = localStorage.getItem("requestedGuide");
    document.getElementById("requestText").innerText =
      "Booking request from client for " + guide;
  }

};
function accept() {
  alert("Booking Accepted!");

  // Go to job start page
  window.location.href = "start-job.html";
}

function reject() {
  alert("Booking Rejected!");
}
function startJob() {
  const file = document.getElementById("startPhoto").files[0];

  if (!file) {
    alert("Upload photo first");
    return;
  }

  alert("Job Started!");
  window.location.href = "end-job.html";
}
function endJob() {
  const file = document.getElementById("endPhoto").files[0];

  if (!file) {
    alert("Upload photo with client");
    return;
  }

  alert("Job Completed! Now you can withdraw money.");
}
