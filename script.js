/* ============================================================
   SECTION: ELEMENT SELECTION
   Purpose: Identify and store the main scroll container and 
            navigation button elements for later use.
   ============================================================ */
const scrollContainer = document.querySelector(".scroll-section");
const leftBtn = document.querySelector(".scroll-btn.left");
const rightBtn = document.querySelector(".scroll-btn.right");


/* ============================================================
   SECTION: BUTTON-BASED SCROLLING
   Purpose: Enables horizontal scrolling using left/right buttons
            for smooth navigation through scrollable content.
   ============================================================ */

// Scrolls the container 300px to the right when the right button is clicked
rightBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
});

// Scrolls the container 300px to the left when the left button is clicked
leftBtn.addEventListener("click", () => {
  scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
});


/* ============================================================
   SECTION: CLICK + DRAG SCROLLING
   Purpose: Allows the user to click and drag horizontally to 
            freely scroll left or right (desktop-friendly feature).
   ============================================================ */

let isDown = false;  // Tracks if the mouse is currently pressed
let startX;          // Stores the initial X position where the drag started
let scrollLeft;      // Records the container’s initial scroll position

// When mouse button is pressed down within scroll area
scrollContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  scrollContainer.classList.add("active"); // Optional: visual feedback (e.g., cursor style)
  startX = e.pageX - scrollContainer.offsetLeft; // Get X position relative to container
  scrollLeft = scrollContainer.scrollLeft;       // Store current scroll position
});

// When the mouse leaves the container area
scrollContainer.addEventListener("mouseleave", () => {
  isDown = false;
  scrollContainer.classList.remove("active");
});

// When the mouse button is released
scrollContainer.addEventListener("mouseup", () => {
  isDown = false;
  scrollContainer.classList.remove("active");
});

// When the mouse moves while holding down the click
scrollContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return; // Do nothing if not dragging
  e.preventDefault();  // Prevents text/image selection while dragging
  const x = e.pageX - scrollContainer.offsetLeft; // Current X position relative to container
  const walk = (x - startX) * 2; // Multiply for scroll speed (tweak value as needed)
  scrollContainer.scrollLeft = scrollLeft - walk; // Update horizontal scroll position
});


/* ============================================================
   SECTION: CARD ANIMATION ON SCROLL INTO VIEW
   Purpose: Automatically triggers animations when each card 
            enters the viewport (adds smooth reveal effects).
   ============================================================ */

const cards = document.querySelectorAll(".card");

// Create an IntersectionObserver to watch when cards become visible
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Apply a slight random delay for a more natural staggered effect
        entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
        entry.target.classList.add("animate"); // Add the animation-triggering class
        observer.unobserve(entry.target); // Stop observing once animation has played
      }
    });
  },
  { threshold: 0.2 } // Triggers when 20% of the card is visible in viewport
);

// Apply observer to all cards
cards.forEach((card) => observer.observe(card));
