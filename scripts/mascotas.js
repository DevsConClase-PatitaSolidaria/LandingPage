document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const ordenarSelect = document.getElementById("ordenarSelect");
  const galeria = document.getElementById("galeriaMascotas");
  const checkboxes = document.querySelectorAll(".filtro-opciones input");

  renderMascotas(mascotas);

  function renderMascotas(lista) {
    galeria.innerHTML = "";
    lista.forEach((m) => {
      const div = document.createElement("div");
      div.classList.add("mascota");
      div.setAttribute("data-sexo", m.sexo);
      div.setAttribute("data-edad", m.edad);
      div.setAttribute("data-peso", m.peso);
      div.setAttribute("data-tamaño", m.tamaño);
      div.setAttribute("data-pelo", m.pelo);
      div.setAttribute("data-actividad", m.actividad);
      div.setAttribute("data-nombre", m.nombre.toLowerCase());

      div.innerHTML = `
        <img src="assets/img/${m.imagen}" alt="${m.nombre}" />
        <h3>${m.nombre}</h3>
        <a href="${m.html.toLowerCase()}.html" class="btn primary">Adoptar</a>
      `;
      galeria.appendChild(div);
    });
  }

  searchInput.addEventListener("input", () => {
    const filtro = searchInput.value.toLowerCase();
    const mascotas = galeria.querySelectorAll(".mascota");

    mascotas.forEach((m) => {
      const nombre = m.dataset.nombre;
      m.style.display = nombre.includes(filtro) ? "block" : "none";
    });
  });

  ordenarSelect.addEventListener("change", () => {
    const orden = ordenarSelect.value;
    const tarjetas = Array.from(galeria.querySelectorAll(".mascota"));

    tarjetas.sort((a, b) => {
      const nomA = a.dataset.nombre;
      const nomB = b.dataset.nombre;
      return orden === "az"
        ? nomA.localeCompare(nomB)
        : nomB.localeCompare(nomA);
    });

    galeria.innerHTML = "";
    tarjetas.forEach((t) => galeria.appendChild(t));
  });

  checkboxes.forEach((cb) => cb.addEventListener("change", filtrarMascotas));

  function filtrarMascotas() {
    const filtros = {};

    checkboxes.forEach((cb) => {
      if (cb.checked) {
        const campo = cb.name;
        filtros[campo] = filtros[campo] || [];
        filtros[campo].push(cb.value);
      }
    });

    document.querySelectorAll(".mascota").forEach((m) => {
      let visible = true;
      for (const campo in filtros) {
        const val = m.dataset[campo];
        if (!filtros[campo].includes(val)) {
          visible = false;
          break;
        }
      }
      m.style.display = visible ? "block" : "none";
    });
  }

  document.querySelectorAll(".filtro-titulo").forEach((titulo) => {
    titulo.addEventListener("click", () => {
      const filtro = titulo.parentElement;
      filtro.classList.toggle("active");
      const toggle = titulo.querySelector(".toggle");
      toggle.textContent = filtro.classList.contains("active") ? "−" : "+";
    });
  });

  document.getElementById("limpiarFiltros").addEventListener("click", () => {
    checkboxes.forEach((cb) => (cb.checked = false));
    searchInput.value = "";
    ordenarSelect.value = "az";
    renderMascotas(mascotas);
  });
});
