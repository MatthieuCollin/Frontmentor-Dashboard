// get div where the elements are going to be put in
const cardsBox = document.getElementById('cardsBox');

async function loadContent(time){
    // clear the div
    cardsBox.innerHTML = "";

    // fetch data from data.json
    let response = await fetch('../../data.json');
    let data = await response.json();

    // set color on p
    const button = document.getElementById(time);
    button.style.color = 'white';

    // for each data
    data.forEach(data => {

        // create all html elements
        const card = document.createElement('div');
        const img = document.createElement('img');
        const info = document.createElement('div');
     
        // get json data and put it in lowercase
        const name = data.title;
        const lcName = name.toLowerCase();

        //add class to cards div
        card.classList.add('cards');
        card.classList.add(lcName.replace(/\s/g, ''));
        img.src = `./images/icon-${lcName.replace(/\s+/g, '-')}.svg`;

        //add class and create elements for info div
        info.classList.add('info');
        const h3 = document.createElement('h3');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');

        // add content for info's element
        h3.innerHTML = `${data.title} <span> <img class="elipsis" src="../../images/icon-ellipsis.svg"/> </span>`;
        h2.innerHTML = `${time == "Daily" ? (data.timeframes.daily.current): time == "Weekly" ? (data.timeframes.weekly.current) : (data.timeframes.monthly.current)} hours`;
        p.innerHTML = `${time == "Daily" ? ('Yesterday - '  + data.timeframes.daily.previous): time == "Weekly" ? ('Last week - ' + data.timeframes.weekly.previous) : ('Last month - ' + data.timeframes.monthly.previous)} hours`;

        // append info's element
        info.appendChild(h3);
        info.appendChild(h2);
        info.appendChild(p);

        // append card's element
        card.appendChild(img);
        card.appendChild(info);

        // append card in cardsBox
        cardsBox.appendChild(card);
    });
}

loadContent('Daily');