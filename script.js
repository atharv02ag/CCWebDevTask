const url = 'https://coding-week-2024-api.onrender.com/api/data';

const getJSON = async (url)=>{
    const response = await fetch(url);
    const data = response.json();
    return data;
}

const nav = document.querySelector('nav');
const sideHeading = document.querySelector('.side-bar .side-heading');
nav.addEventListener("click",(e)=>{
    for(let child of nav.children){
        if(child.matches('.selected-nav')){
            child.classList.remove('selected-nav');
        }
    }
    e.target.classList.add('selected-nav');
})

sideHeading.addEventListener("click",(e)=>{
    for(let child of sideHeading.children){
        if(child.matches('.selected-side')){
            child.classList.remove('selected-side');
        }
    }
    e.target.classList.add('selected-side');
})

// const majorOne = document.querySelector('.major.one');
// console.log(majorOne.children[0].children);

// const setSection1 = (obj,element)=>{
// }
// getJSON('./api.json').then(e=>{
//     console.log(e[0]);
// })

