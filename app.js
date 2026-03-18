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
