"use strict";

if (window.PB === undefined) {
  window.PB = {};
}

(function () {

  var test = document.querySelector("#test");
  var buttons = document.querySelector("#buttons");

  function specifyElementAndCreate(tag) {
    var element = new PB.PostElement();

    if (tag === "img") {
      element.addSourceInput(test);
    } else {
      element.create(tag, test);
    }
  }

  function triggerImage(target, test, elem) {
    var element = new PB.PostElement();
    element.addImage(target, test, elem);
  }

  buttons.addEventListener("click", function (evt) {
    var target = evt.target.innerText;

    if (target === "Submit") {
      var post = new PB.Post();
      post.sendPostData();
    } else if (target === "Add Title") {
      specifyElementAndCreate("h1");
    } else if (target === "Add Header") {
      specifyElementAndCreate("h2");
    } else if (target === "Add Paragraph") {
      specifyElementAndCreate("p");
    } else if (target === "Add Image") {
      specifyElementAndCreate("img");
    }
  });

  test.addEventListener("focusout", function (evt) {
    var element = new PB.PostElement();
    var target = evt.target;
    element.addElement(target.localName, target.textContent);
  });

  test.addEventListener("click", function (evt) {

    if (test.children.length > 0 && evt.target.localName === "button") {

      for (var i = 0; i < test.children.length; i++) {
        var elem = test.children[i];

        if (elem.className === "src-input") {
          var input = elem.children[0];
          var button = elem.children[1];
          triggerImage(input.value, test, elem);
        }
      }
    }
  });
})();
//# sourceMappingURL=script.js.map
