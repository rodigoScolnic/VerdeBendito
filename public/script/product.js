  const leftMenuOp = document.querySelector('.left-menu-op');
  const leftBtnOp = document.querySelector('.options')
  const arrow = document.querySelector('.options i')


  leftBtnOp.addEventListener('click', ()=> {
    leftMenuOp.classList.toggle('active');
    leftBtnOp.classList.toggle('active');

    if(leftBtnOp.classList.contains('active')){
      arrow.style.transform = 'rotate(180deg)'
    }else{
      arrow.style.transform = 'rotate(0deg)'
    }
  })