if (window.PB === undefined) { window.PB = {}; }

(() => {

  var newPostData = { title: "", body: [] };

  var setPostData = function (domElement, contents) {

    if (domElement === "h1") {
      newPostData.title = contents;
    }
    else {

      var section = {
        content: contents,
        tag: domElement
      }

      newPostData.body.push(section);

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
      }

    }

    class Post {

      sendPostData() {
        var post = newPostData

        $.ajax({
          url: "/api/blog/new",
          method: "POST",
          data: {
            title: post.title,
            body: JSON.stringify(post.body)
          }
        })
        .done(function(data) {
          window.location = "/blog"
        });

      }

    }

  PB.PostElement = PostElement;
  PB.Post = Post;
})()
