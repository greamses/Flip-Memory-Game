


const cardsContainer = document.querySelector(".cards");
const turnsDiv = document.querySelector(".turns");
const timerDiv = document.querySelector(".timer");
const emojiNameDiv = document.querySelector(".emoji-name");

let currentCategoryIndex = 0;
let flips = 0;
let totalTurns = 0;
let matched = 0;
let initTimer = 60;
let timer = initTimer;
let timing;
let cardOne, cardTwo;
let disableDeck = false;
let emojisList = []; // Global variable for emojis list

const emojiCategories = [
  {
    categoryName: "Science",
    emojis: [
      { name: "Microscope", emoji: "🔬" },
      { name: "Telescope", emoji: "🔭" },
      { name: "Test Tube", emoji: "🧪" },
      { name: "Petri Dish", emoji: "🧫" },
      { name: "DNA", emoji: "🧬" },
      { name: "Syringe", emoji: "💉" },
      { name: "Stethoscope", emoji: "🩺" },
      { name: "Brain", emoji: "🧠" },
      { name: "Magnet", emoji: "🧲" },
      { name: "Atom Symbol", emoji: "⚛️" },
      { name: "Gear", emoji: "⚙️" },
      { name: "Thermometer", emoji: "🌡️" },
      { name: "Microscope Slide", emoji: "🔬" },
      { name: "Safety Jackets", emoji: "🦺" },
      { name: "Meridians", emoji: "🌐" },
      { name: "Sun", emoji: "☀️" },
      { name: "Cloud", emoji: "☁️" },
      { name: "Moon", emoji: "🌙" },
      { name: "Star", emoji: "⭐" },
      { name: "Rocket", emoji: "🚀" },
      { name: "Satellite", emoji: "🛰️" }
    ]
  },
  {
    categoryName: "Tech",
    emojis: [
      { name: "Laptop", emoji: "💻" },
      { name: "Desktop Computer", emoji: "🖥️" },
      { name: "Printer", emoji: "🖨️" },
      { name: "Mobile Phone", emoji: "📱" },
      { name: "Pager", emoji: "📟" },
      { name: "Fax Machine", emoji: "📠" },
      { name: "Electric Plug", emoji: "🔌" },
      { name: "Battery", emoji: "🔋" },
      { name: "Joystick", emoji: "🕹️" },
      { name: "Mouse", emoji: "🖱️" },
      { name: "Trackball", emoji: "🖲️" },
      { name: "Floppy Disk", emoji: "💾" },
      { name: "Optical Disk", emoji: "💿" },
      { name: "DVD", emoji: "📀" },
      { name: "Video Cassette", emoji: "📼" },
      { name: "Microchip", emoji: "💽" },
      { name: "Cable", emoji: "🔌" },
      { name: "Smartwatch", emoji: "⌚" },
      { name: "Game Controller", emoji: "🎮" },
      { name: "Robot", emoji: "🤖" }
    ]
  },
  {
    categoryName: "Math",
    emojis: [
      { name: "Abacus", emoji: "🧮" },
      { name: "Numbers", emoji: "🔢" },
      { name: "Symbols", emoji: "🔣" },
      { name: "Division Sign", emoji: "➗" },
      { name: "Addition Sign", emoji: "➕" },
      { name: "Minus Sign", emoji: "➖" },
      { name: "Multiplication Sign", emoji: "✖️" },
      { name: "Latin Letters", emoji: "🔠" },
      { name: "Currencies", emoji: "💱" },
      { name: "Chart Increasing", emoji: "📈" },
      { name: "Chart Decreasing", emoji: "📉" },
      { name: "Symbols", emoji: "🔣" },
      { name: "Books", emoji: "📚" },
      { name: "Pencil", emoji: "✏️" },
      { name: "Ruler", emoji: "📏" },
      { name: "Triangular Ruler", emoji: "📐" },
      { name: "Notepad", emoji: "🗒️" },
      { name: "Calendar", emoji: "📅" },
      { name: "Stopwatch", emoji: "⏱️" },
      { name: "Barchart", emoji: "📊" }
    ]
  },
  {
    categoryName: "Occupations",
    emojis: [
      { name: "Scientist", emoji: "🧑‍🔬" },
      { name: "Technologist", emoji: "🧑‍💻" },
      { name: "Mechanic", emoji: "🧑‍🔧" },
      { name: "Doctor", emoji: "👨‍⚕️" },
      { name: "Nurse", emoji: "👩‍⚕️" },
      { name: "Engineer", emoji: "👷‍♂️" },
      { name: "Artist", emoji: "👩‍🎨" },
      { name: "Chef", emoji: "👨‍🍳" },
      { name: "Teacher", emoji: "👩‍🏫" },
      { name: "Firefighter", emoji: "👨‍🚒" },
      { name: "Police Officer", emoji: "👮‍♂️" },
      { name: "Pilot", emoji: "👨‍✈️" },
      { name: "Farmer", emoji: "👩‍🌾" },
      { name: "Photographer", emoji: "📸" },
      { name: "Librarian", emoji: "📚" },
      { name: "Dentist", emoji: "🦷" },
      { name: "Musician", emoji: "🎼" },
      { name: "Actor", emoji: "🎭" },
      { name: "Construction Worker", emoji: "👷‍♀️" },
      { name: "Social Worker", emoji: "🧑‍💼" }
    ]
  },
  {
    categoryName: "Fruits",
    emojis: [
      { name: "Apple", emoji: "🍎" },
      { name: "Banana", emoji: "🍌" },
      { name: "Grapes", emoji: "🍇" },
      { name: "Orange", emoji: "🍊" },
      { name: "Watermelon", emoji: "🍉" },
      { name: "Pineapple", emoji: "🍍" },
      { name: "Strawberry", emoji: "🍓" },
      { name: "Mango", emoji: "🥭" },
      { name: "Peach", emoji: "🍑" },
      { name: "Cherry", emoji: "🍒" },
      { name: "Kiwi", emoji: "🥝" },
      { name: "Avocado", emoji: "🥑" },
      { name: "Tomato", emoji: "🍅" }
    ]
  },
  {
    categoryName: "Animals",
    emojis: [
      { name: "Dog", emoji: "🐶" },
      { name: "Cat", emoji: "🐱" },
      { name: "Lion", emoji: "🦁" },
      { name: "Tiger", emoji: "🐯" },
      { name: "Bear", emoji: "🐻" },
      { name: "Elephant", emoji: "🐘" },
      { name: "Monkey", emoji: "🐵" },
      { name: "Panda", emoji: "🐼" },
      { name: "Giraffe", emoji: "🦒" },
      { name: "Zebra", emoji: "🦓" },
      { name: "Horse", emoji: "🐴" },
      { name: "Koala", emoji: "🐨" },
      { name: "Penguin", emoji: "🐧" }
    ]
  },
  {
    categoryName: "Flags",
    emojis: [
      { name: "United States", emoji: "🇺🇸" },
      { name: "Canada", emoji: "🇨🇦" },
      { name: "United Kingdom", emoji: "🇬🇧" },
      { name: "Germany", emoji: "🇩🇪" },
      { name: "France", emoji: "🇫🇷" },
      { name: "Japan", emoji: "🇯🇵" },
      { name: "China", emoji: "🇨🇳" },
      { name: "Brazil", emoji: "🇧🇷" },
      { name: "India", emoji: "🇮🇳" },
      { name: "Australia", emoji: "🇦🇺" },
      { name: "South Korea", emoji: "🇰🇷" },
      { name: "Mexico", emoji: "🇲🇽" },
      { name: "South Africa", emoji: "🇿🇦" }
    ]
  }
];

function generateCards() {
  const currentCategory = emojiCategories[currentCategoryIndex];
  emojisList = currentCategory.emojis; // Update global emojisList

  let selectedEmojis = [];
  let emojisToPick = [...emojisList];

  while (selectedEmojis.length < 8) {
    const randomIndex = Math.floor(Math.random() * emojisToPick.length);
    selectedEmojis.push(emojisToPick[randomIndex]);
    emojisToPick.splice(randomIndex, 1);
  }

  let emojisArray = [...selectedEmojis, ...selectedEmojis];
  emojisArray.sort(() => Math.random() - 0.5);

  emojisArray.forEach(({ name, emoji }) => {
    const card = document.createElement('li');
    card.classList.add('card');

    const frontView = document.createElement('div');
    frontView.classList.add('view', 'front-view');
    frontView.textContent = '👆🏼';

    const backView = document.createElement('div');
    backView.classList.add('view', 'back-view');
    backView.textContent = emoji;

    card.appendChild(frontView);
    card.appendChild(backView);

    card.addEventListener("click", flipCard);
    cardsContainer.appendChild(card);
  });

  updateCategoryName(); // Update the category name whenever cards are generated
}

// Define the category name display
const categoryNameElement = document.getElementById("category-name");

function updateCategoryName() {
  const currentCategory = emojiCategories[currentCategoryIndex];
  categoryNameElement.innerText = currentCategory.categoryName;
}

function flipCard({ target: clickedCard }) {
  if (flips < 1) {
    countDown();
  }
  flips++;
  totalTurns++;
  turnsDiv.innerText = `Turns: ${totalTurns}`;

  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneEmoji = cardOne.querySelector(".back-view").textContent;
    let cardTwoEmoji = cardTwo.querySelector(".back-view").textContent;
    let cardOneName = emojisList.find(item => item.emoji === cardOneEmoji).name;
    let cardTwoName = emojisList.find(item => item.emoji === cardTwoEmoji).name;
    emojiNameDiv.innerHTML = ` <span class="emoji-name">${cardOneName}</span> / <span class="emoji-name">${cardTwoName}</span>`;
    matchCards(cardOneEmoji, cardTwoEmoji);
  }
}

function matchCards(emoji1, emoji2) {
  if (emoji1 === emoji2) {
    matched++;
    emojiNameDiv.querySelectorAll('.emoji-name').forEach(span => {
      span.style.color = 'green';
    });
    if (matched === 8) {
      setTimeout(() => {
        clearTime();
        takeScreenshot(); // Take screenshot when puzzle is completed
        reshuffle();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
    return;
  }

  emojiNameDiv.querySelectorAll('.emoji-name').forEach(span => {
    span.style.color = 'red';
  });

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function reshuffle() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  cardsContainer.innerHTML = '';
  emojiNameDiv.innerText = ''; // Clear the name display
  currentCategoryIndex = (currentCategoryIndex + 1) % emojiCategories.length; // Move to the next category
  generateCards();
}

function updateTimerDisplay() {
  timerDiv.innerText = timer;
}

function countDown() {
  timing = setInterval(() => {
    timer--;
    updateTimerDisplay();
    if (timer === 0) {
      clearInterval(timing);
      cardsContainer.querySelectorAll('.card').forEach(card => {
        card.classList.add('flip', 'disabled');
      });
      document.querySelector('.feedback').style.display = 'block';
    }
  }, 1000);
}

document.querySelector('.feedback .close-btn').addEventListener('click', () => {
  document.querySelector('.feedback').style.display = 'none';
});

function clearTime() {
  totalTurns = 0;
  turnsDiv.innerText = `Turns: ${totalTurns}`;
  timer = initTimer;
  flips = 0;
  updateTimerDisplay();
  clearInterval(timing);
  document.querySelector('.feedback').style.display = 'none';
}

function takeScreenshot() {
  html2canvas(cardsContainer).then(canvas => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'memory-game-screenshot.png';
    link.click();
  });
}

generateCards();

document.querySelector(".reshuffle").addEventListener("click", () => {
  clearTime();
  reshuffle();
});