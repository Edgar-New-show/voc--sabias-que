 const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("active");
  });
