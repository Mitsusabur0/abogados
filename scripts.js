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




// FORM VALIDATION
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (validateForm()) {
          submitForm();
      }
  });

  function validateForm() {
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const nombreEmpresa = document.getElementById('nombre_empresa').value.trim();
      const informacion = document.getElementById('informacion').value.trim();

      if (nombre === '' || email === '' || nombreEmpresa === '' || informacion === '') {
          showError('Por favor, complete todos los campos.');
          return false;
      }

      if (!isValidEmail(email)) {
          showError('Por favor, ingrese un email válido.');
          return false;
      }

      return true;
  }

  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  function submitForm() {
      const formData = new FormData(form);

      fetch(form.action, {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              showSuccess();
              form.reset();
          } else {
              showError('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          showError('Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
      });
  }

  function showSuccess() {
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
  }

  function showError(message) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
  }
});