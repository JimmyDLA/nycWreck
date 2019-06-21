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
  smoothScroll(731);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollServ(){
  smoothScroll(1831);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollRef(){
  smoothScroll(2631);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollCont(){
  smoothScroll(3421);
  x.classList.toggle("change");
  document.querySelector(".ul").style.display = "none";
  document.querySelector(".containerInfo").style.marginTop = "100px"
  menuOpen = 0;
}

function scrollMap(){
  smoothScroll(3700)
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
