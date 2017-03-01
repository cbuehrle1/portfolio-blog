"use strict";

if (window.PB === undefined) {
  window.PB = {};
}

(function () {

  var test = document.querySelector("#test");
  var buttons = document.querySelector("#buttons");

  buttons.addEventListener("click", function (evt) {
    if (evt.target.innerText === "Submit") {
      var post = new PB.Post();
      post.sendPostData();
    } else {
      var element = new PB.PostElement();
      element.create("h1", test);
    }
  });

  test.addEventListener("focusout", function (evt) {
    var element = new PB.PostElement();
    var target = evt.target;
    element.addElement(target.localName, target.textContent);
  });
})();
//# sourceMappingURL=script.js.map
