function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function GetWidth() {
    return document.documentElement.clientWidth;
}

function GetHeight() {
    return document.documentElement.clientHeight;
}

//创建一个轮播图区域
function createCarousel(carouselId,carouselData) {
    //获取整个轮播图的容器
var container = document.getElementById(carouselId);

//获取各种dom元素
var carouselList = container.querySelector(".g_carousel-list");
var indicator = container.querySelector(".g_indicator-list");
var previewCarousel = container.querySelector(".g_carousel-prev");
var nextCarousel = container.querySelector(".g_carousel-next");
var curouselIndex = 0; //当前显示轮播图的索引

//创建轮播图中的各种元素
function createCarouselElements() {
    var listHtml = "";
    var indicatorHtml = "";
    for (var i = 0; i < carouselData.length; i++) {
        var carousel = carouselData[i];
        if (carousel.link) {
            listHtml += `<li>
            <a href="${carousel.link}" target="_blank">
               <img src="${carousel.Image}">
            </a>
            </li>`;
        } else {
            listHtml += `<li>
               <img src="${carousel.Image}">
            </li>`;
        }

        indicatorHtml += "<li></li>";
    }

    carouselList.style.width = `${carouselData.length}100%`;
    carouselList.innerHTML = listHtml;
    indicator.innerHTML = indicatorHtml;
}
createCarouselElements();


//设置正确的状态
function setStatus() {
    carouselList.style.marginLeft = -curouselIndex * GetWidth() + "px";

    //设置指示器的状态
    var beforeSelected = indicator.querySelector(".selected");
    if (beforeSelected) {
        beforeSelected.classList.remove("selected");
    }
    indicator.children[curouselIndex].classList.add("selected");

    //处理之前和之后
    if (previewCarousel) {
        if (curouselIndex === 0) {
            previewCarousel.classList.add("disabled");
        } else {
            previewCarousel.classList.remove("disabled");
        }
    }

    if (nextCarousel) {
        if (curouselIndex === carouselData.length - 1) {
            nextCarousel.classList.add("disabled");
        } else {
            nextCarousel.classList.remove("disabled");
        }
    }
}
setStatus();


//上一个轮播图
function toPreviewCarousel() {
    if (curouselIndex == 0) {
        return;
    }
    curouselIndex--;
    setStatus();
}


//下一个轮播图
function toNextCarousel() {
    if (curouselIndex == carouselData.length - 1) {
        return;
    }
    curouselIndex++;
    setStatus();
}

var timer = null;
//开始自动切换
function start() {
    if (timer) {
        return;
    }
    timer = setInterval(() => {
        curouselIndex++;
        if (curouselIndex === carouselData.length) {
            curouselIndex = 0;
        }
        setStatus();
    }, 2000);
}

//结束自动切换
function stop() {
    clearInterval(timer);
    timer = null;
}


//事件
if (previewCarousel) {
    previewCarousel.onclick = toPreviewCarousel;
}

if (nextCarousel) {
    nextCarousel.onclick = toNextCarousel;
}

container.ontouchstart = function (e) {
    e.stopPropagation(); //阻止事件冒泡；
    var x = e.touches[0].clientX;
    stop();
    carouselList.style.transition = "none";

    container.ontouchmove = function (e) {
        var dis = e.touches[0].clientX - x;
        carouselList.style.marginLeft = -curouselIndex * GetWidth() + dis + "px";
    }

    container.ontouchend = function (e) {
        var dis = e.changedTouches[0].clientX - x;
        start();
        carouselList.style.transition = "0.5s";
        container.ontouchmove = null;
        console.log(dis);
        if (dis < -GetWidth() / 2 && curouselIndex < carouselData.length - 1) {
            toNextCarousel();
        } else if (dis > GetWidth() / 2 && curouselIndex > 0) {
            toPreviewCarousel();
        } else {
            setStatus();
        }
    }
};
}
