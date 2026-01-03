const blocks = Array.from(document.querySelectorAll(".block-game"));

const replacements = [
  { icon: `<i class="fa-brands fa-teamspeak"></i>`, name: "teamspeak" },
  { icon: `<i class="fa-brands fa-apple"></i>`, name: "apple" },
  { icon: `<i class="fa-brands fa-github"></i>`, name: "github" },
  { icon: `<i class="fa-brands fa-instagram"></i>`, name: "instagram" },


];

function updateUniquePairs() {
if(Math.random() > 0.5)return;
    const groups = {};
  blocks.forEach(block => {
    const tech = block.dataset.technology;
    if (!groups[tech]) groups[tech] = [];
    groups[tech].push(block);
  });
  const allPairs = Object.values(groups);

  const shuffledIcons = [...replacements].sort(() => Math.random() - 0.5);

  const shuffledPairs = allPairs.sort(() => Math.random() - 0.5);

  shuffledIcons.forEach((iconData, index) => {
    const pair = shuffledPairs[index];

    if (pair) {
      pair.forEach(block => {
        block.querySelector(".back").innerHTML = iconData.icon;
        block.dataset.technology = iconData.name;
      });
    }
  });
}

updateUniquePairs();

document.querySelector(".goscore").addEventListener("click",()=>{
    location.href="http://127.0.0.1:5501/html/score.html"
})


