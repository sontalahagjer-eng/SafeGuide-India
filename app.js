function login() {
  window.location.href = "dashboard.html";
}
function submitGuide() {
  const name = document.getElementById("name").value;
  const state = document.getElementById("state").value;
  const district = document.getElementById("district").value;
  const bio = document.getElementById("bio").value;
  const upi = document.getElementById("upi").value;
  const bank = document.getElementById("bank").value;

  if (!name || !state || !district) {
    alert("Please fill all required fields");
    return;
  }

  alert("Profile Submitted Successfully!");

  // Later we will save this in Firebase
}
