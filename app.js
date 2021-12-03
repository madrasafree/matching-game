let currentCard;
let count = 0;
$(".board").css("display", "none");

$(".card").each(function (index, card) {
  $(card).on("click", function (e) {
    if (currentCard) { // if current card is the past card and "this" is the current card
      if ($(this).data("match") === currentCard.data("match") &&
        $(this).data("group") === currentCard.data("group")) {// if we picked the same card twice
            
        $(this).css("outline", "2px solid orange");
        $(this).css("background", "#F7CD7C");
        currentCard = $(this);

      } else if ($(this).data("match") === currentCard.data("match")) {// if we picked the right card

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
      } else {// if wrong
            $(this).css("outline", "2px solid red");
            $(this).css("background", "white");
            currentCard.css("outline", "2px solid red");
            currentCard.css("background", "white");
            let thisCard = $(this);
            //after a while we should remove the red on the cards
            setTimeout(function() {
               currentCard.css("outline", "2px solid white");
               thisCard.css("outline", "2px solid white");
               currentCard = undefined;
            }, 250);

      }
    } else { // we picked the first card and currenCard is none
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