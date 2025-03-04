/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
   const header = document.getElementById('header')
   // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
   this.scrollY >= 50 ? header.classList.add('blur-header') 
                      : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    opacity: 1,
    scale: 1.1,
    duration: 2500,
    delay: 300,
    // reset: true, // Animations repeat
})
  
sr.reveal(`.home__data, .about__img, .about__data, .visit__data`)

sr.reveal(`.home__image, .footer__img-1, .footer__img-2`, { rotate: {z: -15} })
sr.reveal(`.home__bread, .about__bread`, { rotate: {z: 15} })
sr.reveal(`.home__footer`, { scale: 1, origin: 'bottom' })

sr.reveal(`.new__card:nth-child(1) img`, { rotate: {z: -30}, distance: 0 })
sr.reveal(`.new__card:nth-child(2) img`, { rotate: {z: 15}, distance: 0, delay: 600 })
sr.reveal(`.new__card:nth-child(3) img`, { rotate: {z: -30}, distance: 0, delay: 900 })

sr.reveal(`.footer__container`, { scale: 1 })
sr.reveal(`.favorite__card img`, { interval: 100, rotate: {z: 15}, distance: 0 })

/*=============== LOGIN AND SIGNUP ===============*/
// Get DOM elements
const authButton = document.getElementById('auth-button');
const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authTabs = document.querySelectorAll('.auth__tab');

// Show/hide modal
authButton.addEventListener('click', () => {
  authModal.style.display = 'flex';
});

authClose.addEventListener('click', () => {
  authModal.style.display = 'none';
});

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.style.display = 'none';
  }
});

// Tab switching
authTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    authTabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Show/hide forms based on selected tab
    const formType = tab.dataset.tab;
    if (formType === 'login') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    }
  });
});

// Handle login form submission
// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login successful!');
      console.log('User:', data.user);
      authModal.style.display = 'none'; // Close modal on success
    } else {
      // Display error message returned from the backend
      alert(data.message || 'Login failed. Please try again.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please check your connection or try again later.');
  }
});


// Handle signup form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, confirm }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Signup successful!');
      authModal.style.display = 'none'; // Close modal on success
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An error occurred during signup.');
  }
});


