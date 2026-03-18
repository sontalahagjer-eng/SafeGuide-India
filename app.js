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

  guideList.innerHTML += `
  <div class="guide-card">
    <h3>${guide.name}</h3>
    <p>${guide.bio}</p>
    <p>Distance: ${Math.floor(Math.random() * 5 + 1)} km</p>

    <button onclick="sendRequest('${guide.name}')">
      Request Guide
    </button>
  </div>
`;

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
let generatedOTP = "";

function sendOTP() {
  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Enter phone number");
    return;
  }

  // Generate 4 digit OTP
  generatedOTP = Math.floor(1000 + Math.random() * 9000);

  alert("Your OTP is: " + generatedOTP); // Demo only
}
function verifyGuide() {
  const userOTP = document.getElementById("otp").value;
  const agree = document.getElementById("agree").checked;

  if (userOTP != generatedOTP) {
    alert("Invalid OTP");
    return;
  }

  if (!agree) {
    alert("Please accept terms");
    return;
  }

  alert("Verification Successful! You are now a Guide 🎉");

  window.location.href = "guide-dashboard.html";
}
function submitGuide() {
  alert("Profile Submitted Successfully!");

  // Redirect to verification page
  window.location.href = "verify.html";
}
let confirmationResult;

function sendOTP() {
  const phone = document.getElementById("phone").value;

  const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

  auth.signInWithPhoneNumber(phone, appVerifier)
    .then(result => {
      confirmationResult = result;
      alert("OTP sent");
    });
}

function verifyOTP() {
  const code = document.getElementById("otp").value;

  confirmationResult.confirm(code)
    .then(result => {
      alert("Login Success");
    });
}
let confirmationResult;

function sendOTP() {
  const phone = document.getElementById("phone").value;

  const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

  auth.signInWithPhoneNumber(phone, appVerifier)
    .then(result => {
      confirmationResult = result;
      alert("OTP sent");
    });
}

function verifyOTP() {
  const code = document.getElementById("otp").value;

  confirmationResult.confirm(code)
    .then(result => {
      alert("Login Success");
    });
}
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(email === "" || password === "") {
    alert("Please enter email and password");
  } else {
    alert("Login successful ✅");
    // later we connect Firebase
  }
}
// 🔥 Firebase Config (PUT YOURS HERE)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let confirmationResult;

// SEND OTP
function sendOTP() {
  const phone = document.getElementById("phone").value;

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

  auth.signInWithPhoneNumber(phone, window.recaptchaVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP Sent ✅");
    })
    .catch((error) => {
      alert(error.message);
    });
}

function verifyOTP() {
  const code = document.getElementById("otp").value;

  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;

      // ✅ Save user in Firestore
      db.collection("users").doc(user.uid).set({
        phone: user.phoneNumber,
        role: "client",
        createdAt: new Date()
      });

      alert("Login Successful 🎉");

      // 👉 Go to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("Invalid OTP ❌");
    });
}
}
function logout() {
  auth.signOut().then(() => {
    alert("Logged out");
    window.location.href = "index.html";
  });
}
auth.onAuthStateChanged((user) => {
  if (!user) {
    // If not logged in → go back to login
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "index.html";
    }
  }
});
function goBooking() {
  window.location.href = "book.html";
}

function goGuide() {
  window.location.href = "guide.html";
}
function findGuides() {
  const location = document.getElementById("location").value;
  const time = document.getElementById("time").value;

  const guideList = document.getElementById("guideList");
  guideList.innerHTML = "Loading guides...";

  db.collection("guides")
    .where("city", "==", location)
    .get()
    .then((snapshot) => {
      guideList.innerHTML = "";

      if (snapshot.empty) {
        guideList.innerHTML = "No guides found";
        return;
      }

      snapshot.forEach((doc) => {
        const guide = doc.data();

        guideList.innerHTML += `
          <div class="guide-card">
            <h3>${guide.name}</h3>
            <p>${guide.bio}</p>
            <p>📍 ${guide.city}</p>

            <button onclick="bookNow('${doc.id}', '${time}')">
              Book Now ₹${time} + ₹99
            </button>
          </div>
        `;
      });
    });
}
function bookNow(guideId, price) {
  const user = auth.currentUser;

  if (!user) {
    alert("Login first");
    return;
  }

  const bookingFee = 99;

  db.collection("bookings").add({
    userId: user.uid,
    guideId: guideId,
    price: parseInt(price),
    bookingFee: bookingFee,
    status: "pending",
    createdAt: new Date()
  });

  alert("Booking Sent! Pay ₹99 to confirm");
}
function loadBookings() {
  const user = auth.currentUser;

  if (!user) return;

  db.collection("bookings")
    .where("guideId", "==", user.uid)
    .onSnapshot((snapshot) => {

      const bookingList = document.getElementById("bookingList");
      bookingList.innerHTML = "";

      snapshot.forEach((doc) => {
        const b = doc.data();

        bookingList.innerHTML += `
          <div class="guide-card">
            <p>Client: ${b.userId}</p>
            <p>Price: ₹${b.price}</p>
            <p>Status: ${b.status}</p>

            ${
              b.status === "pending"
                ? `
              <button onclick="acceptBooking('${doc.id}')">Accept</button>
              <button onclick="rejectBooking('${doc.id}')">Reject</button>
              `
                : ""
            }

            ${
              b.status === "accepted"
                ? `
              <input type="file" onchange="uploadStartPhoto('${doc.id}', this)">
              `
                : ""
            }

            ${
              b.status === "started"
                ? `
              <input type="file" onchange="uploadEndPhoto('${doc.id}', this)">
              `
                : ""
            }

          </div>
        `;
      });
    });
}
function acceptBooking(id) {
  db.collection("bookings").doc(id).update({
    status: "accepted"
  });
}

function rejectBooking(id) {
  db.collection("bookings").doc(id).update({
    status: "rejected"
  });

  alert("Client will get refund (90%)");
}
function uploadStartPhoto(id, input) {
  const file = input.files[0];

  if (!file) return;

  db.collection("bookings").doc(id).update({
    status: "started"
  });

  alert("Job Started ✅");
}
function uploadEndPhoto(id, input) {
  const file = input.files[0];

  if (!file) return;

  db.collection("bookings").doc(id).update({
    status: "completed"
  });

  alert("Job Completed ✅ You can withdraw now");
}
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.includes("guide-dashboard.html")) {
    loadBookings();
  }
});
function uploadEndPhoto(id, input) {
  const file = input.files[0];

  if (!file) return;

  db.collection("bookings").doc(id).get().then((doc) => {
    const data = doc.data();

    const total = data.price;

    const guideAmount = total * 0.75;
    const adminAmount = total * 0.25;

    db.collection("bookings").doc(id).update({
      status: "completed",
      guideAmount: guideAmount,
      adminAmount: adminAmount
    });

    alert("Job Completed ✅ Earnings Added");
  });
}
auth.onAuthStateChanged((user) => {
  if (user && window.location.pathname.includes("guide-dashboard.html")) {
    loadBookings();
    loadEarnings();
  }
});
// 🔥 Firebase setup
const firebaseConfig = { ... };
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();


// 🔐 AUTH FUNCTIONS
function sendOTP() { ... }
function verifyOTP() { ... }


// 👨‍💼 GUIDE FUNCTIONS
function acceptBooking(id) { ... }
function rejectBooking(id) { ... }


// 📸 JOB FUNCTIONS
function uploadStartPhoto(id, input) { ... }
function uploadEndPhoto(id, input) { ... }


// 💳 ✅ PASTE HERE (BOTTOM)

function bookNow(guideId, price) {
  const user = auth.currentUser;

  if (!user) {
    alert("Login first");
    return;
  }

  const bookingFee = 99;
  const totalAmount = parseInt(price) + bookingFee;

  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: totalAmount * 100,
    currency: "INR",
    name: "SafeGuide India",
    description: "Guide Booking",

    handler: function (response) {

      db.collection("bookings").add({
        userId: user.uid,
        guideId: guideId,
        price: parseInt(price),
        bookingFee: bookingFee,
        paymentId: response.razorpay_payment_id,
        status: "pending",
        createdAt: new Date()
      });

      alert("Payment Successful ✅ Booking Confirmed");
    },

    theme: {
      color: "#00c853"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
