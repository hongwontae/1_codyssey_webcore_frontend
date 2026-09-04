const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {

    navMenu.classList.toggle('active');

});

const themeToggle =
    document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {

    document.body.dataset.theme =
        document.body.dataset.theme === 'dark'
            ? 'light'
            : 'dark';

});

localStorage.setItem('theme', 'dark');

const savedTheme =
    localStorage.getItem('theme');

if (savedTheme) {
    document.body.dataset.theme = savedTheme;
}

window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }

});

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }

        });

    },
    {
        threshold: 0.2
    }
);

const sections =
    document.querySelectorAll('section');

sections.forEach((section) => {
    observer.observe(section);
});

const form =
    document.querySelector('#contact-form');

form.addEventListener('submit', (event) => {

    event.preventDefault();

});