"use strict";

if (window.PB === undefined) {
  window.PB = {};
}

(function () {

  var test = document.querySelector("#test");
  var buttons = document.querySelector("#buttons");
  var inputTag = document.querySelector("#item-tag");
  var tagButton = document.querySelector("#tag-button");
  var tagClass = document.querySelector(".tag-class");

  function specifyElementAndCreate(tag) {
    var element = new PB.PostElement();

    if (tag === "img") {
      element.addSourceInput(test, "add-img");
    } else if (tag === "iframe") {
      element.addSourceInput(test, 'add-iframe');
    } else {
      element.create(tag, test);
    }
  }

  function addTag(input) {
    var tag = new PB.PostElement();
    tag.setTag(input);
  }

  function triggerImage(target, test, elem) {
    var element = new PB.PostElement();
    element.addImage(target, test, elem);
  }

  function triggerVideo(target, test, elem) {
    var element = new PB.PostElement();
    element.addVideo(target, test, elem);
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
    } else if (target === "Add Video") {
      specifyElementAndCreate("iframe");
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

          if (input.className === "add-img") {
            triggerImage(input.value, test, elem);
          } else if (input.className === "add-iframe") {
            triggerVideo(input.value, test, elem);
          }
        }
      }
    }
  });

  tagButton.addEventListener("click", function () {
    addTag(inputTag.value);
    tagClass.innerHTML = "";
  });
})();
//# sourceMappingURL=script.js.map
