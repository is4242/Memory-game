document.addEventListener("DOMContentLoaded", () => {
    // تشغيل الدالة فور تحميل الصفحة
    displayLeaderboard();

    // برمجة زر العودة للعب
 
});

function displayLeaderboard() {
    const tableBody = document.getElementById("leaderboard-body");
    
    // إذا لم يجد الجدول في الصفحة (لتجنب الأخطاء)
    if (!tableBody) return;

    // 1. جلب المصفوفة الشاملة من الـ LocalStorage
    let players = JSON.parse(localStorage.getItem("AllPlayers")) || [];

    // 2. مسح محتوى الجدول الحالي
    tableBody.innerHTML = "";

    // 3. الترتيب الاحترافي:
    // الأول: صاحب أقل أخطاء (bestWrong)
    // الثاني: (في حال تساوي الأخطاء) صاحب أكبر وقت متبقي (bestTime)
    players.sort((a, b) => {
        if (a.bestWrong !== b.bestWrong) {
            return a.bestWrong - b.bestWrong;
        }
        return b.bestTime - a.bestTime;
    });

    // 4. عرض أول 10 لاعبين فقط (أو الكل حسب رغبتك)
    players.forEach((player, index) => {
        const row = document.createElement("tr");

        // تمييز الثلاثة الأوائل بكلاس CSS
        if (index < 3) row.classList.add("top-three");

        // تحديد الأيقونة أو المركز
        let rankDisplay = index + 1;
        if (index === 0) rankDisplay = `<i class="fa-solid fa-crown gold"></i> 1`;
        if (index === 1) rankDisplay = `<i class="fa-solid fa-medal silver"></i> 2`;
        if (index === 2) rankDisplay = `<i class="fa-solid fa-medal bronze"></i> 3`;

        row.innerHTML = `
            <td>${rankDisplay}</td>
            <td>${player.name}</td>
            <td>${player.bestWrong} أخطاء</td>
            <td>${player.bestTime} ثانية</td>
            <td>${player.totalGames || 1}</td>
        `;

        tableBody.appendChild(row);
    });

    // 5. حالة عدم وجود بيانات
    if (players.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="padding: 40px; color: #94a3b8;">
                    <i class="fa-solid fa-ghost" style="font-size: 40px; display: block; margin-bottom: 10px;"></i>
                    لا يوجد أبطال مسجلين بعد.. كن أولهم!
                </td>
            </tr>`;
    }
}

   const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click",function(){
location.href='http://127.0.0.1:5501/'
})



