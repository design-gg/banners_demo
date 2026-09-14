const banners=[

{
project:"Коммерсант",
name:"970×250",
type:"html",
src:"banners/kommersant/970x250/index.html",
width:970,
height:250
},

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
scale:0.5
},

{
project:"GG",
name:"620×250",
type:"gif",
src:"banners/gg/620x250.gif",
width:620,
height:250,
scale:0.5
},

{
project:"РБК",
name:"970×250",
type:"html",
src:"banners/rbk/970x250/index.html",
width:970,
height:250
}

];


const list=document.getElementById("projectList");
const preview=document.getElementById("previewContainer");
const title=document.getElementById("title");
const info=document.getElementById("info");
const openButton=document.getElementById("openButton");
const bgButton=document.getElementById("bgButton");

let current=null;
let currentFilter="all";
let bgIndex=0;

const backgrounds=[
"#e9e9e9",
"#ffffff",
"#bcbcbc",
"#222222"
];

function renderList(){

list.innerHTML="";

const filtered=banners.filter(b=>currentFilter==="all"||b.type===currentFilter);
const projects=[...new Set(filtered.map(b=>b.project))];

projects.forEach((project,index)=>{

const group=document.createElement("div");
group.className="projectGroup";

const groupTitle=document.createElement("div");
groupTitle.className="projectName projectToggle";
groupTitle.innerHTML=`
<span>${project}</span>
<span class="arrow">${index===0?"−":"+"}</span>
`;

const itemsWrap=document.createElement("div");
itemsWrap.className="projectItems";

if(index!==0){
itemsWrap.style.display="none";
}

groupTitle.onclick=()=>{

const isOpen=itemsWrap.style.display!=="none";

itemsWrap.style.display=isOpen?"none":"block";
groupTitle.querySelector(".arrow").textContent=isOpen?"+":"−";

};

filtered.filter(b=>b.project===project).forEach(banner=>{

const item=document.createElement("div");
item.className="projectItem";

if(current===banner)item.classList.add("active");

item.innerHTML=`
<div>
<div class="itemName">${banner.name}</div>
<div class="itemMeta">${banner.width} × ${banner.height}</div>
</div>
<div class="typeBadge">${banner.type.toUpperCase()}</div>
`;

item.onclick=()=>showBanner(banner);

itemsWrap.appendChild(item);

});

group.appendChild(groupTitle);
group.appendChild(itemsWrap);

list.appendChild(group);

});

}


function showBanner(banner){

current=banner;

title.textContent=banner.project+" — "+banner.name;

info.textContent=
banner.width+" × "+banner.height+" px · "+banner.type.toUpperCase();

preview.innerHTML="";

if(banner.type==="html"){

const iframe=document.createElement("iframe");

iframe.src=banner.src;
iframe.width=banner.width;
iframe.height=banner.height;

preview.appendChild(iframe);

}else{

const img=document.createElement("img");

img.src=banner.src;

const scale=banner.scale ?? 1;

img.width=banner.width*scale;
img.height=banner.height*scale;

preview.appendChild(img);

}

renderList();

}


document.querySelectorAll(".filter").forEach(button=>{

button.onclick=()=>{

document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));

button.classList.add("active");

currentFilter=button.dataset.filter;

renderList();

};

});


openButton.onclick=()=>{

if(current){
window.open(current.src,"_blank");
}

};


bgButton.onclick=()=>{

bgIndex=(bgIndex+1)%backgrounds.length;

document.querySelector(".previewArea").style.background=
backgrounds[bgIndex];

};


renderList();

if(banners.length){
showBanner(banners[0]);
}
