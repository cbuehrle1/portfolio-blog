if (window.PB === undefined) { window.PB = {}; }

(() => {

  var newPostData = { title: "", body: [] };

  var setPostData = function (domElement, contents) {
    console.log(domElement)
    if (domElement === "h1") {
      newPostData.title = contents;
    }
    else {
      newPostData.body.push(contents);

    }
  }

  class PostElement {

      create(domElement, destination) {
        var element = document.createElement(domElement);
        element.setAttribute("contenteditable", "true");
        destination.appendChild(element)
      }

      addElement(element, content) {
        setPostData(element, content);
        console.log(newPostData);
      }

    }

    class Post {

      sendPostData() {
        var post = newPostData
        console.log("data sent!", post);
      }

    }

  PB.PostElement = PostElement;
  PB.Post = Post;
})()
