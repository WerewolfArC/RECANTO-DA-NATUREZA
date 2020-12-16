window.onload = () => {
    document.querySelectorAll('input').forEach(element => {
        element.value = null
    })
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'f':
            console.log('finalizar venda');
            return;
        default:
            return;
    }
});

let target = document.querySelectorAll('[data-anime]');
target = [...target];
const animationClass = 'animate';

let blink = document.querySelectorAll('[data-blink]');
blink = [...blink];
let newBlink = [...blink];
setInterval(() => {
    if (!newBlink) return;
    setTimeout(() => {
        if (newBlink.length < 1) newBlink = [...blink];
        let b = newBlink.shift();
        if (!b) return;
        b.classList.add('animate');
        setTimeout(() => {
            b.classList.remove('animate');
        }, 500);
    }, 800);
}, 1000);

function animeScroll() {
    let windowTop = window.pageYOffset;
    target.map((value) => {
        if (windowTop + window.innerHeight > value.offsetTop + value.offsetHeight && windowTop < value.offsetTop) {
            value.classList.add('animate')
        } else {
            value.classList.remove('animate')
        }
    });
}

window.addEventListener('scroll', animeScroll);
animeScroll();