import { auth, addToCart } from './api.js';

const loginPath = "login";
const registerPath = "create-user";

let searchForm;
searchForm = document.querySelector('.search-form');


document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

const createAccountLink = document.getElementById('create-account-link');
const goToLoginLink = document.getElementById('go-to-login');
const loginFormDiv = document.getElementById('login-form-div');
const registerFormDiv = document.getElementById('register-form-div');

createAccountLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginFormDiv.style.display = 'none';
    registerFormDiv.style.display = 'block';
});

goToLoginLink.addEventListener('click', function(event) {
    event.preventDefault();
    loginFormDiv.style.display = 'block';
    registerFormDiv.style.display = 'none';
});



const loginFormContainer = document.querySelector('.login-form-container');


// Get all elements with the id 'btn'
const buttons = document.querySelectorAll('#btn');

// Loop through each button and add event listener
buttons.forEach(button => {
  button.onclick = () => {
    loginFormContainer.classList.toggle('active');
  };
});

document.querySelector('#cart').onclick = () =>{
  loginFormContainer.classList.toggle('active');
}

document.querySelector('#login-btn').onclick = () =>{
  loginFormContainer.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginFormContainer.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  console.log("Called")
  setTimeout(loader, 4000);
}

// Get the form element
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.querySelector('input[type=email]').value;
  const password = document.querySelector('input[type=password]').value;

  try {
    const data = await auth(email, password,loginPath);

    if (data.success) {
      loginFormContainer.classList.remove('active');
      console.log('User login successfully');
    } else {
      console.log('User login failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Get the form element
document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
    const data = await auth(email, password,registerPath);
    console.log(data)
    if (data.success) {
    console.log('User created successfully');
    } else {
    console.log('User creation failed:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});