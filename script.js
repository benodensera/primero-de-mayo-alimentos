// AOS.init({duration:1000, once:true});

function toggleMenu(){
    document.getElementById('menu').classList.toggle('active');
}

function animateCounter(id, target, speed){
    let count = 0;
    const interval = setInterval(() =>{
        if (count < target){
            count++;
            document.getElementById(id).innerText = count;
            } else {
                clearInterval(interval);
            }
        }, speed)
    }

animateCounter('courseCount', 150, 10);
animateCounter('studentCount', 810, 20);



const wrapper = document.getElementById('testimonialWrapper');
const dots = document.querySelectorAll('.dot');

if (wrapper && dots.length > 0) {

    let currentSlide = 0;
    const totalSlides = dots.length;
    let sliderInterval;

    function moveToSlide(index){
        currentSlide = index;

        wrapper.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    function startSlider(){
        sliderInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            moveToSlide(currentSlide);
        }, 5000);
    }

    function resetSlider(){
        clearInterval(sliderInterval);
        startSlider();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetSlider();
        });
    });

    moveToSlide(0);
    startSlider();
}



const topBtn = document.getElementById('backToTop');
window.onscroll = () => {
    if (topBtn) {
        topBtn.style.display = window.scrollY > 2000 ? 'block' : 'none';
    }
};

topBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth'
    });    
});





const quizWrapper = document.getElementById('quizWrapper');
const quizSlides = document.querySelectorAll('.quiz-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const resultsContainer = document.getElementById('resultsContainer');

const progressBar = document.getElementById('quizProgressBar');

let quizCurrentSlide = 0;
let answers = new Array(quizSlides.length - 1).fill(null);

function showQuizSlide(index){
    quizWrapper.style.transform = `translateX(-${index * 100}%)`;

    prevBtn.style.display = index === 0 ? 'none' : 'inline-block';

    if(index === quizSlides.length - 2){
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }

    const totalQuestions = quizSlides.length - 1; 

    if(index === quizSlides.length - 1){
        document.querySelector('.quiz-progress').style.display = 'none';
    } else {
        document.querySelector('.quiz-progress').style.display = 'block';

        const progress = (index / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

document.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {

        const parentSlide = btn.closest('.quiz-slide');
        const slideIndex = [...quizSlides].indexOf(parentSlide);

        if (answers[slideIndex] !== null) return;

        const options = parentSlide.querySelectorAll('.quiz-option');

        answers[slideIndex] = [...options].indexOf(btn);

        options.forEach(o => {
            o.classList.remove('selected');
            o.disabled = true;
        });

        btn.classList.add('selected');
    });
});

nextBtn.addEventListener('click', () => {
    if(quizCurrentSlide < quizSlides.length - 2){
        quizCurrentSlide++;
        showQuizSlide(quizCurrentSlide);
    }
});

prevBtn.addEventListener('click', () => {
    if(quizCurrentSlide > 0){
        quizCurrentSlide--;
        showQuizSlide(quizCurrentSlide);
    }
});

finishBtn.addEventListener('click', () => {
    showResults();
    quizCurrentSlide++;
    showQuizSlide(quizCurrentSlide);

    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    finishBtn.style.display = 'none';
    
});


function showResults(){
    resultsContainer.innerHTML = '';

    quizSlides.forEach((slide, index) => {
        if(index === quizSlides.length - 1) return;

        const question = slide.querySelector('h3').innerText;
        const options = slide.querySelectorAll('.quiz-option');
        const correctIndex = parseInt(slide.dataset.correct);
        const userAnswer = answers[index];

        const div = document.createElement('div');
        div.style.marginBottom = "20px";

        let html = `<strong>${question}</strong><br>`;

        options.forEach((opt, i) => {

            if(i === correctIndex){
                html += `✔ <span class="correct">${opt.innerText}</span><br>`;
            }
            else if(i === userAnswer){
                html += `✖ <span class="incorrect">${opt.innerText}</span><br>`;
            }
            else{
                html += `${opt.innerText}<br>`;
            }

        });

        div.innerHTML = html;
        resultsContainer.appendChild(div);
    });
}

showQuizSlide(0);



const restartBtn = document.getElementById('restartQuizBtn');

restartBtn.addEventListener('click', () => {

    quizCurrentSlide = 0;
    answers = new Array(quizSlides.length - 1).fill(null);

    quizSlides.forEach(slide => {
        const options = slide.querySelectorAll('.quiz-option');

        options.forEach(opt => {
            opt.classList.remove('selected', 'correct-answer', 'wrong-answer');
            opt.disabled = false;
        });
    });

    resultsContainer.innerHTML = '';

    showQuizSlide(0);

    prevBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    finishBtn.style.display = 'none';
    progressBar.style.width = "0%";
});




const openQuizBtn = document.getElementById('openQuizBtn');
const closeQuizBtn = document.getElementById('closeQuizBtn');

if (openQuizBtn && closeQuizBtn) {
    openQuizBtn.addEventListener('click', () => {
        quizOverlay.classList.add('active');
        document.getElementById('quizSection').classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeQuizBtn.addEventListener('click', () => {
        quizOverlay.classList.remove('active');
        document.getElementById('quizSection').classList.remove('active');
        resetQuiz();
        document.body.style.overflow = 'auto';
    });
}


function resetQuiz(){

    quizCurrentSlide = 0;
    answers = new Array(quizSlides.length - 1).fill(null);

    quizSlides.forEach(slide => {
        const options = slide.querySelectorAll('.quiz-option');

        options.forEach(opt => {
            opt.classList.remove('selected');
            opt.disabled = false;
        });
    });

    resultsContainer.innerHTML = '';

    showQuizSlide(0);

    prevBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    finishBtn.style.display = 'none';
    progressBar.style.width = "0%";
}



function toggleTabla() {
    const tabla = document.getElementById("tablaWrapper");
    tabla.classList.toggle("active");
}



