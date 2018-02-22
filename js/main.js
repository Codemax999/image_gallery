// --- [Quotes] ---
// update quote
const setQuote = () => {

  getRandomQuote()
    .then(res => {
      const quote = document.querySelector('#quote');
      quote.classList.add('burst');
      setTimeout(() => quote.classList.remove('burst'), 1000);
      quote.textContent = res;
    });
};

// set last quote and always return different quote
let lastQuote;
const getRandomQuote = () => {
  return new Promise((resolve, reject) => {

    const quotes = [
      `"I haven't been everywhere, but it's on my list. - Susan Sontag"`,
      `"It is better to travel well than to arrive. - Buddha"`,
      `"Exploration is really the essence of the human spirit. - Frank Borman"`,
      `"A good traveler has no fixed plans, and is not intent on arriving. - Lao Tzu"`,
      `The real voyage of discovery consists not in seeking new landscapes, but in having new eyes. - Marcel Proust`,
      `Travel brings power and love back into your life. - Jalaluddin Rumi`,
      `Travel far enough, you meet yourself. - David Mitchell`
    ];

    const randomQuote = quotes[Math.floor((Math.random() * 4))];
    if (randomQuote == lastQuote) getRandomQuote();
    else {
      lastQuote = randomQuote;
      resolve(randomQuote);
    }
  });
};

// get new quote on logo click
document.querySelector('#logo').addEventListener('click', () => setQuote());


// --- [Photos] ---
// fetch
const search = () => {

  const key = '311211e1ea539658ae03ced95c4b012cbc1f8562b3c7213f399f16ed7de26643';
  const path = `https://api.unsplash.com/search/?client_id=${key}&photos?page=1&query=travel`;
  const myInit = {
    method: 'GET',
    headers: new Headers({ 'Accept-Version': 'v1' }),
    mode: 'cors',
    cache: 'default'
  };

  fetch(path, myInit)
    .then(res => res.json())
    .then(res => display(res));
};

// display
const display = val => {

  val.photos.results.forEach((el, index) => {
    
    const listItem = document.createElement('li');
    listItem.id = index;
    listItem.className = `li-${index}`;
    listItem.innerHTML = 
    `
      <img src="${el.urls.small}" 
        alt="travel image ${index}"
        class="img-${index}"
        id="${index}">

      <div id="${index}" class="details details-${index}">
        <span>
          <img src="../assets/user-icon.svg">
          ${el.user.name}
        </span>
        <span>
          <img src="../assets/heart.svg">
          ${el.likes}
        </span>
      </div>
    `;
    document.querySelector('.list-photos').appendChild(listItem);

    // mouse over, out and click events
    const item = document.querySelector(`.li-${index}`);
    item.addEventListener('mouseover', e => imageOver(e.target.id));
    item.addEventListener('mouseout', e => imageOut(e.target.id));
    item.addEventListener('click', e => imageClick(e.target.id));
  });
};


// --- [Photo Event Listeners] ---
// mouse over
const imageOver = el => {
  const image = document.querySelector(`.details-${el}`);
  image.classList.remove('animate-out');
  image.classList.add('animate-in');
};

// mouse out
const imageOut = el => {
  const image = document.querySelector(`.details-${el}`);
  image.classList.remove('animate-in');
  image.classList.add('animate-out');
};

// click for mobile 
const imageClick = el => {

  // remove previously clicked (if any)
  for (let x of document.querySelectorAll('.details')) {
    if (x.classList.contains('animate-in')) imageOut(x.id);
  }

  // animate in
  imageOver(el);
};


// --- [Page Event Listeners] ---
// page load 
document.addEventListener('DOMContentLoaded', () => {
  setQuote();
  search();
});
