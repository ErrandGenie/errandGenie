var app = angular.module("app", ["ngAnimate"]);

app.controller("mainCtrl", function ($scope) {
  $scope.boxes = [
    {
      name: "Friends",
      image: "img/partners/alexey-mak-sMZLg77Z2Dk-unsplash.jpg",
    },
    {
      name: "Free",
      image: "img/partners/claudio-schwarz-purzlbaum-3DJQ5Ja1sxQ-unsplash.jpg",
    },
    {
      name: "Explore",
      image: "img/partners/jen-theodore-zL2FTj0gDZo-unsplash.jpg",
    },
    {
      name: "Vast",
      image: "img/partners/lse-library-ddNkplRhzv0-unsplash.jpg",
    },
    {
      name: "Playful",
      image: "img/partners/lse-library-Mx1sghCziHo-unsplash.jpg",
    },
    {
      name: "Grand",
      image: "img/partners/nicolas-peyrol-NAhITPrc0as-unsplash.jpg",
    },
    {
      name: "Mist",
      image: "img/partners/rolliz.jpg",
    },
    {
      name: "Sea",
      image: "img/partners/slidebean-hYN111MD_-M-unsplash.jpg",
    },
    {
      name: "Reach",
      image: "img/partners/thomas-allsop-GcJn2VB9MkM-unsplash.jpg",
    },
    {
      name: "Awe",
      image: "img/partners/WhatsApp Image 2020-10-13 at 12.13.06 AM.jpeg",
    },
    {
      name: "Surf",
      image: "img/partners/y-cai-Ch_QF4IocbU-unsplash.jpg",
    },
    {
      name: "Thrill",
      image: "img/partners/sky-plus-logo.png",
    },
  ];

  $scope.selected = [];
  $scope.selectBox = function (item, position) {
    $scope.selected = [
      {
        item: item,
        position: position,
      },
    ];
    $scope.$apply();
  };
  $scope.clearSelection = function () {
    $scope.selected = [];
  };
});

app.directive("box", function () {
  return {
    restrict: "E",
    scope: {},
    bindToController: {
      onSelect: "=",
      item: "=",
    },
    controllerAs: "box",
    controller: function () {
      var box = this;

      box.goFullscreen = function (e) {
        box.onSelect(box.item, e.target.getBoundingClientRect());
      };
    },
    link: function (scope, element) {
      element.bind("click", scope.box.goFullscreen);
      element.css({
        "background-image": "url(" + scope.box.item.image + ")",
      });
    },
  };
});

app.directive("bigBox", function ($timeout) {
  return {
    restrict: "AE",
    scope: {},
    bindToController: {
      position: "=",
      selected: "=",
      onSelect: "=",
    },
    controllerAs: "box",
    controller: function () {
      var box = this;
    },
    link: function (scope, element) {
      var css = {};
      for (var key in scope.box.position) {
        css[key] = scope.box.position[key] + "px";
      }

      element.css(css);

      $timeout(function () {
        element.css({
          top: "50%",
          left: "10%",
        });
        element.addClass("image-out");
      }, 200);

      $timeout(function () {
        element.css({
          width: "80%",
          height: "100%",
        });
      }, 500);

      $timeout(function () {
        element.addClass("show");
      }, 800);
    },
  };
});
