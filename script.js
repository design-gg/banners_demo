const banners=[

/* =========================
   КОММЕРСАНТ
========================= */

{
project:"Коммерсант",
name:"970×250",
type:"html",
src:"banners/kommersant/600x250/index.html",
width:970,
height:250
},

{
project:"Коммерсант",
name:"600×250",
type:"html",
src:"banners/kommersant/600x250/index.html",
width:600,
height:250
},

/* =========================
   ВЕДОМОСТИ
========================= */

{
project:"Ведомости",
name:"300×600",
type:"html",
src:"banners/vedomosti/300x600/index.html",
width:300,
height:600
},

{
project:"Ведомости",
name:"640×250",
type:"gif",
src:"banners/vedomosti/640x250.gif",
width:640,
height:250,

},

{
project:"Ведомости",
name:"620×250",
type:"gif",
src:"banners/vedomosti/620x250.gif",
width:620,
height:250,

}

];


/* =========================
   ELEMENTS
========================= */

const list=document.getElementById("projectList");
const preview=document.getElementById("previewContainer");
const title=document.getElementById("title");
const info=document.getElementById("info");
const openButton=document.getElementById("openButton");
const bgButton=document.getElementById("bgButton");

let current=null;
let currentFilter="all";
let bgIndex=0;


/* Разделы, которые должны существовать,
   даже если в них пока нет баннеров */

const sections=[
"Коммерсант",
"Ведомости",
"GG",
"РБК"
];


/* Открытые разделы */

const openedSections=new Set(["Ведомости"]);


/* Фоны preview */

const backgrounds=[
"#e9e9e9",
"#ffffff",
"#bcbcbc",
"#222222"
];



/* =========================
   MENU
========================= */

function renderList(){

list.innerHTML="";

sections.forEach(project=>{

const projectBanners=banners.filter(b=>
b.project===project &&
(currentFilter==="all" || b.type===currentFilter)
);

const group=document.createElement("div");
group.className="projectGroup";


/* Заголовок раздела */

const groupTitle=document.createElement("div");
groupTitle.className="projectName projectToggle";

const isOpen=openedSections.has(project);

groupTitle.innerHTML=`
<span>${project}</span>
<span class="arrow">${isOpen?"−":"+"}</span>
`;


/* Контейнер баннеров */

const itemsWrap=document.createElement("div");
itemsWrap.className="projectItems";

itemsWrap.style.display=isOpen?"block":"none";


/* Клик по названию раздела */

groupTitle.onclick=()=>{

if(openedSections.has(project)){

openedSections.delete(project);
itemsWrap.style.display="none";
groupTitle.querySelector(".arrow").textContent="+";

}else{

openedSections.add(project);
itemsWrap.style.display="block";
groupTitle.querySelector(".arrow").textContent="−";

}

};


/* Если раздел пока пустой */

if(projectBanners.length===0){

const emptyItem=document.createElement("div");
emptyItem.className="emptyProject";
emptyItem.textContent="Пока нет баннеров";

itemsWrap.appendChild(emptyItem);

}


/* Баннеры раздела */

projectBanners.forEach(banner=>{

const item=document.createElement("div");
item.className="projectItem";

if(current===banner){
item.classList.add("active");
}

item.innerHTML=`
<div>
<div class="itemName">${banner.name}</div>
<div class="itemMeta">${banner.width} × ${banner.height}</div>
</div>

<div class="typeBadge">
${banner.type.toUpperCase()}
</div>
`;


/* Клик по баннеру */

item.onclick=()=>{

document.querySelectorAll(".projectItem").forEach(el=>{
el.classList.remove("active");
});

item.classList.add("active");

showBanner(banner);

};


itemsWrap.appendChild(item);

});


group.appendChild(groupTitle);
group.appendChild(itemsWrap);

list.appendChild(group);

});

}



/* =========================
   SHOW BANNER
========================= */

function showBanner(banner){

current=banner;

title.textContent=banner.project+" — "+banner.name;

info.textContent=
banner.width+" × "+banner.height+" px · "+banner.type.toUpperCase();

preview.innerHTML="";


/* HTML */

if(banner.type==="html"){

const iframe=document.createElement("iframe");

iframe.src=banner.src;
iframe.width=banner.width;
iframe.height=banner.height;

iframe.style.border="0";

preview.appendChild(iframe);

}


/* GIF / IMAGE */

else{

const img=document.createElement("img");

img.src=banner.src;

const scale=banner.scale ?? 1;

img.width=banner.width*scale;
img.height=banner.height*scale;

preview.appendChild(img);

}

}



/* =========================
   FILTERS
========================= */

document.querySelectorAll(".filter").forEach(button=>{

button.onclick=()=>{

document.querySelectorAll(".filter").forEach(b=>{
b.classList.remove("active");
});

button.classList.add("active");

currentFilter=button.dataset.filter;

renderList();

};

});



/* =========================
   OPEN
========================= */

openButton.onclick=()=>{

if(current){
window.open(current.src,"_blank");
}

};



/* =========================
   BACKGROUND
========================= */

bgButton.onclick=()=>{

bgIndex=(bgIndex+1)%backgrounds.length;

document.querySelector(".previewArea").style.background=
backgrounds[bgIndex];

};



/* =========================
   START
========================= */

renderList();


/* Сразу открываем первый баннер */

if(banners.length){

current=banners[0];

openedSections.add(current.project);

renderList();

showBanner(current);

}
