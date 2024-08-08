document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector("#hamburger");
  const navMenu = document.querySelector("#nav-menu");
  const body = document.body;

  function toggleMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.classList.toggle("menu-open");
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    body.classList.remove("menu-open");
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener("click", (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", closeMenu));

  // Prevent scrolling when menu is open
  document.addEventListener('touchmove', (e) => {
    if (body.classList.contains('menu-open')) {
      e.preventDefault();
    }
  }, { passive: false });
});