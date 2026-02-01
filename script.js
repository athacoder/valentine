let sections = document.querySelectorAll(".section");
let current = 0;

function next() {
  sections[current].classList.remove("active");
  current++;
  sections[current].classList.add("active");

  if (current === 1) typeLetter();
}

/* MUSIC */
function toggleMusic() {
  let music = document.getElementById("music");
  music.volume = 0;
  music.play();

  let fade = setInterval(() => {
    if (music.volume < 0.8) music.volume += 0.02;
    else clearInterval(fade);
  }, 200);
}

/* LETTER */
const letter = `
Dear Shravani,
I don’t know when it happened.
Maybe slowly.
Maybe all at once.
But somewhere between our talks,
our laughs,
and our silence…
you became my safe place.
And this little thing I made?
It’s not to impress you.
It’s just my heart,
trying to speak.
— Always yours ❤️
`;

let i = 0;
function typeLetter() {
  let el = document.getElementById("letterText");
  if (i < letter.length) {
    el.innerHTML += letter.charAt(i);
    i++;
    setTimeout(typeLetter, 40);
  }
}

/* QUIZ */
const quiz = [
  {
    q: "💝 What was the first gift I got you?",
    options: ["A chocolate", "Keychain", "A letter", "Flowers"],
    correct: 1
  },
  {
    q: "❤️ When was the first time we said I love you to each other?",
    options: ["6th December", "When we met in Tuscan", "Ganpati celebration", "During school"],
    correct: 2
  },
  {
    q: "📧 When did we create Ashiana’s Gmail account?",
    options: ["December", "November", "January", "February"],
    correct: 0
  },
  {
    q: "💞 What is our favourite activity to do together?",
    options: [
      "Stare at each other",
      "Movie together",
      "Playing games together",
      "Sending reels to each other"
    ],
    correct: "all"
  }
];

let qIndex = 0;

function loadQuestion() {
  document.getElementById("question").innerText = quiz[qIndex].q;
  let html = "";

  quiz[qIndex].options.forEach((opt, i) => {
    html += `<button onclick="checkAnswer(${i})">${opt}</button><br>`;
  });

  document.getElementById("answers").innerHTML = html;
  document.getElementById("feedback").innerHTML = "";
}

function checkAnswer(i) {
  let q = quiz[qIndex];

  if (q.correct === "all" || i === q.correct) {
    confetti();
    setTimeout(() => {
      qIndex++;
      if (qIndex < quiz.length) loadQuestion();
      else next();
    }, 900);
  } else {
    document.getElementById("feedback").innerHTML = "😔 Try again baby";
  }
}

loadQuestion();

/* CONFETTI */
function confetti() {
  for (let i = 0; i < 120; i++) {
    let c = document.createElement("div");
    c.style.position = "fixed";
    c.style.left = Math.random() * 100 + "vw";
    c.style.top = "-10px";
    c.style.width = "10px";
    c.style.height = "10px";
    c.style.background = "pink";
    c.style.animation = "fall 2.5s linear";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2500);
  }
}

/* NO BUTTON ESCAPE */
function moveNo() {
  let btn = document.querySelector(".no");
  btn.style.left = Math.random() * 80 + "%";
  btn.style.top = Math.random() * 80 + "%";
}

/* YES */
function yesClicked() {
  confetti();
  setTimeout(() => next(), 1200);
}

/* HEART CURSOR */
document.addEventListener("mousemove", e => {
  let heart = document.createElement("div");
  heart.innerHTML = "💗";
  heart.style.position = "fixed";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  heart.style.pointerEvents = "none";
  heart.style.animation = "fadeHeart 1s forwards";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
});
