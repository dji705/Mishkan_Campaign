// הגדרות Firebase - יש להעתיק מהקונסול של Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// אתחול Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const loginBtn = document.getElementById('google-login-btn');
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');

// פונקציית התחברות
loginBtn.addEventListener('click', () => {
    auth.signInWithPopup(provider).then((result) => {
        console.log("מחובר בהצלחה:", result.user.displayName);
        showApp(result.user);
    }).catch((error) => {
        alert("שגיאה בהתחברות: " + error.message);
    });
});

function showApp(user) {
    loginScreen.style.display = 'none';
    mainApp.style.display = 'block';
    document.getElementById('user-info').innerHTML = `שלום, ${user.displayName}`;
    // הפעלת קונפטי בכניסה
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
}

// בדיקה אם המשתמש כבר מחובר
auth.onAuthStateChanged((user) => {
    if (user) showApp(user);
});