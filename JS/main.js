let names = document.querySelector(".namespan")
let startgame = document.querySelector(".strat")
let controlstart = document.querySelector(".control-button")
let block = document.querySelector(".block-game")
let memory = document.querySelector(".game-memory")
  let isover = false;    
// the Promises

const mypromis = new Promise((resolve,reject)=>{
        isover = true
startgame.addEventListener("click",()=>{
 let promp = prompt("what is your name");
    
 if(promp){
resolve(names.textContent=promp)
} 
 
else{
resolve(names.textContent="unkonw") 
}
resolve(controlstart.remove())

});

});

document.body.addEventListener("keydown",(e)=>{
    if( sessionStorage.getItem("Date-name"))return;
if(e.key === "Enter"){
startgame.click();
};
});

// the Storges

mypromis.then((resolvevalue)=> {
    sessionStorage.setItem("Date-name",resolvevalue);
} );

mypromis.then((resolved)=>{
    isover = false
    timer()
})


let storg = sessionStorage.getItem("Date-name");
if(storg ){
    names.textContent=sessionStorage.getItem("Date-name");
    controlstart.remove();
    isover = false

}

//  Gaems
let mainbox = document.querySelector(".game-memory");

// search Array.from
// search Array.key()
let boxes = Array.from(mainbox.children);

let orderRange = [...Array(boxes.length).keys()];
shuffl(orderRange);

// Loop boxes
for(let i = 0 ; i < boxes.length;i++){
    let blocks = boxes[i];
    blocks.style.order = orderRange[i];
    // add click Event
    blocks.addEventListener("click",()=>{
        fliip_block(blocks)
        document.querySelector(".clickC").play()
    });
    
};
  
  
// functiones
function shuffl(array){
    let curront = array.length,
    temp,
    random;
    while(curront > 0){
        random = Math.floor(Math.random()*curront);
        curront--;
          temp = array[curront];
          array[curront] = array[random];
          array[random] = temp;
    };
    return array;
};



// Flip block funtion

function fliip_block(selact){
    selact.classList.add("turn");

    // cards

    let allblocks = boxes.filter(fliepblock => fliepblock.classList.contains("turn"));
    // condtional
    if(allblocks.length === 2){
        stop_click(1000);
        check_mathced(allblocks[0], allblocks[1]);
    };


};

// stop click funtion

function stop_click(durthion){
    // Add no click 
    memory.classList.add("no-click");
    setTimeout(() => {
        // remove stop-click
        memory.classList.remove("no-click");
    }, durthion);
}

// check matched block
function check_mathced(firstblock , sacendblock){
let try_catch = document.querySelector(".trmenal span");

if(firstblock.dataset.technology === sacendblock.dataset.technology){
    firstblock.classList.remove("turn");
    sacendblock.classList.remove("turn");

    document.querySelector(".truel").play()

    firstblock.classList.add("has-match");
    sacendblock.classList.add("has-match");
    
    firstblock.classList.add("no-click");
    sacendblock.classList.add("no-click");

}else{
   let agin= try_catch.innerHTML = parseInt(try_catch.innerHTML)+1;
   setTimeout(() => {
       document.querySelector(".catches").play()
   }, .800);
localStorage.setItem("worng",agin);
 setTimeout(() => {
        firstblock.classList.remove("turn");
        sacendblock.classList.remove("turn");
        firstblock.classList.remove("no-click");
        sacendblock.classList.remove("no-click");
    },500);
    
if  (agin=== 9){
Loes();
triggerLose()
   };
};
let allwinner = document.querySelectorAll(".has-match").length

if(allwinner === boxes.length){
Winner()
memory.classList.add("no-click")
}
;}



function Loes() {
    // 1. استدعاء الحفظ فوراً
    updateAndRank();
    
    document.querySelector(".Loess").play();
    memory.classList.add("no-click");

    // 2. تأخير الـ Alert والـ Reload قليلاً لضمان الحفظ
    setTimeout(() => {
        alert("Game Over! لقد نفدت محاولاتك.");
        location.reload();
    }, 500); // نصف ثانية كافية للحفظ
}
//  Teme End  \
  let End = 50;

  function timer() {
    let time = document.querySelector(".time");
    time.textContent = End;

    let clearIN = setInterval(() => {
        if (isover === true) {
            clearInterval(clearIN);
            triggerLose(); 
            return; 
        }

        time.textContent = End--; 
        if (End <= 0) {
            clearInterval(clearIN);
            End = 0; 
            time.textContent = 0;
            triggerLose(); 
            Loes();
        }
       
    }, 1000);
}

timer()

function EventListener(check,code){
    check.addEventListener("click",()=>{
location.reload()
    })
}
// respons winner
function Winner(){
updateAndRank()
isover = true   
setTimeout(() => {
document.querySelector(".win").play()
let winDiv = document.createElement("div");
let winText = document.createElement("p");
let winButton = document.createElement("button");
winDiv.style.opacity = "1";
winDiv.style.pointerEvents = "all";
EventListener(winButton)
winDiv.className = "win";
winText.textContent = "Winner";
winButton.className = "check";
winButton.textContent = "Play Again"; 
winDiv.appendChild(winText);
winDiv.appendChild(winButton);
document.body.appendChild(winDiv);
memory.classList.add("no-click")
}, 1000);
triggerLose()
};

// دالة الحفظ المحدثة والمضمونة
function updateAndRank() {
    let playersList = JSON.parse(localStorage.getItem("AllPlayers")) || [];
    let currentName = sessionStorage.getItem("Date-name");
    
    if (!currentName || currentName === "") return;

    let player = playersList.find(p => p.name === currentName);

    let currentWrong = parseInt(document.querySelector(".trmenal span").innerText) || 0;
    let currentTimeLeft = parseInt(document.querySelector(".time").innerText) || 0;

    if (player) {
        // هنا حذفنا شرط (if currentWrong < player.bestWrong)
        // الآن الكود سيحدث البيانات في كل مرة تلعب فيها
        player.bestWrong = currentWrong; 
        player.bestTime = currentTimeLeft;
        player.totalGames = (player.totalGames || 0) + 1;
    } else {
        playersList.push({
            name: currentName,
            bestWrong: currentWrong,
            bestTime: currentTimeLeft,
            totalGames: 1
        });
    }

    localStorage.setItem("AllPlayers", JSON.stringify(playersList));
}

// تحديث دالة triggerLose لتكون متوافقة
function triggerLose() {
    isover = true;
    let currentTime = document.querySelector(".time").textContent;
    localStorage.setItem("Data-time", currentTime); // للمرجعية فقط
}

document.querySelector(".goscore").addEventListener("click",()=>{
location.href='http://127.0.0.1:5501/html/score.html'
})


