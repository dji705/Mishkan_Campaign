// פונקציה לפתיחת תשלום נדרים פלוס (JS-Button)
function openNedarimPay() {
    // זה קוד שמפעיל את החלון המאובטח של נדרים פלוס
    if (typeof NedarimPay !== "undefined") {
        NedarimPay.open({
            Mosad: "7006742",
            Api: "true",
            OnFinish: function(res) {
                if (res.Succeeded) {
                    confetti({ particleCount: 200, spread: 100 });
                    alert("אשריכם! התרומה התקבלה בהצלחה.");
                    refreshDonors(); // עדכון הרשימה
                }
            }
        });
    } else {
        // במידה והספריה לא נטענה, נעבור לדף התרומות הרגיל
        window.open("https://www.matara.pro/nedarimplus/online/?mosad=7006742", "_blank");
    }
}

// פונקציה למשיכת רשימת מתרימים (סימולציה של API)
function refreshDonors() {
    const listContainer = document.getElementById('donors-list');
    
    // כאן בדרך כלל מבצעים fetch לכתובת ה-API של נדרים פלוס
    // לצורך הדוגמה, הנה נתונים דמו:
    const mockDonors = [
        { name: "משפחת לוי", amount: "₪3,600" },
        { name: "מוקיר רבנן", amount: "₪1,000" },
        { name: "ידיד הישיבה", amount: "₪500" }
    ];

    listContainer.innerHTML = mockDonors.map(d => `
        <div class="donor-item">
            <span>${d.name}</span>
            <span class="amount">${d.amount}</span>
        </div>
    `).join('');
}

// טעינה ראשונית
refreshDonors();