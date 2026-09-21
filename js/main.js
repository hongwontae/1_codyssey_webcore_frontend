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


/* GitHub ID */

const githubUsername =
    'hongwontae';


/* GitHub API URL */

const githubApiUrl =
    `https://api.github.com/users/${githubUsername}/repos`;


/* ========================================
   UI State
======================================== */

function showLoading() {

    projectsLoading.style.display =
        'block';

    projectsError.style.display =
        'none';

    projectsEmpty.style.display =
        'none';

    projectList.textContent =
        '';

}


function showProjects() {

    projectsLoading.style.display =
        'none';

    projectsError.style.display =
        'none';

    projectsEmpty.style.display =
        'none';

}


function showProjectError() {
  projectsLoading.style.display = 'none';
  projectsError.style.display = 'block';
  projectsEmpty.style.display = 'none';
  projectList.textContent = '';
}


function showEmpty() {

    projectsLoading.style.display =
        'none';

    projectsError.style.display =
        'none';

    projectsEmpty.style.display =
        'block';

    projectList.textContent =
        '';

}


/* ========================================
   Render Projects
======================================== */

function renderProjects(projects) {

    showProjects();


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
        배열 → HTML 문자열
    */

    projectList.innerHTML =
        projectHTML.join('');

}


/* ========================================
   Fetch GitHub Projects
======================================== */

async function fetchProjects() {

    showLoading();


    try {

        const response =
            await fetch(githubApiUrl);

        if (!response.ok) {

            throw new Error(
                'GitHub API 요청 실패'
            );

        }

    const projects =
        await response.json();

    const ownProjects =
        projects.filter((project) => {

            return project.fork === false;

        });

    if (ownProjects.length === 0) {

        showEmpty();

        return;

    }


renderProjects(ownProjects);

    } catch (error) {
  console.error('프로젝트를 불러오는 중 오류:', error);
  showProjectError();
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


menuToggle.addEventListener('click', () => {

    navMenu.classList.toggle('active');

});


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


const savedTheme =
    localStorage.getItem('theme');

if (savedTheme) {

    document.body.dataset.theme =
        savedTheme;

} else {

    document.body.dataset.theme =
        'dark';

}


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
   Scroll & Header
======================================== */

const scrollTopButton =
    document.querySelector('.scroll-top');

const header =
    document.querySelector('header');


/*
    페이지를 스크롤할 때
    Scroll Top 버튼과 Header를
    동시에 처리한다.
*/

window.addEventListener('scroll', () => {

    const scrollY =
        window.scrollY;


    /* -----------------------------
       Scroll Top Button

       300px 초과
       → 버튼 표시
    ----------------------------- */

    if (scrollY > 300) {

        scrollTopButton.classList.add(
            'show'
        );

    } else {

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

    } else {

        header.classList.remove(
            'scrolled'
        );

    }

});


/*
    ↑ 버튼 클릭
    → 페이지 최상단으로 이동
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

const observer = new IntersectionObserver(  
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        },{threshold: 0.2});

// section이면서 id가 home이 아닌 모든 것을 nodelist로 가져옵니다.
const sections =
    document.querySelectorAll(
        'section:not(#home)'
    );


sections.forEach((section) => {

    observer.observe(section);

});


/* ========================================
   Contact Form
======================================== */

const form =
    document.querySelector('#contact-form');


const nameInput =
    document.querySelector('#name');


const emailInput =
    document.querySelector('#email');


const messageInput =
    document.querySelector('#message');


const successMessage =
    document.querySelector('.form-success');


/* ========================================
   Error Message
======================================== */

function showError(input, message) {

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

    let isValid = true;


    /* 이름 */

    const name =
        nameInput.value.trim();


    if (name === '') {

        showError(
            nameInput,
            '이름을 입력해주세요.'
        );

        isValid = false;

    } else {

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

    } else if (!isValidEmail(email)) {

        showError(
            emailInput,
            '올바른 이메일 형식을 입력해주세요.'
        );

        isValid = false;

    } else {

        clearError(emailInput);

    }


    /* 메시지 */

    const message =
        messageInput.value.trim();


    if (message === '') {

        showError(
            messageInput,
            '메시지를 입력해주세요.'
        );

        isValid = false;

    } else {

        clearError(messageInput);

    }


    return isValid;

}


/* ========================================
   Submit Event
======================================== */

form.addEventListener('submit', (event) => {

    event.preventDefault();


    successMessage.textContent =
        '';


    const isValid =
        validateForm();


    if (!isValid) {

        return;

    }


    successMessage.textContent =
        '문의가 성공적으로 제출되었습니다.';

    
    form.reset();

});


/* ========================================
   Input Event
======================================== */

nameInput.addEventListener('input', () => {

    clearError(nameInput);

});


emailInput.addEventListener('input', () => {

    clearError(emailInput);

});


messageInput.addEventListener('input', () => {

    clearError(messageInput);

});