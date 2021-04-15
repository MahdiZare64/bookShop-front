$(document).ready(function () {
  toastr.options = {
    closeButton: true,
    preventDuplicates: true,
    progressBar: true,
    rtl: true,
  };

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

  $(".ads-slider").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    rtl: true,
    nav: true,
  });

  $(".number-input").on("input", function () {
    $(this).val($(this).val().replace(/[^\d]/, ""));
  });

  if ($("#timer").length) {
    const counter = setInterval(function () {
      const sec = Number($("#second-counter").text());
      if (sec === 0) {
        $("#second-counter").text(59);
        const min = Number($("#minute-counter").text());
        $("#minute-counter").text(min - 1);

        if (min === 0) {
          $("#timer").css("display", "none");
          $("#resend-code").css("display", "block");
        }
      } else {
        $("#second-counter").text(sec - 1);
      }
    }, 1000);
  }

  $(".check-form").submit(function (e) {
    let isValid = true;
    let validationMessage = "";

    $(this)
      .find("input")
      .each(function () {
        const value = $(this).val();

        if ($(this).hasClass("phone-number")) {
          const re = /^[0]?9\d{9}$/g;
          if (!re.test(value)) {
            isValid = false;
            validationMessage = "لطفا شماره تلفن خود را به درستی وارد کنید !";
          }
        } else if ($(this).hasClass("code-input")) {
          if (value.length !== 5) {
            isValid = false;
            validationMessage = "لطفا رمز عبور خود را به درستی وارد کنید.";
          }
        }
      });

    if (!isValid) {
      e.preventDefault();
      toastr.error(validationMessage);
    }
  });
});
