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



// JS to show lawyers new window on click
const modal = document.getElementById("team-modal");
const cards = document.querySelectorAll(".team-card");
const closeBtn = document.querySelector(".close");

const teamData = {
  jose: {
    name: "José Antonio Abarca",
    position: "Socio Fundador",
    email: "jabarca@abarcazanartu.cl",
    phone: "+56 9 9221 4351",
    linkedin: "https://www.linkedin.com/in/josé-antonio-abarca-193173304/",
    description: "Abogado Universidad Diego Portales (1997) Abogado, con más de 25 años de ejercicio libre de la profesión. En el ámbito privado, socio fundador de Estudio Jurídico Abarca & Abogados, que se transformó a Abarca Zañartu Abogados desde 2022. Estudio que asesora a empresas de diversos ámbitos de carácter civil. Funcionario Juzgado de Policía Local de Recoleta (1°) y Pudahuel (1°) desde 1998 a 2006.- Desempeñándose, además, como Juez Arbitro, desde el periodo 2017 a la fecha, nombrado por la Ilustrísima Corte de Apelaciones de Santiago. Mediador Familiar.",
    image: "../images/jose.jpg"
  },
  beltran: {
    name: "Beltrán Zañartu Urbina",
    position: "Socio",
    email: "bzanartu@abarcazanartu.cl",
    phone: "+56 9 6657 8170",
    linkedin: "https://www.linkedin.com/in/beltrán-francisco-zañartu-urbina-445731140/",
    description: "Abogado Universidad de Chile (2016). Especialista en Derecho Ambiental. Beltrán comenzó su carrera en la Superintendencia de Servicios Sanitarios, para luego desempeñarse en los estudios jurídicos VGC Abogados y Eelaw Medio Ambiente y Energía. Forma parte del equipo de Abarca Zañartu Abogados desde marzo del 2022, estableciéndose como socio en junio de 2023. Beltrán es también Mediador Familiar de la Universidad Diego Portales y director de la Fundación Redes en Cajas.",
    image: "../images/bel.jpg"
  },
  bianca: {
    name: "Bianca Barrueto Zamora",
    position: "Asociada",
    email: "bbarrueto@abarcazanartu.cl",
    phone: "+56 9 6247 3575",
    linkedin: "https://www.linkedin.com/in/bianca-barrueto-zamora-985484ab/",
    description: "Bianca Isa Barrueto Zamora abogada Universidad Central de Chile (2010). Mediadora Familiar, Universidad Católica de Chile. Abogada, con más de 12 años de experiencia en el ámbito público y privado. Cofundadora y Abogada corporativa de Bike Santiago, proyecto desarrollado por Banco Itaú, Empresa Trek (Waterloo USA) y distintas municipalidades de la ciudad de Santiago (2012-2017). Funcionaria Pública, de la Municipalidad de Lo Barnechea y San Miguel, desempeñándose como abogada en Secretaría Municipal y Dirección Jurídica (2017-2020). Bianca se unió al equipo de Abarca Zañartu como Abogada Asociada en agosto de 2024.",
    image: "../images/bianca.jpeg",
  }
};

cards.forEach(card => {
  card.addEventListener("click", () => {
    const member = card.dataset.member;
    const data = teamData[member];
    
    document.getElementById("modal-image").src = data.image;
    document.getElementById("modal-image").alt = data.name;
    document.getElementById("modal-name").textContent = data.name;
    document.getElementById("modal-position").textContent = data.position;
    document.getElementById("modal-email").textContent = data.email;
    document.getElementById("modal-phone").textContent = data.phone;
    document.getElementById("modal-linkedin").href = data.linkedin;
    document.getElementById("modal-description").textContent = data.description;
    
    modal.style.display = "block";
    void modal.offsetWidth;
    modal.classList.add("show");
  });
});

closeBtn.onclick = () => {
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300); // Wait for transition to finish
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300); // Wait for transition to finish
  }
};
