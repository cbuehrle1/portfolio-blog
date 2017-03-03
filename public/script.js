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
      console.log(test.children);

      for (var i = 0; i < test.children.length; i++) {
        console.log("in loop");
        var elem = test.children[i];

        if (elem.className === "src-input") {
          console.log("found src-input");
          var input = elem.children[0];
          var button = elem.children[1];
          triggerImage(input.value, test, elem);
        }
      }
      // test.children.forEach((child) => {
      //   console.log("in loop");
      //   if (child.className === "src-input") {
      //     console.log("found src-input");
      //     var input = child.children[0];
      //     triggerImage(input.innerText, test, child);
      //   }
    }
  });
})();
//# sourceMappingURL=script.js.map
