let currentCard;
let count = 0;
$(".board").css("display", "none");

$(".card").each(function (index, card) {
  $(card).on("click", function (e) {
    if (currentCard) {
      if (
        $(this).data("match") === currentCard.data("match") &&
        $(this).data("group") === currentCard.data("group")
      ) {
        $(this).css("outline", "none");
        currentCard = undefined;
      } else if ($(this).data("match") === currentCard.data("match")) {
        let match = $(".match-" + $(this).data("match"));

        match.css("outline", "2px solid green").css("background", "lightgreen");
        count++;

        setTimeout(function () {
          match.css("visibility", "hidden");
          currentCard = undefined;
          if (count == 8) {
            $(".board").css("display", "none");
            $(".end").css("display", "block");
          }
        }, 250);
      } else {
      }
    } else {
      $(this).css("outline", "2px solid orange");
      $(this).css("background", "#F7CD7C");
      currentCard = $(this);
    }
  });
});

$(".play-btn").click(function () {
  $(".board").css("display", "block");
  $(".game").hide();
});
