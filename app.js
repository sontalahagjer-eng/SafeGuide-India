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
  alert("Guide booked for " + plan);
}

window.onload = function () {
  if (document.getElementById("guideList")) {
    loadGuides();
  }
};
