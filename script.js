/* =================================================================
   script.js — All JavaScript for Uday Dixit's portfolio
   This file is linked from index.html using:
       <script src="script.js"></script>
   It is placed at the BOTTOM of the HTML (before </body>)
   so that all HTML elements exist before this code runs.
================================================================= */


/* -----------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   When the hamburger (☰) button is clicked:
   - We add the class "is-open" to the mobile menu → CSS shows it
   - If clicked again → class is removed → menu hides
----------------------------------------------------------------- */

// Get references to the button and the menu from the HTML
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Listen for a click on the hamburger button
menuBtn.addEventListener('click', function () {
  // .toggle() adds the class if missing, removes it if present
  mobileMenu.classList.toggle('is-open');
});


/* -----------------------------------------------------------------
   2. CLOSE MENU WHEN A MOBILE LINK IS CLICKED
   After tapping a nav link in mobile, the menu should close
   so the user lands on the section without the menu blocking it.
----------------------------------------------------------------- */

// Select all the <a> links inside the mobile menu
const mobileLinks = document.querySelectorAll('.nav-mobile-menu a');

// Loop through each link and add a click listener
mobileLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    // Remove is-open → hides the mobile menu
    mobileMenu.classList.remove('is-open');
  });
});


/* -----------------------------------------------------------------
   3. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   Handles links like href="#projects", href="#contact" etc.
   When clicked:
   - We prevent the browser's default "jump" behaviour
   - We calculate where the target section is on the page
   - We subtract the navbar height (52px) so the heading isn't hidden
   - We use window.scrollTo() with behavior: 'smooth' to glide there
----------------------------------------------------------------- */

// Listen for any click anywhere on the page
document.addEventListener('click', function (e) {

  // Find the nearest <a> tag from what was clicked
  // (useful if you click an SVG icon inside a link)
  const link = e.target.closest('a');

  // If no <a> was clicked, do nothing
  if (!link) return;

  // Read the href attribute value e.g. "#projects"
  const href = link.getAttribute('href');

  // Only handle internal links that start with "#"
  // External links (https://...) should open normally
  if (!href || !href.startsWith('#')) return;

  // Remove the "#" to get just the section ID e.g. "projects"
  const targetId = href.slice(1);

  // Find the HTML element with that ID
  const targetSection = document.getElementById(targetId);

  // Only proceed if we actually found a matching section
  if (targetSection) {

    // Stop the browser from doing its default anchor jump
    e.preventDefault();

    // Get the navbar height — we subtract this so the section heading
    // isn't hidden behind the sticky navbar after scrolling
    const navHeight = 52;

    // getBoundingClientRect().top = distance from top of VIEWPORT
    // window.scrollY = how far we've already scrolled down
    // Adding both gives distance from top of the full PAGE
    const sectionTop = targetSection.getBoundingClientRect().top
                       + window.scrollY
                       - navHeight;

    // Scroll smoothly to the calculated position
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'   // this is the key line — makes it glide
    });

    // Also close mobile menu if it was open
    mobileMenu.classList.remove('is-open');
  }

});


/* -----------------------------------------------------------------
   4. CONTACT FORM VALIDATION
   When the form is submitted:
   - We check each field one by one
   - If a field is empty or invalid → show a red error message below it
   - If ALL fields are valid → show a green success message, clear form
   - We never let the form actually submit to a server (no backend here)
----------------------------------------------------------------- */

// Get the form element
const contactForm = document.getElementById('contactForm');

// Listen for the form's submit event
contactForm.addEventListener('submit', function (e) {

  // Prevent page reload / default browser form submission
  e.preventDefault();

  // Read and trim (remove extra spaces) from each field
  const nameVal    = document.getElementById('name').value.trim();
  const emailVal   = document.getElementById('email').value.trim();
  const messageVal = document.getElementById('message').value.trim();

  // This flag will become false if any validation check fails
  let isValid = true;

  // --- Validate Name ---
  const errName = document.getElementById('err-name');
  if (nameVal === '') {
    errName.style.display = 'block';    // show red error text
    isValid = false;
  } else {
    errName.style.display = 'none';     // hide error if field is filled
  }

  // --- Validate Email ---
  // Regex pattern checks: "something @ something . something"
  const errEmail  = document.getElementById('err-email');
  const emailOk   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  if (!emailOk) {
    errEmail.style.display = 'block';
    isValid = false;
  } else {
    errEmail.style.display = 'none';
  }

  // --- Validate Message ---
  const errMessage = document.getElementById('err-message');
  if (messageVal === '') {
    errMessage.style.display = 'block';
    isValid = false;
  } else {
    errMessage.style.display = 'none';
  }

  // --- If everything passed: show success, reset form ---
  const successMsg = document.getElementById('formSuccess');
  if (isValid) {
    successMsg.style.display = 'block';   // show green ✓ message
    contactForm.reset();                  // clear all input fields
  } else {
    successMsg.style.display = 'none';    // hide success if errors exist
  }

});
