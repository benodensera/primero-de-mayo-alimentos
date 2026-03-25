///AOS.init({duration:1000, once:true});

function toggleMenu(){
    document.getElementById('menu').classList.toggle('active');
}

function animateCounter(id, target, speed){
    let count = 0;
    const interval = setInterval(() =>{
        if(count < target){
            count++;
            document.getElementById(id).innerText = count;
            }else{
                clearInterval(interval);
            }
        }, speed)
    }

animateCounter('courseCount', 800, 10);
animateCounter('studentCount', 210, 20);



const wrapper = document.getElementById('testimonialWrapper');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = 2;

function moveToSlide(index){
    currentSlide = index;
    const slideWidth = wrapper.clientWidth;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        moveToSlide(currentSlide);
    }, 5000);
}



