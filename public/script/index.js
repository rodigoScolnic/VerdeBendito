const hMenuBtn = document.querySelector('.h-menu-btn')
const hMenu =  document.querySelector('.h-menu')
const uMenuBtn = document.querySelector('.fa-user')
const uMenu =  document.querySelector('.u-menu')

hMenuBtn.addEventListener('click', ()=> {
    hMenu.classList.toggle('active')
    uMenu.classList.remove('active')
    modalContainer.classList.remove('active')

})

uMenuBtn.addEventListener('click', ()=> {
    uMenu.classList.toggle('active')
    hMenu.classList.remove('active')
    signUpModal.classList.remove('active')
    logInModal.classList.remove('active')
})

document.addEventListener('click', (e) => {
    if(!hMenu.contains(e.target) && !hMenuBtn.contains(e.target)) {
        hMenu.classList.remove('active')
    }
})

document.addEventListener('click', (e) => {
    if(!uMenu.contains(e.target) && !uMenuBtn.contains(e.target)) {
        uMenu.classList.remove('active')
    }
})

const signUpModal = document.querySelector('#signup-modal')
const logInModal = document.querySelector('#login-modal')
const signUpBtn = document.querySelector('#signup-btn')
const logInBtn = document.querySelector('#login-btn')

signUpBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    uMenu.classList.remove('active')
    signUpModal.classList.add('active')
})

signUpModal.addEventListener('click', (e)=>{
    if(e.target === signUpModal){
        signUpModal.classList.remove('active')
    }
})

logInModal.addEventListener('click', (e)=>{
    if(e.target === logInModal){
        logInModal.classList.remove('active')
    }
})

logInBtn.addEventListener('click', (e)=> {
    e.preventDefault()
    uMenu.classList.remove('active')
    logInModal.classList.add('active')
})

/* categories */

const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 15,
    navigation: {
        nextEl: ".swiper-button-next", 
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: '.swiper-pagination',
    },
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
    },
  });

  /* serach bar */

 const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');

  input.addEventListener('input', async () => {
    const query = input.value.trim();
    results.innerHTML = '';

    if (query.length < 1){
        results.classList.remove('active')
        return;
    }  // no buscar si está vacío

    try {
      const res = await fetch(`/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.length === 0) {
        results.innerHTML = '<li>No se encontraron productos</li>';
        results.classList.remove('active')
        return;
      }

      

      data.forEach(p => {
        const li = document.createElement('li');
         const a = document.createElement('a');
        a.textContent = `${p.nickname} - ${p.name}`;
        a.href = `/products/${p.id}`; // <-- cambia esta ruta según tu sistema
        a.style.textDecoration = 'none';
        li.appendChild(a);
        results.appendChild(li);
      });

      results.classList.add('active')
    } catch (err) {
      console.error(err);
    }
  });






