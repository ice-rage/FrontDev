(function () {
  "use strict";

  if (!$) return;

  const reserveForm = $("#js-reserveForm");

  if (reserveForm) {
    
    const checkBoxes = $("#js-reserveChecks :checkbox");
    const tables = $(".js-sceneTable");
    const submitButton = $("#js-reserveSubmit");

    const activeClass = "scene__table--active";
    let price = null;

    try {
      price = jQuery.parseJSON(reserveForm.attr("data-price"));
    } catch(e) {
      console.error(e);
    }

    checkBoxes.change(function () {
      
      const checkBoxName =  $(this).attr("name");
        
      tables.filter(function () {

        const table = $(this);

        if (table.attr("data-check") == checkBoxName) {
          table.toggleClass(activeClass);
        }
      });

      calculateTicketsSum();
      toggleSubmitButtonState();
    });

    tables.click(function () {
      
      $(this).toggleClass(activeClass);

      const tableName = $(this).attr("data-check");

      checkBoxes.filter(function () {

        const checkBox = $(this);

        if (checkBox.attr("name") == tableName) {
          checkBox.prop("checked", !checkBox.prop("checked"));
        }
      });

      calculateTicketsSum();
      toggleSubmitButtonState();
    });

    const calculateTicketsSum = function () {

      if (price != null) {

        let blackCheckedCount = 0;
        let redCheckedCount = 0;

        checkBoxes.each(function () {

          if ($(this).is(":checked")) {

            if ($(this).parent("label").hasClass("check--red")) {
              redCheckedCount++;
            } else {
              blackCheckedCount++;
            }
          }
        });

        const redSum = redCheckedCount * price.red;
        const blackSum = blackCheckedCount * price.black;

        $("#js-redPriceQty").text(redCheckedCount);
        $("#js-redPriceSum").text(redSum);
        $("#js-blackPriceQty").text(blackCheckedCount);
        $("#js-blackPriceSum").text(blackSum);
        $("#js-totalSum").text(redSum + blackSum);
      }
    }

    const toggleSubmitButtonState = function () {

      if (submitButton) {
        submitButton.attr("disabled", !checkBoxes.is(":checked"));
      }
    }
  }
})();