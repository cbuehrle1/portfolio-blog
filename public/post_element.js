"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.PB === undefined) {
  window.PB = {};
}

(function () {

  var newPostData = { title: "", body: [] };

  var setPostData = function setPostData(domElement, contents) {
    console.log(domElement);
    if (domElement === "h1") {
      newPostData.title = contents;
    } else {
      newPostData.body.push(contents);
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
        console.log(newPostData);
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
        console.log("data sent!", post);
      }
    }]);

    return Post;
  }();

  PB.PostElement = PostElement;
  PB.Post = Post;
})();
//# sourceMappingURL=post_element.js.map
