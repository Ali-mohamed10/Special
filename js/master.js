/* start settings box */
let setting = document.querySelector(".settings-box");
let iconBox = document.querySelector(".settings-box .icon-box");
let icon = document.querySelector(".settings-box .fa-gear");

icon.onclick = () => {
    icon.classList.toggle("fa-spin");
    setting.classList.toggle("open");
    if (setting.classList.contains("open")) {
        iconBox.style.backgroundColor = "white";
    } else {
        iconBox.style.backgroundColor = "#eeeeeea4";
    }
};

// defult color
let colors = document.querySelectorAll(".settings-box .colors li");

if (window.localStorage.color) {
    document.documentElement.style.setProperty("--main-colorHover",window.localStorage.color);
    colors.forEach((el) => el.classList.remove("active"));
    colors.forEach((e) => {
        if (e.dataset.color === window.localStorage.color) {
            e.classList.add("active");
        }
    });
}

colors.forEach((li) => {
    li.addEventListener("click",(e) => {
        colors.forEach((el) => el.classList.remove("active"));
        e.currentTarget.classList.add("active");
        window.localStorage.color = e.currentTarget.dataset.color;
        document.documentElement.style.setProperty("--main-colorHover",window.localStorage.color);
    })                        
});

// defult background

let backgroundOption = true;

// because it be global
let backgroundInterval;


let randomButtons = document.querySelectorAll(".settings-box .option-box:nth-of-type(2) button");


if (window.localStorage.background) {
    randomButtons.forEach((el) => el.classList.remove("active"));
    randomButtons.forEach((e) => {
        if (e.dataset.background === window.localStorage.background) {
            e.classList.add("active");
        }
    });
}

if (window.localStorage.background === "yes") {
    backgroundOption = true;
    randomizeImgs();
} else {
    backgroundOption = false;
    clearInterval(backgroundInterval);
}

randomButtons.forEach((e) => {
    e.addEventListener("click",(b) => {
        randomButtons.forEach((el) => el.classList.remove("active"));
        b.currentTarget.classList.add("active");
        window.localStorage.background = b.currentTarget.dataset.background;
        // background
        if (b.currentTarget.dataset.background === "yes") {
            backgroundOption = true;
            randomizeImgs();
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
    });
});

// Show Bullets

let navBullets = document.querySelector(".nav-bullets");
let bulletsButton = document.querySelectorAll(".settings-box .option-box:nth-of-type(3) button");

if (window.localStorage.showBullets) {
    bulletsButton.forEach((el) => el.classList.remove("active"));
    bulletsButton.forEach((e) => {
        if (e.dataset.bullets === window.localStorage.showBullets) {
            e.classList.add("active");
        }
    });
}
if (window.localStorage.showBullets == "no") {
    navBullets.style.display ="none";
} else {
    navBullets.style.display ="block";
}

bulletsButton.forEach((butt) => {
    butt.addEventListener("click",(b) => {
        bulletsButton.forEach((e) => e.classList.remove("active"));
        b.currentTarget.classList.add("active");
        window.localStorage.showBullets = b.currentTarget.dataset.bullets;
        if (window.localStorage.showBullets == "no") {
            navBullets.style.display ="none";
        } else {
            navBullets.style.display ="block";
        }
    });
});

// Reset Button

let reset = document.querySelector(".settings-box .reset button");

reset.addEventListener("click",() => {
    window.localStorage.clear();
    location.reload();
});

/* end settings box */

/* Start Nav Bullets */
let bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach((bul) => {
    bul.addEventListener("click",(e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView();
    });
});

/* End Nav Bullets */

/* start landing page */
let landing = document.querySelector(".landing-page");

let imgsArray = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * imgsArray.length);
            landing.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';
        }, 4000);
    }
}

if (randomButtons[0].classList.contains("active")) {
    backgroundOption = true;
    randomizeImgs();
}

// Defult Writing A Creative Word

const text = "Creative ";
const speed = 150; 
let i = 0;
const animatedTextElement = document.getElementById("animatedText");

function typeWriter() {
    if (i < text.length) {
        animatedTextElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

window.onload = typeWriter;

/* end landing page */

/* Start Nav Phone */
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");
var x = window.matchMedia("(min-width: 768px)");


function media(x) {
    if (x.matches) {
        links.classList.remove("open");
        if (links.classList.contains("open")) {
            document.querySelector(".intro-text").style.display = "none";
        } else {
            document.querySelector(".intro-text").style.display = "block";
        }    
    }
}
media(x);
x.addEventListener("change", function() {
    media(x);
});


toggleMenu.addEventListener("click",(e) => {
    e.stopPropagation();
    links.classList.toggle("open");
    if (links.classList.contains("open")) {
        document.querySelector(".intro-text").style.display = "none";
    } else {
        document.querySelector(".intro-text").style.display = "block";
    }
});

document.addEventListener("click",(e) => {
    if (links.classList.contains("open") && e.currentTarget.className !== ".links") {
        links.classList.remove("open");
        if (links.classList.contains("open")) {
            document.querySelector(".intro-text").style.display = "none";
        } else {
            document.querySelector(".intro-text").style.display = "block";
        }
    }
});



/* End Nav Phone */

/* Start About Us */
let aboutSection = document.querySelector(".about-us");

window.addEventListener("scroll",() => {
    if (scrollY > 380) {
        document.querySelector(".about-us .description").style.animationPlayState ="running";
    }
});
window.addEventListener("scroll",() => {
    if (scrollY > 380) {
        document.querySelector(".about-us .img").style.animationPlayState ="running";
    }
});
/* End About Us */

/* Start Skills Page */

let ourSkills = document.querySelector(".our-skills");
let spanSkills = document.querySelectorAll(".our-skills span");

window.onscroll = function () {    
    if (scrollY > 679) {
        spanSkills.forEach((sk) => sk.style.animationPlayState = "running");
    }
    
}

/* End Skills Page */

/* Start Gallery */
let ourGallery = document.querySelectorAll(".gallery .imgs div img");

ourGallery.forEach((img) => {
    img.addEventListener("click",function (e) {
        // create overlay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        document.body.appendChild(popupBox);
        popupBox.appendChild(popupImg);

        // create img title by alt
        if (img.alt !== null) {
            let imgTitle = document.createElement("h2");
            let textTitle = document.createTextNode(img.alt);
            imgTitle.appendChild(textTitle);
            popupBox.prepend(imgTitle);
        }

        // create close button
        let close = document.createElement("div");
        close.className = "close-button";
        let closeIcon = document.createTextNode("X");
        close.appendChild(closeIcon);
        popupBox.appendChild(close);
    });
});

// close popup
document.addEventListener("click",function (e) {
    if (e.target.className == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

/* End Gallery */

/* Start Timeline */

window.addEventListener("scroll", function () {
    if (scrollY > 1655) {
        let contents = document.querySelectorAll(".timeline .content");
        contents.forEach((con) => con.style.animationPlayState = "running");
    
        let divs = document.querySelectorAll(".timeline .content div:nth-of-type(1)");
        divs.forEach((div) => div.style.animationPlayState = "running");
    
        let divs2 = document.querySelectorAll(".timeline .content div:nth-of-type(3)");
        divs2.forEach((div) => div.style.animationPlayState = "running");
    }
});

/* End Timeline */


/* Start Testimonials */
let testimonialsSection = document.querySelector(".testimonials");
let current = 0;
const boxes = [document.querySelector(".ahmed"), document.querySelector(".ali"), document.querySelector(".Amr")];

window.addEventListener("scroll",() => {
    if (scrollY >= 3813) {
        updateBoxDisplay(current);
    }
})

function updateBoxDisplay(index) {
    boxes.forEach(box => box.style.display = "none");
    boxes[index].style.display = "block";
    boxes[index].style.animation = "slide-in 0.6s ease-out forwards";
}

function showNext() {
    current = (current + 1) % boxes.length;
    updateBoxDisplay(current);
}

function showPrevious() {
    current = (current - 1 + boxes.length) % boxes.length;
    updateBoxDisplay(current);
}


/* End Testimonials */




