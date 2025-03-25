document.addEventListener("DOMContentLoaded", function () {
    // Hover effect for elements
    const elements = document.querySelectorAll(".table-container, .carousel-item, .nav-links a, .logo");

    elements.forEach((element) => {
        element.addEventListener("mouseover", () => {
            element.style.transform = "scale(1.05)";
        });

        element.addEventListener("mouseout", () => {
            element.style.transform = "scale(1)";
        });
    });
});

// Dropdown Toggle
document.querySelector(".dropbtn").addEventListener("click", function() {
    document.querySelector(".dropdown-content").classList.toggle("show");
});

// Close Dropdown If Clicked Outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
