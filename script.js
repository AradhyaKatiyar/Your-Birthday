// Countdown Logic
const countdown = document.getElementById("countdown");
const message = document.getElementById("birthdayMessage");
const targetDate = new Date("June 6, 2025 00:00:00").getTime();



let shown = false;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0 && !shown) {
    countdown.innerHTML = "🎉 It's time! 🎉";
    showMessage();
    launchConfetti();
    shown = true;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.innerHTML = `
    ${days}d ${hours}h ${minutes}m ${seconds}s until your 21st Birthday!
  `;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Slideshow Logic
const slidesWrapper = document.querySelector(".slides-wrapper");
const totalSlides = document.querySelectorAll(".slide").length;
let currentIndex = 0;

function slideNext() {
  currentIndex = (currentIndex + 1) % totalSlides;
  slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(slideNext, 4000); // Change slide every 4 seconds

// Show Message and Confetti
function showMessage() {
  message.style.display = "block";
}

// Confetti (Tiny JavaScript confetti)
function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 300 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10 + 5,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    tilt: Math.random() * 10 - 10
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    update();
  }

  function update() {
    confetti.forEach(p => {
      p.y += Math.cos(p.d) + 2;
      p.x += Math.sin(p.tilt);
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  function animate() {
    draw();
    requestAnimationFrame(animate);
  }

  animate();
}
