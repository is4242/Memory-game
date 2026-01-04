document.addEventListener("DOMContentLoaded", () => {
    displayLeaderboard();

});

function displayLeaderboard() {
    const tableBody = document.getElementById("leaderboard-body");
    
    if (!tableBody) return;

    let players = JSON.parse(localStorage.getItem("AllPlayers")) || [];

    tableBody.innerHTML = "";

    players.sort((a, b) => {
        if (a.bestWrong !== b.bestWrong) {
            return a.bestWrong - b.bestWrong;
        }
        return b.bestTime - a.bestTime;
    });

    players.forEach((player, index) => {
        const row = document.createElement("tr");

        if (index < 3) row.classList.add("top-three");

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

