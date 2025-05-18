/* Start Loading */

window.addEventListener("load",function () {
    setTimeout(() => {
        document.querySelector(".loading-bar").classList.add("hide");
    }, 3500);
    setTimeout(() => {
        document.querySelector(".loading-container").classList.add("hide");
    }, 4000);
});

/* End Loading */

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

const colorsLis = document.querySelectorAll(".settings-box .colors li");

const localColor = window.localStorage.getItem("color");

if (localColor !== null) {
    document.documentElement.style.setProperty("--main-colorHover", localColor);
    colorsLis.forEach((el) => el.classList.remove("active"));
    document.querySelector(`.settings-box .colors li[data-color="${localColor}"]`).classList.add("active");
}

colorsLis.forEach((li) => {
    li.addEventListener("click", (e) => {
        colorsLis.forEach((el) => el.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const selectedColor = e.currentTarget.dataset.color;
        window.localStorage.setItem("color", selectedColor);

        document.documentElement.style.setProperty("--main-colorHover", selectedColor);
    });
});

let backgroundOption = true;
let backgroundInterval;
let landing = document.querySelector(".landing-page");
let imgsArray = ["first.jpg", "second.jpg", "third.jpg", "fourth.jpg", "fifth.jpg", "sixth.jpg"];

function manageBackgroundRandomization(enable) {
    clearInterval(backgroundInterval);

    if (enable) {
        backgroundInterval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * imgsArray.length);
            landing.style.backgroundImage = 'url("imgs/' + imgsArray[randomNum] + '")';
            console.log(window.localStorage.background);
        }, 6000);
    }
}

const randomButtons = document.querySelectorAll(".settings-box .option-box:nth-of-type(2) button");

const localBackground = window.localStorage.getItem("background");

if (localBackground !== null) {
    backgroundOption = localBackground === "yes";

    randomButtons.forEach((el) => el.classList.remove("active"));
    document.querySelector(`.settings-box .option-box:nth-of-type(2) button[data-background="${localBackground}"]`).classList.add("active");

} else {
    randomButtons.forEach((el) => el.classList.remove("active"));
    document.querySelector('.settings-box .option-box:nth-of-type(2) button[data-background="yes"]').classList.add("active");
}

manageBackgroundRandomization(backgroundOption);

randomButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
        randomButtons.forEach((el) => el.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const selectedOption = e.currentTarget.dataset.background;
        window.localStorage.setItem("background", selectedOption);

        backgroundOption = selectedOption === "yes";

        manageBackgroundRandomization(backgroundOption);
    });
});


const navBullets = document.querySelector(".nav-bullets");
const bulletsButtons = document.querySelectorAll(".settings-box .option-box:nth-of-type(3) button");

const localBullets = window.localStorage.getItem("showBullets");

if (localBullets !== null) {
    bulletsButtons.forEach((el) => el.classList.remove("active"));
    document.querySelector(`.settings-box .option-box:nth-of-type(3) button[data-bullets="${localBullets}"]`).classList.add("active");

    navBullets.style.display = localBullets === "no" ? "none" : "block";

} else {
    bulletsButtons.forEach((el) => el.classList.remove("active"));
    document.querySelector('.settings-box .option-box:nth-of-type(3) button[data-bullets="yes"]').classList.add("active");
    navBullets.style.display = "block";
}

bulletsButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
        bulletsButtons.forEach((el) => el.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const selectedOption = e.currentTarget.dataset.bullets;
        window.localStorage.setItem("showBullets", selectedOption);

        navBullets.style.display = selectedOption === "no" ? "none" : "block";
    });
});

const resetButton = document.querySelector(".settings-box .reset button");

resetButton.addEventListener("click", function () {
    window.localStorage.clear();
    location.reload();
});

/* end settings box */


/* Start Nav Bullets */
const bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach((bullet) => {
    bullet.addEventListener("click", function (e) {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
/* End Nav Bullets */


/* start landing page */

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

window.addEventListener("load", typeWriter());

/* end landing page */


/* Start Nav Phone */
const toggleMenu = document.querySelector(".toggle-menu");
const links = document.querySelector(".links");
const mediaQuery = window.matchMedia("(min-width: 768px)");


function handleMediaQueryChange(x) {
    if (x.matches) {
        links.classList.remove("open");
    }
}

mediaQuery.addEventListener("change", handleMediaQueryChange);

handleMediaQueryChange(mediaQuery);


toggleMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    links.classList.toggle("open");

    if (links.classList.contains("open")) {
        document.querySelector(".intro-text").style.display = "none";
    } else {
        document.querySelector(".intro-text").style.display = "block";
    }
});

document.addEventListener("click", function (e) {
    if (links.classList.contains("open") && !links.contains(e.target) && e.target !== toggleMenu) {
        links.classList.remove("open");
        document.querySelector(".intro-text").style.display = "block";
    }
});

/* End Nav Phone */


/* Start About Us */
const aboutSection = document.querySelector(".about-us");
const aboutDescription = document.querySelector(".about-us .description");
const aboutImg = document.querySelector(".about-us .img");

window.addEventListener("scroll", function () {
    const scrollThreshold = aboutSection.offsetTop - 200;

    if (window.scrollY >= scrollThreshold) {
        aboutDescription.style.animationPlayState = "running";
        aboutImg.style.animationPlayState = "running";
    }
});

/* End About Us */


/* Start Skills Page */
const ourSkills = document.querySelector(".our-skills");
const skillSpans = document.querySelectorAll(".our-skills span");

window.addEventListener("scroll", function () {
    const scrollThreshold = ourSkills.offsetTop - 200;

    if (window.scrollY >= scrollThreshold) {
        skillSpans.forEach((sk) => sk.style.animationPlayState = "running");
    }
});

/* End Skills Page */


/* Start Gallery */
const gallerySection = document.querySelector(".gallery");
const galleryImages = document.querySelectorAll(".gallery .imgs div img");


window.addEventListener("scroll", function () {
    const scrollThreshold = gallerySection.offsetTop - 200;

    if (window.scrollY >= scrollThreshold) {
        gallerySection.style.opacity = "1";
    }
});

galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if (img.alt) {
            let imgTitle = document.createElement("h2");
            let textTitle = document.createTextNode(img.alt);
            imgTitle.appendChild(textTitle);
            popupBox.appendChild(imgTitle);
        }

        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);

        let close = document.createElement("div");
        close.className = "close-button";
        let closeIcon = document.createTextNode("X");
        close.appendChild(closeIcon);
        popupBox.appendChild(close);

        document.body.appendChild(popupBox);
    });
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-button")) {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
    if (e.target.classList.contains("popup-overlay")) {
        e.target.remove();
        document.querySelector(".popup-box").remove();
    }
});


let images = document.querySelectorAll('.gallery .box img');
let nextButton = document.getElementById('nextButton');
let prevButton = document.getElementById('prevButton');
let currentIndex = 0;


for (let t = 1; t <= images.length; t++) {
    let span = document.createElement("span");
    let textSpan = document.createTextNode(t);
    span.appendChild(textSpan);
    document.querySelector(".gallery .bullets").appendChild(span);
}


document.addEventListener('DOMContentLoaded', function () {
    function updateImageDisplay() {
        images.forEach((img, index) => {
            img.classList.remove('active');
        });
        images[currentIndex].classList.add('active');
        document.querySelectorAll(".gallery .bullets span").forEach((sp) => sp.classList.remove("active"));
        document.querySelectorAll(".gallery .bullets span")[currentIndex].classList.add("active");
        if (currentIndex === 0) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;
        }

        if (currentIndex === images.length - 1) {
            nextButton.disabled = true;
        } else {
            nextButton.disabled = false;
        }
    }

    nextButton.addEventListener('click', function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateImageDisplay();
            console.log(currentIndex);
            
        }
    });

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateImageDisplay();
        }
    });

    updateImageDisplay();
});


/* End Gallery */


/* Start Timeline */
let timelineSection = document.querySelector(".timeline");

window.addEventListener("scroll", function () {
    if (scrollY >= timelineSection.offsetTop - 200) {
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

window.addEventListener("scroll",function () {
    if (scrollY >= testimonialsSection.offsetTop) {
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
