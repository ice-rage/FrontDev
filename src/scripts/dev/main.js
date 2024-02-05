(function () {
  "use strict";

  const root = document.documentElement;

  const navToggle = document.querySelector("#js-navToggle");

  navToggle.addEventListener("click", function () {
    root.classList.toggle("show-nav");
  });
  

  const eventPP = document.querySelector("#js-eventPP");
  const eventOpenBtn = document.querySelector("#js-openEventBtn");

  if (eventPP && eventOpenBtn) {
    const closeEventPP = function (event) {
      function close() {
        document.removeEventListener("keyup", closeEventPP);
        eventPP.removeEventListener("click", closeEventPP);
        
        root.classList.remove("show-event-popup");
      }

      switch (event.type) {
        case "keyup":
          if (event.key === "Escape" || event.keyCode === 27) close();
          break;
        case "click":
          if (
            event.target === this ||
            event.target.classList.contains("js-ppCloseBtn")
          )
            close();
          break;
      }
    };

    eventOpenBtn.addEventListener("click", function () {
      root.classList.add("show-event-popup");

      document.addEventListener("keyup", closeEventPP);
      eventPP.addEventListener("click", closeEventPP);
    });

    // eventOpenBtn.addEventListener("click", function() {
    //    root.classList.add("show-event-popup");
    // });

    // eventPP.addEventListener("click", function(event) {
    //   if (event.target === this ||
    //     event.target.classList.contains("js-ppCloseBtn")
    //   ) {
    //     root.classList.remove("show-event-popup");
    //   }
    // });

    // document.addEventListener("keyup", function(event) {
    //   if (event.key === "Escape" || event.keyCode === 27) {
    //     console.log(event);
    //     root.classList.remove("show-event-popup");
    //   }
    // });
  }
})();
