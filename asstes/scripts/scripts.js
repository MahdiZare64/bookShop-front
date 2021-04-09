$(document).ready(function () {
  function toggleSidebar(selector) {
    $(".sidebar-bg").toggleClass("activate");
    $(selector).toggleClass("activate");
  }

  function closeSidebar(selector) {
    $(".sidebar-bg").removeClass("activate");
    $(selector).removeClass("activate");
  }

  $("#cart-toggle").on("click", function () {
    toggleSidebar("#side-cart");
  });

  $(".close-sidebar").on("click", function () {
    closeSidebar(".sidebar");
  });

  $(".menu-toggle").on("click", function () {
    toggleSidebar("#side-menu");
  });
  $(".side-nav-icon").click(function () {
    $(this).toggleClass("active");
    $(this).parent().parent().children(".side-menu-list").toggleClass("active");
    $(this).parent().children("a").toggleClass("active");
  });
  $("#side-category-btn").click(function () {
    $("#side-section-menu").fadeOut(300);
    $("#side-section-category").fadeIn(300);
    $("#side-menu-btn").removeClass("active");
    $(this).addClass("active");
  });
  $("#side-menu-btn").click(function () {
    $("#side-section-menu").fadeIn(300);
    $("#side-section-category").fadeOut(300);
    $("#side-category-btn").removeClass("active");
    $(this).addClass("active");
  });
});

$(".ads-slider").owlCarousel({
  items: 1,
  loop: true,
  autoplay: true,
  autoplayTimeout: 5000,
  rtl: true,
  nav: true,
});
