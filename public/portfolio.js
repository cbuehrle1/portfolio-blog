"use strict";

var title = document.querySelector(".title-container");
var shader = document.querySelector(".container-shader");
var about = document.querySelector(".about-container");
var aboutHeader = document.querySelector(".about-header");
var headerDiv = document.querySelector('header');
var titleHeader = document.querySelector('.title-header-h1');

var halfWindowHeight = window.innerHeight / 2;

title.style.height = window.innerHeight + "px";
shader.style.height = window.innerHeight + "px";
shader.style.width = window.innerWidth + "px";
about.style.height = halfWindowHeight + "px";
aboutHeader.style.height = halfWindowHeight + "px";

var throttle = function throttle(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function func() {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(function () {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

/* init - you can init any event */
throttle("resize", "optimizedResize");

window.addEventListener("optimizedResize", function () {
  title.style.height = window.innerHeight + "px";
  shader.style.height = window.innerHeight + "px";
  about.style.height = halfWindowHeight + "px";
  shader.style.width = window.innerWidth + "px";
  aboutHeader.style.height = halfWindowHeight + "px";
});

window.addEventListener("scroll", function () {

  if (window.scrollY >= window.innerHeight) {
    headerDiv.className = "content-header";
    titleHeader.textContent = "Projects";
  } else if (window.scrollY < window.innerHeight) {
    headerDiv.className = "";
    titleHeader.textContent = "Welcome!";
  }
});
//# sourceMappingURL=portfolio.js.map
