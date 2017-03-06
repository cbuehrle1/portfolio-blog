if (window.PB === undefined) { window.PB = {}; }

(() => {

  var cb = []

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

      addSourceInput(destination, tag) {
        var inputContainer = document.createElement("div");
        var input = document.createElement("input");
        var enter = document.createElement("button");
        input.setAttribute("name", "source");
        input.setAttribute("placeholder", "Enter Media Source");
        enter.textContent = "Enter";
        inputContainer.className = "src-input";
        input.className = tag;

        destination.appendChild(inputContainer);
        inputContainer.appendChild(input);
        inputContainer.appendChild(enter);
      }

      addImage(contents, destination, remove) {
        var img = document.createElement("img");
        img.src = contents;
        remove.remove();
        destination.appendChild(img);
        setPostData("img", contents);
      }

      addVideo(contents, destination, remove) {
        console.log("iframe")
        var video = document.createElement("iframe");
        video.src = contents;
        remove.remove();
        destination.appendChild(video);
        setPostData("iframe", contents);
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
