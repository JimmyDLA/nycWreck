// SPACIAL THANK YOU TO Alice Lieutier ON GITHUB FOR
// THE SMOOTH SCROLL EFFECT

(function (root, smoothScroll) {
  'use strict';

  // Support RequireJS and CommonJS/NodeJS module formats.
  // Attach smoothScroll to the `window` when executed as a <script>.

  // RequireJS
  if (typeof define === 'function' && define.amd) {
    define(smoothScroll);

  // CommonJS
  } else if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = smoothScroll();

  } else {
    root.smoothScroll = smoothScroll();
  }

})(this, function(){
'use strict';

console.log(document.body.scrollTop)
window.addEventListener("scroll", function () {
  console.log(pageYOffset)
});

// Do not initialize smoothScroll when running server side, handle it in client:
if (typeof window !== 'object') return;

// We do not want this script to be applied in browsers that do not support those
// That means no smoothscroll on IE9 and below.
if(document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) { return; }

// Get the top position of an element in the document
var getTop = function(element, start) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if(element.nodeName === 'HTML') return -start
    return element.getBoundingClientRect().top + start
}
// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
var easeInOutCubic = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
var position = function(start, end, elapsed, duration) {
    if (elapsed > duration) return end;
    return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
    // return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
}

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
// if context is set then scroll that element, else scroll window
var smoothScroll = function(el, duration, callback, context){
    duration = duration || 500;
    context = context || window;
    var start = context.scrollTop || window.pageYOffset;

    if (typeof el === 'number') {
      var end = parseInt(el);
    } else {
      var end = getTop(el, start);
    }

    var clock = Date.now();
    var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
        function(fn){window.setTimeout(fn, 15);};

    var step = function(){
        var elapsed = Date.now() - clock;
        if (context !== window) {
          context.scrollTop = position(start, end, elapsed, duration);
        }
        else {
          window.scroll(0, position(start, end, elapsed, duration));
        }

        if (elapsed > duration) {
            if (typeof callback === 'function') {
                callback(el);
            }
        } else {
            requestAnimationFrame(step);
        }
    }
    step();
}

var linkHandler = function(ev) {
    ev.preventDefault();

    if (location.hash !== this.hash) window.history.pushState(null, null, this.hash)
    // using the history api to solve issue #1 - back doesn't work
    // most browser don't update :target when the history api is used:
    // THIS IS A BUG FROM THE BROWSERS.
    // change the scrolling duration in this call
    var node = document.getElementById(this.hash.substring(1))
    if(!node) return; // Do not scroll to non-existing node

    smoothScroll(node, 500, function(el) {
        location.replace('#' + el.id)
        // this will cause the :target to be activated.
    });
}

// We look for all the internal links in the documents and attach the smoothscroll function
document.addEventListener("DOMContentLoaded", function () {
    var internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'), a;
    for(var i=internal.length; a=internal[--i];){
        a.addEventListener("click", linkHandler, false);
    }
});

// return smoothscroll API
return smoothScroll;

});


            //SLIDESHOW FUNCTIONS
  var slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

            //SCROLL FUNCTIONS
function scrollAbout(){
  smoothScroll(2006);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollServ(){
  smoothScroll(1110);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollRef(){
  smoothScroll(4211);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollCont(){
  smoothScroll(5060);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollMap(){
  smoothScroll(5340)
}
function scrollTops(){
  smoothScroll(1);
}


// FUNCTION TO SLIDE THROUGH SLIDESHOW
var slideIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 4000); // Change image every 4 seconds
}


//make function to know where scroll user is at and change nav tab color
window.onscroll = function() {
  tabPosition()
};

var startCount = 0;

function on(x) {

  setTimeout(() => {})
  document.getElementById("overlay").style.display = "flex";
  let image1 = document.getElementById("img1-comp");
  let image2 = document.getElementById("img2-comp");

  switch(x.innerText){
    case 'Faded/Chipped Paint':
      image1.src = "./public/a1.png";
      image2.src = "./public/b1.png";
      break;
    case 'Dents':
      image1.src = "./public/a2.png";
      image2.src = "./public/b2.png";
      break;
    case 'Frame Damage':
      image1.src = "./public/a3.png";
      image2.src = "./public/b3.png";
      break;
    case 'Rust':
      image1.src = "./public/a2.png";
      image2.src = "./public/b2.png";
      break;
    case 'Scratches/Scuff Marks':
      image1.src = "./public/a5.png";
      image2.src = "./public/b5.png";
      break;
    case 'Dip Paint':
      image1.src = "./public/a6.png";
      image2.src = "./public/b6.png";
      break;
    case 'Bumper/Body Damage':
      image1.src = "./public/a1.png";
      image2.src = "./public/b1.png";
      break;
    case 'Dings/Holes':
      image1.src = "./public/a4.png";
      image2.src = "./public/b4.png";
      break;
    default:
      // image1.src = "./public/white_brick.jpg";
      // image2.src = "./public/refNetwork.jpg";
      break;
  }
  if (startCount === 0 ){
    startCount = 1;
    initComparisons();
  }
}

function off(x) {
  document.querySelector(".img-comp-slider").style.left = "355px";
  document.querySelector(".img-comp-overlay").style.width = "375px";
  document.getElementById("overlay").style.display = "none";
}

function tabPosition() {
  if (document.body.scrollTop > 0 && document.body.scrollTop < 530) {
    document.querySelector("#aboutTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#aboutTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#servicesTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#servicesTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#referralTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#referralTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#contactTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#contactTab").style.color = "rgb(250, 250, 250)";
    document.querySelector(".scrollUp").style.opacity = "0";

  }

  if (document.body.scrollTop > 530 && document.body.scrollTop < 1630) {
    document.querySelector("#aboutTab").style.backgroundColor = "rgb(250, 250, 250)";
    document.querySelector("#aboutTab").style.color = "rgb(225, 38, 43)";
    document.querySelector("#servicesTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#servicesTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#referralTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#referralTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#contactTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#contactTab").style.color = "rgb(250, 250, 250)";
    document.querySelector(".scrollUp").style.opacity = "1";

  }

  if (document.body.scrollTop > 1630 && document.body.scrollTop < 2430) {
    document.querySelector("#aboutTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#aboutTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#servicesTab").style.backgroundColor = "rgb(250, 250, 250)";
    document.querySelector("#servicesTab").style.color = "rgb(225, 38, 43)";
    document.querySelector("#referralTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#referralTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#contactTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#contactTab").style.color = "rgb(250, 250, 250)";
    document.querySelector(".scrollUp").style.opacity = "1";

  }

  if (document.body.scrollTop > 2430 && document.body.scrollTop < 3220) {
    document.querySelector("#aboutTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#aboutTab").style.color = "rgbrgb(250, 250, 250)";
    document.querySelector("#servicesTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#servicesTab").style.color = "rgb(250, 250, 250";
    document.querySelector("#referralTab").style.backgroundColor = "rgb(250, 250, 250";
    document.querySelector("#referralTab").style.color = "rgb(225, 38, 43)";
    document.querySelector("#contactTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#contactTab").style.color = "rgb(250, 250, 250)";
    document.querySelector(".scrollUp").style.opacity = "1";

  }

  if (document.body.scrollTop > 3220 && document.body.scrollTop < 4000) {
    document.querySelector("#aboutTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#aboutTab").style.color = "rgbrgb(250, 250, 250)";
    document.querySelector("#servicesTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#servicesTab").style.color = "rgb(250, 250, 250";
    document.querySelector("#referralTab").style.backgroundColor = "rgb(225, 38, 43)";
    document.querySelector("#referralTab").style.color = "rgb(250, 250, 250)";
    document.querySelector("#contactTab").style.backgroundColor = "rgb(250, 250, 250";
    document.querySelector("#contactTab").style.color = "rgb(225, 38, 43)";
    document.querySelector(".scrollUp").style.opacity = "1";

  }
}

let menuOpen = 0;

function menuButton(x) {
    if (menuOpen === 0) {
      x.classList.toggle("change");
      document.querySelector(".ul").style.display = "inline";
      document.querySelector(".containerInfo").style.marginTop = "300px";
      menuOpen = 1;
    }else{
      x.classList.toggle("change");
      document.querySelector(".ul").style.display = "none";
      document.querySelector(".containerInfo").style.marginTop = "100px";
      menuOpen = 0;
    }
}

//comparison slide 
function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
  x = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < x.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(x[i]);
  }
  function compareImages(img) {
    var slider, img, clicked = 0, w, h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = (w / 2) + "px";
    /*create slider:*/
    slider = document.querySelector(".img-comp-slider");
    /*insert slider*/
    /*position the slider in the middle:*/
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);
    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
