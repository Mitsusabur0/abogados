// This will have the scripts

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#nav-menu");
    const body = document.body;
  
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.classList.toggle("menu-open");
    });
  
    document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      body.classList.remove("menu-open");
    }));
  });