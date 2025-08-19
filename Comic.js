   // --- Preload ảnh 00.webp của tất cả menu ---
function preloadFirstPageImages() {
    for (const storyName in storyFolders) {
        const folder = storyFolders[storyName];
        const img = new Image();
        img.src = `comics/${folder}/00.webp`;
    }
}

// Gọi hàm preload khi DOM load xong
document.addEventListener('DOMContentLoaded', preloadFirstPageImages);
    
// --- Theme Toggle ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// --- Language Toggle ---
const langBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'vi';

const translations = {
    vi: {
        title: "YattaD",
        introTitle: "Lời Nói Đầu",
        introP1: "Chào mừng bạn đến với trang đọc truyện tranh của tôi! Tại đây bạn có thể khám phá các bộ truyện độc đáo và hấp dẫn.",
        introP2: "Mỗi câu chuyện đều được lựa chọn kỹ lưỡng, hy vọng bạn sẽ tìm thấy những khoảnh khắc thú vị và cảm xúc khi thưởng thức.",
        menu1: "PunkgaMerch",
        menu2: "Red và Ruby",
        menu3: "Tiêu Tùng",
        menu4: "Sao Băng Mùa Hạ",
        menu5: "Khai Phá",
        menu6: "Vẫn Đúng",
        menu7: "Lê Thận",
        menu8: "Raku",
       page: "Trang"
    },
    en: {
        title: "YattaD",
        introTitle: "Introduction",
        introP1: "Welcome to my comic reading page! Here you can explore unique and exciting stories.",
        introP2: "Each story is carefully selected, hope you will find interesting moments and emotions while enjoying.",
        menu1: "PunkgaMerch",
        menu2: "Red & Ruby",
        menu3: "Tieu Tung",
        menu4: "Summer Shooting Star",
        menu5: "Break thRough",
        menu6: "Still Come True",
        menu7: "Le Than",
        menu8: "Raku",
        page: "Page"
    }
};

function switchLanguage() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    localStorage.setItem('lang', currentLang);

    for (const key in translations[currentLang]) {
        const el = document.getElementById(key);
        if (el) {
            // Nếu là menu thì chỉ đổi text trong <p>
            if (key.startsWith('menu')) {
                const p = el.querySelector('p');
                if (p) p.textContent = translations[currentLang][key];
            } else {
                el.innerHTML = translations[currentLang][key];
            }
        }
    }
}


langBtn.addEventListener('click', switchLanguage);
document.addEventListener('DOMContentLoaded', () => {
    if(currentLang === 'en') switchLanguage();
});

// ComicReader.js - Script đọc truyện cho Comic.html
// ComicReader.js - Script đọc truyện cho Comic.html
// ComicReader.js - Script đọc truyện cho Comic.html

// --- Cấu hình số trang cho từng truyện ---
const storyPages = {
    "PunkgaMerch": 14,
    "Red&Ruby": 10,
    "TieuTung": 8,
    "Siin": 5,
    "BreakthRough": 11,
    "StillComeTrue": 6,
    "LeThan": 4,
    "Raku": 7
};

const storyFolders = {
    "PunkgaMerch": "PunkgaMerch",
    "Red&Ruby": "Red&Ruby",
    "TieuTung": "TieuTung",
    "Siin": "Siin",
    "BreakthRough": "BreakthRough",
    "StillComeTrue": "StillComeTrue",
    "LeThan": "LeThan",
    "Raku": "Raku"
};


let currentStory = "";
let currentPage = 1;
let totalPages = 0;
    
// Lấy overlay và các element
const overlay = document.getElementById('overlay');
const deck = document.getElementById('deck');
const caption = document.getElementById('caption');
const closeBtn = document.getElementById('closeBtn');
const restartBtn = document.getElementById('restartBtn');

// --- Tạo 3-panel layout ---
const prevImg = document.createElement('img');
prevImg.style.maxHeight = "45%";
prevImg.style.opacity = "0.4";
prevImg.style.marginRight = "40px";

const currImg = document.createElement('img');
currImg.style.maxHeight = "90%";

const nextImg = document.createElement('img');
nextImg.style.maxHeight = "45%";
nextImg.style.opacity = "0.4";
nextImg.style.marginLeft = "40px";

deck.appendChild(prevImg);
deck.appendChild(currImg);
deck.appendChild(nextImg);

// --- Hàm hiển thị trang ---
function showPage() {
    const folder = storyFolders[currentStory];

    prevImg.src = currentPage > 1 ? 
        `comics/${folder}/${String(currentPage-1).padStart(2,'0')}.webp` : 
        `comics/${folder}/00.webp`;

    currImg.src = `comics/${folder}/${String(currentPage).padStart(2,'0')}.webp`;

    nextImg.src = currentPage < totalPages ? 
        `comics/${folder}/${String(currentPage+1).padStart(2,'0')}.webp` : '';

    if(currentPage + 1 < totalPages){
        const img = new Image();
        img.src = `comics/${folder}/${String(currentPage+2).padStart(2,'0')}.webp`;
    }

    restartBtn.style.display = (currentPage === totalPages) ? 'block' : 'none';
    caption.innerText = `${translations[currentLang].page} ${currentPage} / ${totalPages}`;
}

// --- Hàm mở truyện ---
function openStory(storyName) {
    currentStory = storyName;
    const folder = storyFolders[storyName];
    totalPages = storyPages[storyName] || 3; 
    currentPage = 1;
    overlay.style.display = 'flex';
    showPage();
}


// --- Navigation ---
function nextPage() {
    if(currentPage < totalPages){
        currentPage++;
        showPage();
    }
}
function prevPageFunc() {
    if(currentPage > 1){
        currentPage--;
        showPage();
    }
}
function restart() {
    currentPage = 1;
    showPage();
}

// --- Sự kiện nút ---
closeBtn.addEventListener('click', ()=> overlay.style.display='none');
restartBtn.addEventListener('click', restart);

// --- Click menu ---
document.querySelectorAll('.menuItem').forEach(item => {
    item.addEventListener('click', () => openStory(item.dataset.folder));
});

// --- Click qua ảnh mini ---
prevImg.addEventListener('click', prevPageFunc);
nextImg.addEventListener('click', nextPage);
currImg.addEventListener('click', nextPage); // click vào ảnh lớn cũng next

// --- Key navigation ---
document.addEventListener('keydown', e => {
    if(overlay.style.display === 'flex'){
        if(e.key === "ArrowRight") nextPage();
        if(e.key === "ArrowLeft") prevPageFunc();
        if(e.key === "Escape") overlay.style.display='none';
    }
}); 
// --- MOBILE SWIPE ---
let touchStartX = 0, touchEndX = 0;

deck.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});
deck.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const distance = touchEndX - touchStartX;
  if(Math.abs(distance) < 50) return;
  if(distance > 0) prevPageFunc();
  else nextPage();
}
