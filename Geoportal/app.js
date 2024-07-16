let menu_btn = document.getElementById('apps');
let menu_box = document.getElementById('menu_box')

menu_btn.addEventListener('click', ()=>{
  menu_box.classList.toggle('ul_active');
})

