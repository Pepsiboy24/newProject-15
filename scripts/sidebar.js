const side_bar_open = document.querySelector("[data-menuOpen]")
const side_bar_close = document.querySelector("[data-menuClose]")
const sidebar = document.querySelector("[data-menu]")

side_bar_open.addEventListener("click", () => {
    sidebar.classList.add("show")
})

side_bar_close.addEventListener("click", () => {
    sidebar.classList.remove("show")
})