"use strict";

var title = document.querySelector(".title-container");
var shader = document.querySelector(".container-shader");
var about = document.querySelector(".about-container");
var aboutFloat = document.querySelectorAll(".float-div");
var aboutContent = document.querySelectorAll('.float-centering');
var headerDiv = document.querySelector('header');

title.style.height = window.innerHeight + "px";
shader.style.height = window.innerHeight + "px";
shader.style.width = window.innerWidth + "px";
about.style.height = window.innerHeight + "px";

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
  about.style.height = window.innerHeight + "px";
  shader.style.width = window.innerWidth + "px";
});

window.addEventListener("scroll", function () {

  if (window.scrollY >= window.innerHeight) {
    headerDiv.className = "content-header";
  } else if (window.scrollY < window.innerHeight) {
    headerDiv.className = "";
  }
});
//# sourceMappingURL=portfolio.js.map
