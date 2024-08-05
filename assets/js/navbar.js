document.getElementById("toggle").addEventListener('click', function() {
    let listmenu = document.getElementById('listMenu');
    let toggle = document.getElementById('toggle');

    if (listmenu.style.transform === 'translateX(0px)') {
        listmenu.style.transform = 'translateX(-100%)';
        toggle.classList.remove('active');
    } else {
        listmenu.style.transform = 'translateX(0px)';
        toggle.classList.add('active');
    }
});

window.addEventListener('scroll', function() {
    let header = document.getElementById('header');
    if (window.scrollY > 10) {
        header.classList.add('navfixed');
    } else {
        header.classList.remove('navfixed');
    }

    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("#listMenu a");

    sections.forEach((section) => {
        let rect = section.getBoundingClientRect();
        let id = section.getAttribute("id");

        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
});