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

const majorOne = document.querySelector('.major.one');
const mediumTwo = document.querySelector('.medium.two');
const minorThree = document.querySelector('.minor.three');
const minorFour = document.querySelector('.minor.four');

const months = {
    "01":"January",
    "02":"February",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
}

const convDate = (date)=>{
    const year = date.substring(0,4);
    const month = months[date.substring(5,7)];
    const day = date.substring(8,10);
    return (month+" "+day+", " + year);
}

const setSection1 = (obj,element,index)=>{
    const newtype = document.createElement('span');
    newtype.classList.add('type');
    newtype.innerText = obj[index].type;
    element.insertBefore(newtype,element.children[0]);
    let headline = obj[index].headline;
    if(headline.length > 35){
        headline = headline.substring(0,35);
        headline += '..';
    }
    element.children[2].innerText = headline;
    element.children[3].innerText = obj[index].author;
    element.children[4].children[1].innerText = convDate(obj[index].date);
    const imgURL = obj[index].image;
    element.parentElement.style.backgroundImage = `url('${imgURL}')`;
}
getJSON('./api.json').then(e=>{
    setSection1(e,majorOne.children[0],0);
    setSection1(e,mediumTwo.children[0],1);
    setSection1(e,minorThree.children[0],2);
    setSection1(e,minorFour.children[0],3);
    //console.log(e[0]);
})

