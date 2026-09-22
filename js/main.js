/* ========================================
   GitHub Projects
======================================== */

const projectList =
    document.querySelector('.project-list');

const projectsLoading =
    document.querySelector('.projects-loading');

const projectsError =
    document.querySelector('.projects-error');

const projectsEmpty =
    document.querySelector('.projects-empty');

const projectsRetry =
    document.querySelector('.projects-retry');


/* ========================================
   GitHub ID
======================================== */

const githubUsername =
    'hongwontae';


/* ========================================
   GitHub API URL
======================================== */

const githubApiUrl =
    `https://api.github.com/users/${githubUsername}/repos`;


/* ========================================
   Project State
======================================== */

/*
    프로젝트 상태

    loading : API 요청 중
    success : 프로젝트 가져오기 성공
    error   : API 요청 실패
    empty   : 프로젝트가 없음
*/

let projectState = 'loading';


/*
    GitHub에서 가져온 프로젝트 데이터
*/

let projects = [];


/* ========================================
   Project State 변경
======================================== */

function setProjectState(newState) {

    projectState = newState;

    renderProjectState();

}


/* ========================================
   Project State Rendering
======================================== */

function renderProjectState() {

    projectsLoading.style.display =
        'none';

    projectsError.style.display =
        'none';

    projectsEmpty.style.display =
        'none';


    /*
        프로젝트 목록 초기화
    */

    projectList.textContent =
        '';


    /*
        현재 상태에 따라
        어떤 화면을 보여줄지 결정
    */

    if (projectState === 'loading') {

        projectsLoading.style.display =
            'block';

    }


    else if (projectState === 'error') {

        projectsError.style.display =
            'block';

    }


    else if (projectState === 'empty') {

        projectsEmpty.style.display =
            'block';

    }


    else if (projectState === 'success') {

        renderProjects();

    }

}


/* ========================================
   Render Projects
======================================== */

function renderProjects() {

    const projectHTML =
        projects.map((project) => {

            /*
                구조분해 할당
            */

            const {
                name,
                html_url,
                description,
                stargazers_count,
                language
            } = project;


            /*
                템플릿 리터럴
            */

            return `
                <article class="project-card">

                    <h3>
                        ${name}
                    </h3>


                    <p>
                        ${
                            description ||
                            '설명이 없습니다.'
                        }
                    </p>


                    <div
                        class="project-card-info"
                    >

                        <span>
                            ⭐
                            ${stargazers_count}
                        </span>


                        <span>
                            ${
                                language ||
                                '언어 정보 없음'
                            }
                        </span>

                    </div>


                    <a
                        href="${html_url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on GitHub
                    </a>

                </article>
            `;

        });


    /*
        배열 → 하나의 HTML 문자열
    */

    projectList.innerHTML =
        projectHTML.join('');

}


/* ========================================
   Fetch GitHub Projects
======================================== */

async function fetchProjects() {


    setProjectState('loading');


    try {

        const response =
            await fetch(githubApiUrl);


        /*
            HTTP 응답이 성공적이지 않은 경우
        */

        if (!response.ok) {

            throw new Error(
                'GitHub API 요청 실패'
            );

        }

        const data =
            await response.json();


        projects =
            data.filter((project) => {

                return project.fork === false;

            });

        if (projects.length === 0) {

            setProjectState('empty');

            return;

        }



        setProjectState('success');


    }


    catch (error) {

        console.error(
            '프로젝트를 불러오는 중 오류:',
            error
        );

        setProjectState('error');

    }

}


/* ========================================
   Retry
======================================== */

projectsRetry.addEventListener(
    'click',
    () => {

        fetchProjects();

    }
);


/* ========================================
   Initial Request
======================================== */

fetchProjects();


/* ========================================
   Navigation Menu
======================================== */

const menuToggle =
    document.querySelector('.menu-toggle');

const navMenu =
    document.querySelector('.nav-menu');


/* ========================================
   Menu State
======================================== */

/*
    모바일 메뉴가 열려 있는지
    닫혀 있는지를 상태로 관리한다.

    true  = 열림
    false = 닫힘
*/

let menuState = false;


/* ========================================
   Menu State 변경
======================================== */

function setMenuState(isOpen) {

    menuState = isOpen;

    renderMenuState();

}


/* ========================================
   Menu Rendering
======================================== */

function renderMenuState() {

    /*
        menuState에 따라
        active 클래스 변경
    */

    if (menuState) {

        navMenu.classList.add('active');

    }

    else {

        navMenu.classList.remove('active');

    }

}


/* ========================================
   Menu Toggle
======================================== */

menuToggle.addEventListener(
    'click',
    () => {

        setMenuState(!menuState);

    }
);


/* ========================================
   Navigation Links
======================================== */

const navLinks =
    document.querySelectorAll(
        '.nav-menu a'
    );


navLinks.forEach((link) => {

    link.addEventListener(
        'click',
        () => {

            /*
                메뉴를 닫힌 상태로 변경
            */

            setMenuState(false);

        }
    );

});


/* ========================================
   Theme
======================================== */

const themeToggle =
    document.querySelector('.theme-toggle');


/* ========================================
   Theme State
======================================== */

/*
    현재 테마를 JavaScript 상태로 관리한다.

    dark
    light
*/

let themeState =
    localStorage.getItem('theme');


/*
    저장된 테마가 없으면
    기존 코드와 동일하게 dark를 사용
*/

if (!themeState) {

    themeState = 'dark';

}


/* ========================================
   Theme Rendering
======================================== */

function renderTheme() {

    /*
        상태를 실제 DOM에 반영
    */

    document.body.dataset.theme =
        themeState;


    /*
        버튼 아이콘도 현재 상태에 맞게 변경
    */

    if (themeState === 'dark') {

        themeToggle.textContent =
            '🌙';

    }

    else {

        themeToggle.textContent =
            '☀️';

    }

}


/* ========================================
   Initial Theme
======================================== */

renderTheme();


/* ========================================
   Theme Toggle
======================================== */

themeToggle.addEventListener(
    'click',
    () => {

        /*
            상태 변경
        */

        if (themeState === 'dark') {

            themeState = 'light';

        }

        else {

            themeState = 'dark';

        }


        /*
            다음 방문을 위해 저장
        */

        localStorage.setItem(
            'theme',
            themeState
        );


        /*
            상태 → 화면 업데이트
        */

        renderTheme();

    }
);


/* ========================================
   Scroll & Header
======================================== */

const scrollTopButton =
    document.querySelector('.scroll-top');

const header =
    document.querySelector('header');



window.addEventListener(
    'scroll',
    () => {

        const scrollY =
            window.scrollY;


        if (scrollY > 300) {

            scrollTopButton.classList.add(
                'show'
            );

        }

        else {

            scrollTopButton.classList.remove(
                'show'
            );

        }


        /* -----------------------------
           Header

           60px 초과
           → scrolled 클래스 추가
        ----------------------------- */

        if (scrollY > 60) {

            header.classList.add(
                'scrolled'
            );

        }

        else {

            header.classList.remove(
                'scrolled'
            );

        }

    }
);


/* ========================================
   Scroll Top Button
======================================== */

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

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            'visible'
                        );

                    }

                    else {

                        entry.target.classList.remove(
                            'visible'
                        );

                    }

                }
            );

        },

        {
            threshold: 0
        }

    );


/*
    Home을 제외한 모든 section
*/

const sections =
    document.querySelectorAll(
        'section:not(#home)'
    );


sections.forEach(
    (section) => {

        observer.observe(section);

    }
);


/* ========================================
   Contact Form
======================================== */

const form =
    document.querySelector(
        '#contact-form'
    );

const nameInput =
    document.querySelector(
        '#name'
    );

const emailInput =
    document.querySelector(
        '#email'
    );

const messageInput =
    document.querySelector(
        '#message'
    );

const successMessage =
    document.querySelector(
        '.form-success'
    );


/* ========================================
   Form State
======================================== */

/*
    폼의 현재 검증 상태

    valid   : 모든 입력값이 정상
    invalid : 하나 이상의 입력값이 잘못됨
*/

let formState = 'invalid';


/* ========================================
   Error Message
======================================== */

function showError(
    input,
    message
) {

    const errorMessage =
        input.parentElement.querySelector(
            '.error-message'
        );


    errorMessage.textContent =
        message;


    input.classList.add(
        'input-error'
    );

}


function clearError(input) {

    const errorMessage =
        input.parentElement.querySelector(
            '.error-message'
        );


    errorMessage.textContent =
        '';


    input.classList.remove(
        'input-error'
    );

}


/* ========================================
   Email Validation
======================================== */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);

}


/* ========================================
   Form Validation
======================================== */

function validateForm() {

    /*
        처음에는 정상이라고 가정
    */

    let isValid = true;


    /* ====================================
       이름
    ==================================== */

    const name =
        nameInput.value.trim();


    if (name === '') {

        showError(
            nameInput,
            '이름을 입력해주세요.'
        );

        isValid = false;

    }

    else {

        clearError(nameInput);

    }



    const email =
        emailInput.value.trim();


    if (email === '') {

        showError(
            emailInput,
            '이메일을 입력해주세요.'
        );

        isValid = false;

    }

    else if (
        !isValidEmail(email)
    ) {

        showError(
            emailInput,
            '올바른 이메일 형식을 입력해주세요.'
        );

        isValid = false;

    }

    else {

        clearError(emailInput);

    }


    /* ====================================
       메시지
    ==================================== */

    const message =
        messageInput.value.trim();


    if (message === '') {

        showError(
            messageInput,
            '메시지를 입력해주세요.'
        );

        isValid = false;

    }

    else {

        clearError(messageInput);

    }


    /* ====================================
       Form State 변경
    ==================================== */

    if (isValid) {

        formState = 'valid';

    }

    else {

        formState = 'invalid';

    }


    return isValid;

}


/* ========================================
   Submit Event
======================================== */

form.addEventListener(
    'submit',
    (event) => {

        event.preventDefault();

        successMessage.textContent =
            '';



        const isValid =
            validateForm();


        if (!isValid) {

            return;

        }

        if (formState === 'valid') {

            successMessage.textContent =
                '문의가 성공적으로 제출되었습니다.';

        }

        form.reset();

    }
);



/* ========================================
   Input Event
======================================== */

nameInput.addEventListener(
    'input',
    () => {

        clearError(nameInput);

    }
);


emailInput.addEventListener(
    'input',
    () => {

        clearError(emailInput);

    }
);


messageInput.addEventListener(
    'input',
    () => {

        clearError(messageInput);

    }
);

