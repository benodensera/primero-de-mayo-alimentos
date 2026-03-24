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