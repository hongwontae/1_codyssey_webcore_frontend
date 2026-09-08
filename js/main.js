/* ========================================
   Navigation Menu
======================================== */

const menuToggle =
    document.querySelector('.menu-toggle');

const navMenu =
    document.querySelector('.nav-menu');


/*
    메뉴 버튼을 클릭하면
    active 클래스를 추가/제거한다.
*/

menuToggle.addEventListener('click', () => {

    navMenu.classList.toggle('active');

});


/*
    모바일 메뉴의 링크를 클릭하면
    메뉴를 닫는다.
*/

const navLinks =
    document.querySelectorAll('.nav-menu a');


navLinks.forEach((link) => {

    link.addEventListener('click', () => {

        navMenu.classList.remove('active');

    });

});


/* ========================================
   Theme
======================================== */

const themeToggle =
    document.querySelector('.theme-toggle');


/*
    localStorage에서
    이전에 선택한 테마를 가져온다.
*/

const savedTheme =
    localStorage.getItem('theme');


/*
    저장된 테마가 있으면 사용한다.

    저장된 테마가 없다면
    Dark를 기본값으로 사용한다.
*/

if (savedTheme) {

    document.body.dataset.theme =
        savedTheme;

} else {

    document.body.dataset.theme =
        'dark';

}


/*
    현재 테마에 맞게
    버튼 아이콘을 변경한다.
*/

function updateThemeButton() {

    const currentTheme =
        document.body.dataset.theme;


    if (currentTheme === 'dark') {

        themeToggle.textContent = '🌙';

    } else {

        themeToggle.textContent = '☀️';

    }

}


updateThemeButton();


/*
    Theme 버튼 클릭
*/

themeToggle.addEventListener('click', () => {

    const currentTheme =
        document.body.dataset.theme;


    const newTheme =
        currentTheme === 'dark'
            ? 'light'
            : 'dark';


    /*
        화면의 테마 변경
    */

    document.body.dataset.theme =
        newTheme;


    /*
        다음 방문을 위해 저장
    */

    localStorage.setItem(
        'theme',
        newTheme
    );


    /*
        버튼 아이콘 변경
    */

    updateThemeButton();

});


/* ========================================
   Scroll Top Button
======================================== */

const scrollTopButton =
    document.querySelector('.scroll-top');


/*
    페이지를 스크롤하면
    현재 스크롤 위치를 확인한다.
*/

window.addEventListener('scroll', () => {

    if (window.scrollY > 300) {

        scrollTopButton.classList.add(
            'show'
        );

    } else {

        scrollTopButton.classList.remove(
            'show'
        );

    }

});


/*
    ↑ 버튼 클릭
*/

scrollTopButton.addEventListener(
    'click',
    () => {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    }
);


/* ========================================
   Section Animation
======================================== */


/*
    section이 화면에 들어왔는지
    감시하는 객체
*/

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    /*
                        화면에 들어오면
                        visible 추가
                    */

                    entry.target.classList.add(
                        'visible'
                    );

                } else {

                    /*
                        화면에서 나가면
                        visible 제거

                        → 다시 들어오면
                        다시 애니메이션 실행
                    */

                    entry.target.classList.remove(
                        'visible'
                    );

                }

            });

        },
        {
            /*
                section의 20% 정도가
                화면에 들어오면 실행
            */

            threshold: 0.2
        }
    );


/*
    Home은 제외한다.

    Home은 처음부터 보여야 하기 때문.
*/

const sections =
    document.querySelectorAll(
        'section:not(#home)'
    );


/*
    각각의 section을 감시한다.
*/

sections.forEach((section) => {

    observer.observe(section);

});


/* ========================================
   Contact Form
======================================== */

const form =
    document.querySelector(
        '#contact-form'
    );


form.addEventListener(
    'submit',
    (event) => {

        /*
            실제 서버로 전송되는 것을 막는다.
        */

        event.preventDefault();


        /*
            현재는 테스트용
        */

        console.log(
            'Form submitted'
        );

    }
);