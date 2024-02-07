(function () {
  "use strict";

  /* Переключение навигации */
  const root = document.documentElement;

  const navToggle = document.querySelector("#js-navToggle");

  navToggle.addEventListener("click", function () {
    root.classList.toggle("show-nav");
  });
  
  /* Открытие/закрытие формы мероприятия */
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

    /* Анимация слайдеров */
    const swipers = document.querySelectorAll(".js-swiper");

    swipers.forEach(function(swiper) {
      new Swiper(swiper, {
        updateOnWindowResize: true,
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 0,
        speed: 500,
        grabCursor: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-arrow-next",
          prevEl: ".swiper-arrow-prev",
          disabledClass: "arrow--disabled"
        }
      })
    });

    /* Проверка загрузки фонового изображения для листинга событий на главной странице */
    const upcomingWrapper = document.querySelector("#js-upcoming-wrapper");

    const img = new Image();

    const bgImage = getComputedStyle(upcomingWrapper).backgroundImage;

    const url = bgImage.slice(4, -1).replace(/"/g, "");
    img.src = url;

    img.addEventListener("error", function() {
      upcomingWrapper.setAttribute("style", "background-color: white");
    });

    /* Инициализация карты */
    initMap();

    async function initMap() {
      // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
      await ymaps3.ready;

      const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps3;

      // Import the package to add a default marker
      const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

      // Иницилиазируем карту
      const contactsMap = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.querySelector("#js-contactsMap"),

        // Передаём параметры инициализации карты
        {
          location: {
            // Координаты центра карты
            center: [84.96274, 56.49387],

            // Уровень масштабирования
            zoom: 15
          },
          showScaleInCopyrights: true
        },
        [
          // Add a map scheme layer
          new YMapDefaultSchemeLayer({}),
          // Add a layer of geo objects to display the markers
          new YMapDefaultFeaturesLayer({})
        ]
      );

      const marker = new YMapDefaultMarker(
        {
          coordinates: [84.96274, 56.49385],
          title: "TAGREE digital",
          color: "#FF2400"
        }
      );
      contactsMap.addChild(marker);
    }

    // const contactsMap = document.querySelector("#js-contactsMap");

    // if (contactsMap) {
    //   const mapStyles = [
    //     {
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           color: "#242f3e"
    //         }
    //       ]
    //     },
    //     {
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#746855"
    //         }
    //       ]
    //     },
    //     {
    //       elementType: "labels.text.stroke",
    //       stylers: [
    //         {
    //           color: "#242f3e"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "administrative",
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           visibility: "off"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "administrative.locality",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#d59563"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "poi",
    //       stylers: [
    //         {
    //           visibility: "off"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "poi",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#d59563"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "poi.park",
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           color: "#263c3f"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "poi.park",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#6b9a76"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road",
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           color: "#38414e"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road",
    //       elementType: "geometry.stroke",
    //       stylers: [
    //         {
    //           color: "#212a37"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road",
    //       elementType: "labels.icon",
    //       stylers: [
    //         {
    //           visibility: "off"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#9ca5b3"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           color: "#746855"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "geometry.stroke",
    //       stylers: [
    //         {
    //           color: "#1f2835"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "road.highway",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#f3d19c"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "transit",
    //       stylers: [
    //         {
    //           visibility: "off"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "transit",
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           color: "#2f3948"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "transit.station",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#d59563"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "water",
    //       elementType: "geometry",
    //       stylers: [
    //         {
    //           color: "#17263c"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "water",
    //       elementType: "labels.text.fill",
    //       stylers: [
    //         {
    //           color: "#515c6d"
    //         }
    //       ]
    //     },
    //     {
    //       featureType: "water",
    //       elementType: "labels.text.stroke",
    //       stylers: [
    //         {
    //           color: "#17263c"
    //         }
    //       ]
    //     }
    //   ];

    //   const mapCenter = new google.maps.LatLng(56.49387, 84.96274);
      
    //   const mapOptions = {
    //     center: mapCenter,
    //     disableDefaultUI: true,
    //     draggable: true,
    //     gestureHandling: "cooperative",
    //     scrollwheel: false,
    //     styles: mapStyles,
    //     zoom: 15,
    //     zoomControl: true,
    //     zoomControlOptions: {
    //       position: google.maps.ControlPosition.RIGHT_BOTTOM
    //     }
    //   };

    //   const map = new google.maps.Map(contactsMap, mapOptions);

    //   const point = new google.maps.LatLng(56.49385, 84.96274);
      
    //   const mapPin = new google.maps.MarkerImage(
    //     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABHCAMAAABf/MtLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAADAUExURUdwTK8wILwyJL0zI70yJbwyI79AIL0yJL8wILs0JLw0JLsyJL0zJbwyJbwzJB8eHv///3Nycjs6OldWVsRMP4+OjsRNP8fHx+Pj492ZkUlISOazrauqqu7MyMfGxsBAMS0sLMlZTc1mW/vy8sBAMvvy8WVkZMVMQPbl48lZTtmMg81mWtmMhMxmW4+Pj/fm4/fl5OGmnvHx8Z2cnMVNQPLZ1tWAdt6ZktBzaHNzc9V/duq/u+Gmn8hZTNFzabm5uYZR+N4AAAAOdFJOUwAQz9/f3xB/EIDPz9/ftWbT5QAAAWxJREFUWMPt1VlTwjAQAGDEaluPJiQhYGjtAeUQxPu+/v+/cpO2DC+OI7PRYcw+JOlO55vMdpO2WmtBNo3W9+FsZzvb2c529l/Y45hXi/iG6yA8fuKMkGUMqS5X1RvLONvA7tJOtaD9au5AginSo5A6hUem3+hRhmUTwhubjNFttbKzDwT7GqqtGpv0G5vE2Ptes9FrsvqW/9FmXDGIjHCuZwYJc0wUHCn9aYlJKO7uKmf/sh39LJxtxx7lObJ9e1emMA1oISN5OUmFmNMrIQSGnd/TM2M/w3iRwCDpCdK+i9EwMfY5jMkU056l0SvNtf0GT0PUfT9K+a6tAYUKP0wFpl3oSpTansuXchIh2jM9LKDWet/SlATNLkxjg2lqsjAtg9cnOqCbU1Ev9Ji6+wTTdv/LLbJdbHnsh160GwZW6ANz+Ns28LC+WXwL9lFt71mwv7gSUcKzuG/fYr2DtqEPd2w0YeAfR55vg/4EpN3f8dlAXnoAAAAASUVORK5CYII=",
    //     new google.maps.Size(91, 71), //size
    //     new google.maps.Point(0, 0),  //origin point
    //     new google.maps.Point(0, 71)  //offset point
    //   );

    //   new google.maps.Marker({
    //     position: point,
    //     map: map,
    //     icon: mapPin,
    //     title: "TAGREE digital"
    //   });
    // }
  }
})();
