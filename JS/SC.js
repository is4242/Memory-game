document.addEventListener("DOMContentLoaded", () => {
    displayLeaderboard();
});

function displayLeaderboard() {
    const tableBody = document.getElementById("leaderboard-body");
    
    // 1. جلب البيانات من الـ LocalStorage
    let players = JSON.parse(localStorage.getItem("AllPlayers")) || [];

    // 2. مسح الجدول تماماً قبل الإضافة
    tableBody.innerHTML = "";

    // 3. ترتيب البيانات (الأقل أخطاء أولاً، ثم الأكثر وقتاً متبقياً)
    players.sort((a, b) => {
        if (a.bestWrong !== b.bestWrong) {
            return a.bestWrong - b.bestWrong;
        }
        return b.bestTime - a.bestTime;
    });

    // 4. بناء الأسطر برمجياً
    players.forEach((player, index) => {
        const row = document.createElement("tr");

        // إضافة كلاس للمراكز الثلاثة الأولى للتميز البصري
        if (index < 3) row.classList.add("top-three");

        // تحديد أيقونة المركز
        let rankIcon = index + 1;
        if (index === 0) rankIcon = `<i class="fa-solid fa-crown gold"></i> 1`;
        if (index === 1) rankIcon = `<i class="fa-solid fa-medal silver"></i> 2`;
        if (index === 2) rankIcon = `<i class="fa-solid fa-medal bronze"></i> 3`;

        row.innerHTML = `
            <td>${rankIcon}</td>
            <td>${player.name}</td>
            <td>${player.bestWrong} أخطاء</td>
            <td>${player.bestTime} ثانية</td>
            <td>${player.totalGames || 1}</td>
        `;

        tableBody.appendChild(row);
    });

    // في حال كان الجدول فارغاً
    if (players.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">لا يوجد لاعبين مسجلين بعد!</td></tr>`;
    }
}
document.querySelector(".back-btn").addEventListener("click",()=>{
location.href='http://127.0.0.1:5501/index.html'
})

