"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.PB === undefined) {
  window.PB = {};
}

(function () {

  var cb = [];

  var newPostData = { title: "", body: [] };

  var setPostData = function setPostData(domElement, contents) {

    if (domElement === "h1") {
      newPostData.title = contents;
    } else {

      var section = {
        content: contents,
        tag: domElement
      };

      newPostData.body.push(section);
    }
  };

  var PostElement = function () {
    function PostElement() {
      _classCallCheck(this, PostElement);
    }

    _createClass(PostElement, [{
      key: "create",
      value: function create(domElement, destination) {
        var element = document.createElement(domElement);
        element.setAttribute("contenteditable", "true");
        destination.appendChild(element);
      }
    }, {
      key: "addElement",
      value: function addElement(element, content) {
        setPostData(element, content);
      }
    }, {
      key: "addSourceInput",
      value: function addSourceInput(destination) {
        var inputContainer = document.createElement("div");
        var input = document.createElement("input");
        var enter = document.createElement("button");
        input.setAttribute("name", "source");
        input.setAttribute("placeholder", "Enter Image Source");
        enter.textContent = "Enter";
        inputContainer.className = "src-input";

        destination.appendChild(inputContainer);
        inputContainer.appendChild(input);
        inputContainer.appendChild(enter);
      }
    }, {
      key: "addImage",
      value: function addImage(contents, destination, remove) {
        var img = document.createElement("img");
        img.src = contents;
        remove.innerHTML = "";
        destination.appendChild(img);
      }
    }]);

    return PostElement;
  }();

  var Post = function () {
    function Post() {
      _classCallCheck(this, Post);
    }

    _createClass(Post, [{
      key: "sendPostData",
      value: function sendPostData() {
        var post = newPostData;

        $.ajax({
          url: "/api/blog/new",
          method: "POST",
          data: {
            title: post.title,
            body: JSON.stringify(post.body)
          }
        }).done(function (data) {
          window.location = "/blog";
        });
      }
    }]);

    return Post;
  }();

  PB.PostElement = PostElement;
  PB.Post = Post;
})();
//# sourceMappingURL=post_element.js.map
