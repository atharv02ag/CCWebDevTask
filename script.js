const url = 'https://coding-week-2024-api.onrender.com/api/data';

const getJSON = async (url)=>{
    const response = await fetch(url);
    const data = response.json();
    return data;
}

const nav = document.querySelector('nav');
const sideHeading = document.querySelector('.side-bar .side-heading');
nav.addEventListener("click",(e)=>{
    if(!e.target.matches('span')) return;
    for(let child of nav.children){
        if(child.matches('.selected-nav')){
            child.classList.remove('selected-nav');
            e.target.classList.add('selected-nav');
        }
    }
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
const sideArticles = document.querySelector('.side-articles');
const article = document.querySelector('.article');
const closeButton = document.querySelector('.article img');

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

const getRandom=(min, max)=>{
    return Math.floor(Math.random() * (max - min) + min);
}

const setSection1 = (obj,element,id)=>{
    const newtype = document.createElement('span');
    newtype.classList.add('type');
    newtype.innerText = obj[id-1].type;
    element.insertBefore(newtype,element.children[0]);
    let headline = obj[id-1].headline;
    if(headline.length > 35){
        headline = headline.substring(0,35);
        headline += '..';
    }
    element.children[2].innerText = headline;
    element.children[3].innerText = obj[id-1].author;
    element.children[4].children[1].innerText = convDate(obj[id-1].date);
    const imgURL = obj[id-1].image;
    element.parentElement.style.backgroundImage = `url('${imgURL}')`;
    element.parentElement.setAttribute('data-id',id);
}

const setSection2 = (obj,element,id)=>{
    const newli = document.createElement('li');
    newli.classList.add('side-article');
    newli.classList.add('pop-anim-side');
    const sideImg = document.createElement('img');
    sideImg.classList.add('side-img');
    const imgURL = obj[id-1].image;
    sideImg.src = imgURL;
    newli.appendChild(sideImg);

    const sideText = document.createElement('div');
    sideText.classList.add('side-text');
    const sideHeadline = document.createElement('p');
    sideHeadline.classList.add('side-headline');
    let headline = obj[id-1].headline;
    if(headline.length > 45){
        headline = headline.substring(0,45);
        headline += '..';
    }
    sideHeadline.innerText = headline;
    sideText.appendChild(sideHeadline);

    const releaseDate = document.createElement('div');
    releaseDate.classList.add('release-date');
    const calender = document.createElement('img');
    calender.classList.add('calender');
    calender.src='calender.svg';
    releaseDate.appendChild(calender);

    const tareek = document.createElement('span');
    tareek.innerText = convDate(obj[id-1].date);
    releaseDate.appendChild(tareek);

    sideText.appendChild(releaseDate);
    newli.appendChild(sideText);
    newli.setAttribute('data-id',id);
    element.appendChild(newli);
}

const writeArticle = (obj,id,posX,posY,side)=>{
    article.children[1].innerText = obj[id-1].content;
    if(side==true){
        article.style.left = `${posX}px`;
        article.style.top = `${posY+window.scrollY}px`;
    }
    else{
        article.style.left = `${posX}px`;
        article.style.top = `${posY+window.scrollY}px`;
    }  
}

window.addEventListener("load",()=>{
    article.style.opacity = 0;
})

closeButton.addEventListener('click',()=>{
    article.style.opacity = 0;
})

getJSON('./api.json').then(data=>{
    setSection1(data,majorOne.children[0],1);
    setSection1(data,mediumTwo.children[0],2);
    setSection1(data,minorThree.children[0],3);
    setSection1(data,minorFour.children[0],4);
    for(let i = 4; i<data.length; i++){
        setSection2(data,sideArticles,i);
    } 
    const content = document.querySelector('.content');
    content.addEventListener('click',(e)=>{
        for(let i = 1; i<=data.length; i++){
            if(e.target.closest(`[data-id="${i}"]`) != null){
                article.style.opacity = 1;
                writeArticle(data,i,e.x,e.y,false);      
           }
        }      
    })
    sideArticles.addEventListener('click',(e)=>{
        for(let i = 1; i<=data.length; i++){
            if(e.target.closest(`[data-id="${i}"]`) != null){
                article.style.opacity = 1;
                const posX = e.x-article.offsetWidth;
                writeArticle(data,i,posX,e.y,true);      
           }
        }   
    })
    
})

