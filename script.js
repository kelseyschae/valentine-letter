
const MESSAGE = [
  "Hi KC,",
  "",
  "Just a quick note to say you are always there to make my days brighter.",
  "You’re my favorite notification. 💘",
  "",
  "Will you be my Valentine?",
    "",
  "P.S. Happy Anniversary!"
].join("\n");


const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
const typed = document.getElementById("typed");
const hearts = document.getElementById("hearts");
const hint = document.getElementById("hint");
const confettiBtn = document.getElementById("confettiBtn");

let isOpen = false;
let typingTimer = null;

function setPressed(value) {
  envelope.setAttribute("aria-pressed", String(value));
}

function clearTyping() {
  if (typingTimer) {
    clearInterval(typingTimer);
    typingTimer = null;
  }
}

function typeMessage(text, speed = 22) {
  clearTyping();
  typed.textContent = "";
  let i = 0;

  typingTimer = setInterval(() => {
    typed.textContent += text[i] ?? "";
    i += 1;

    if (i % 18 === 0) popHearts(1);

    if (i >= text.length) {
      clearTyping();
      hint.textContent = "Aww. Click ‘More hearts’ 💖";
      popHearts(6);
    }
  }, speed);
}

function openEnvelope() {
  if (isOpen) return;
  isOpen = true;
  envelope.classList.add("open");
  setPressed(true);
  hint.textContent = "Opening… 💌";
  setTimeout(() => typeMessage(MESSAGE), 700);
  popHearts(10);
}

function closeEnvelope() {
  isOpen = false;
  envelope.classList.remove("open");
  setPressed(false);
  hint.textContent = "Press Spacebar to open 💌";
  clearTyping();
  typed.textContent = "";
  popHearts(4);
}

function toggleEnvelope() {
  if (!isOpen) openEnvelope();
  else closeEnvelope();
}

function popHearts(count = 8) {
  const stage = document.querySelector(".stage");
  const rect = stage.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = Math.random() > 0.5 ? "♥" : "💗";

    const x = rect.left + rect.width * (0.25 + Math.random() * 0.5);
    const y = rect.top + rect.height * (0.55 + Math.random() * 0.2);

    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const drift = (Math.random() * 140 - 70).toFixed(2);
    const rise = (160 + Math.random() * 120).toFixed(2);
    const dur = (900 + Math.random() * 700).toFixed(0);

    heart.style.setProperty("--dx", `${drift}px`);
    heart.style.setProperty("--dy", `${-rise}px`);
    heart.style.setProperty("--dur", `${dur}ms`);

    hearts.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}


seal.addEventListener("click", (e) => {
  e.stopPropagation();
  openEnvelope();
});

envelope.addEventListener("click", () => {
  toggleEnvelope();
});

envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    toggleEnvelope();
  }
});


confettiBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  popHearts(18);
});

setTimeout(() => popHearts(4), 900);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    if (!isOpen) openEnvelope();
  }
});


