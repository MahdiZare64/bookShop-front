$(document).ready(function () {
  toastr.options = {
    closeButton: true,
    preventDuplicates: true,
    progressBar: true,
    rtl: true,
  };

  $(function () {
    updateCartItems();
  });

  function toggleSidebar(selector) {
    $(".sidebar-bg").toggleClass("activate");
    $(selector).toggleClass("activate");
  }

  function closeSidebar(selector) {
    $(".sidebar-bg").removeClass("activate");
    $(selector).removeClass("activate");
  }

  $(".cart-toggle").on("click", function () {
    toggleSidebar("#side-cart");
  });

  $(".close-sidebar").on("click", function () {
    closeSidebar(".sidebar");
    if ($("aside.side-bar").length) {
      $("aside.side-bar").removeClass("activate");
    }
  });

  $(".menu-toggle").on("click", function () {
    toggleSidebar("#side-menu");
  });

  $("#sidebar-button").on("click", function () {
    $(".sidebar-bg").addClass("activate");
    $("aside.side-bar").addClass("activate");
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

  function changePrice(inp) {
    const priceDiv = $(inp).parents("tr").find("#price-holder");
    const price = Number($(priceDiv).attr("data-price"));
    const count = Number($(inp).val());
    let final = price * count;
    final = final.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $(priceDiv).text(final);
    $("#update-cart").removeClass("disabled");

  }

  $(".counter-wrapper input").change(function () {
    if ($(this).val() < 1) {
      $(this).val(1);
    }
    changePrice($(this));
  });
  $(".counter-wrapper .plus").click(function () {
    const inp = $(this).parent().children("input");
    const value = $(inp).val();
    $(inp).val(Number(value) + 1);

    changePrice(inp);
  });
  $(".counter-wrapper .minus").click(function () {
    const inp = $(this).parent().children("input");
    const value = $(inp).val();
    if (Number(value) > 1) {
      $(this)
        .parent()
        .children("input")
        .val(Number(value) - 1);

      changePrice(inp);
    }
  });

  function updateCartItems() {
    $.ajax({
      method: "GET",
      url: "/carts/GetCartItems",
    }).done(function (res) {
      $("#cart-body").empty();
      let count = 0;
      let price = 0;
      $(".counter").html(count);
      $(".price").html(price);
      $(res).each(function () {
        const data = $(this)[0];
        count += data.count;
        price += data.price * data.count;
        const item = `<a id="cart${data.id}" class="side-item row w-100">
              <div href="#" class="col-4">
                  <img src="/Media/Product/${data.imageSrc}" alt="">
              </div>
              <div class="col-8">
                  <div class="side-cart-title mb-2">${data.title}</div>
                  <div class="side-cart-peice text-success">
                      <span class="side-cart-count text-muted">${data.count} &times; </span>
                      ${data.price} تومان
                  </div>
              </div>
              <span onclick="removeCart(${data.id})" class="side-cart-close">
                  <i class="far fa-times"></i>
              </span>
          </a>`;
        $("#cart-body").append(item);
        $(".counter").html(count);
        $(".price").html(price);
      });
    });
  }
  function ajaxUrl(url, data) {
    $.ajax({
      method: "POST",
      url: url,
      data: data,
    }).done(function (res) {
      if (res.isSuccess) {
        toastr.info(res.message);
      } else {
        toastr.error(res.message);
      }

      updateCartItems();
    });
  }
  function addToCart(id) {
    var data = {
      productId: id,
    };

    ajaxUrl("/carts/AddToCart", data);
    setTimeout(function () {
      updateCartItems();
    }, 1500);
  }
  function UpdateCart(id) {
    var data = {
      productId: id,
    };
    ajaxUrl("/carts/AddToCart", data);
  }

  function removeCart(id, remove) {
    var data = {
      orderDetailId: id,
    };
    $(".sidebar-bg").removeClass("activate");
    $(".sidebar").removeClass("activate");
    ajaxUrl("/carts/removeCart", data);
    if (remove) {
      $(`#cart-item${id}`).remove();
    }
  }

  function updateCartList() {
    let data = [];
    $(".cart-table tbody tr").each(function () {
      const count = $(this).find(".counter-wrapper input").val();
      const productId = $(this).attr("data-id");
      const item = {
        count: count,
        productId: productId,
      };
      data.push(item);
    });
    $("#update-cart").addClass("disabled");
    ajaxUrl("", { data: data });

    let totalPrice = 0;
    $(".cart-table tbody tr").each(function () {
      const itemPrice = Number(
        $(this).find("#price-holder").attr("data-price")
      );
      const itemCount = Number($(this).find(".counter-wrapper input").val());
      totalPrice += itemPrice * itemCount;

      const itemId = $(this).attr("data-id")
      $(`.checkout-main .book-item[data-id='${itemId}'] .book-count`).text(itemCount)
    });
    $("#total-price").text(
      totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );

  }
  $("#update-cart").click(updateCartList);
  $("#cart-form-btn").click(function () {
    $("#cart-form").submit();
  });
});
