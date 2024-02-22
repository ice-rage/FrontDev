(function () {
  "use strict";

  /* При нажатии на ссылку в навигации плавно прокручиваем главную страницу 
     до нужного блока */

  // const navigation = document.querySelector("#js-nav");

  // if (navigation) {

  //   navigation.querySelectorAll('a[href^="#"]').forEach(link => {

  //     link.addEventListener("click", function (event) {

  //       const currentPath = window.location.pathname;
  //       const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  //       if (currentPage != "index.html") {

  //       }

  //       event.preventDefault();

  //       let href = this.getAttribute("href").substring(1);

  //       const scrollTarget = document.getElementById(href);

  //       const additionalPixels = 30;
  //       const topOffset = document.querySelector("#js-pageHeader").offsetHeight +
  //         additionalPixels;
  //       const elementPosition = scrollTarget.getBoundingClientRect().top;
  //       const offsetPosition = elementPosition - topOffset;

  //       window.scrollBy({
  //         top: offsetPosition,
  //         behavior: "smooth"
  //       });
  //     });
  //   });
  // }
})();
