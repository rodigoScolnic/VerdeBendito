document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".h-menu-btn");
  const menu = document.querySelector(".h-menu");
  const userButton = document.querySelector(".user-menu-btn");
  const userMenu = document.querySelector(".u-menu");
  const closeMenus = () => {
    menu?.classList.remove("active"); userMenu?.classList.remove("active");
    menuButton?.setAttribute("aria-expanded", "false"); userButton?.setAttribute("aria-expanded", "false");
  };
  menuButton?.addEventListener("click", () => {
    const open = !menu.classList.contains("active"); closeMenus();
    menu.classList.toggle("active", open); menuButton.setAttribute("aria-expanded", String(open));
  });
  userButton?.addEventListener("click", () => {
    const open = !userMenu.classList.contains("active"); closeMenus();
    userMenu.classList.toggle("active", open); userButton.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".h-menu, .h-menu-btn, .u-menu, .user-menu-btn")) closeMenus();
  });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenus(); });

  const input = document.querySelector("#searchInput");
  const results = document.querySelector("#searchResults");
  let debounce;
  if (input && results) {
    input.addEventListener("input", () => {
      clearTimeout(debounce);
      const query = input.value.trim(); results.replaceChildren(); results.classList.remove("active");
      if (query.length < 2) return;
      debounce = setTimeout(async () => {
        try {
          const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
          if (!response.ok) throw new Error("Falló la búsqueda");
          const products = await response.json(); results.replaceChildren();
          if (!products.length) {
            const li = document.createElement("li"); li.textContent = "No encontramos productos"; results.appendChild(li);
          } else products.forEach(product => {
            const li = document.createElement("li"), link = document.createElement("a");
            link.href = `/products/${encodeURIComponent(product.id)}`;
            link.textContent = [product.nickname, product.name].filter(Boolean).join(" · ");
            li.appendChild(link); results.appendChild(li);
          });
          results.classList.add("active");
        } catch (error) { console.error(error); }
      }, 220);
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".search-container")) results.classList.remove("active");
    });
  }

  const slider = document.querySelector(".category-swiper");
  if (slider && window.Swiper) new Swiper(slider, {
    slidesPerView: 1.25, spaceBetween: 14, loop: slider.querySelectorAll(".swiper-slide").length > 3,
    pagination: { el: slider.querySelector(".swiper-pagination"), clickable: true },
    breakpoints: { 560: { slidesPerView: 2.2 }, 800: { slidesPerView: 3.2 }, 1100: { slidesPerView: 4 } }
  });
});