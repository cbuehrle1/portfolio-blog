if (window.PB === undefined) { window.PB = {}; }

(() => {

  var test = document.querySelector("#test");
  var buttons = document.querySelector("#buttons");

  function specifyElementAndCreate (tag) {
    var element = new PB.PostElement();
    element.create(tag, test);
  }

  buttons.addEventListener("click", function(evt) {
    var target = evt.target.innerText;

    if (target === "Submit") {
      var post = new PB.Post();
      post.sendPostData();
    }
    else if (target === "Add Title") {
      specifyElementAndCreate("h1");
    }
    else if (target === "Add Header") {
      specifyElementAndCreate("h2");
    }
    else if (target === "Add Paragraph") {
      specifyElementAndCreate("p");
    }
  });

  test.addEventListener("focusout", function(evt) {
    var element = new PB.PostElement();
    var target = evt.target;
    element.addElement(target.localName, target.textContent);
  });

})()
