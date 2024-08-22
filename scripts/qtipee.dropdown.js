
$(document).ready(function() {

  initDropdown();

  //Initialise les dropdowns présents sur la page
  function initDropdown() {
    $(".dropdown").each(function() {
      let target = $($(this).attr("target"));
      target.attr("dropdown-height", target.outerHeight());
      target.addClass("collapsed");
      target.css("height", "0px");
    });
  }

  //Un clic sur un dropdown affiche/masque le contenu de sa cible (attribut target)
  $(document).on("click", ".dropdown", function() {
    $(this).toggleClass("dropdown-open");
    let target = $($(this).attr("target"));
    let nextHeight;
    //l'élément cible est caché
    if (target.hasClass("collapsed")) {
      nextHeight = target.attr("dropdown-height");
    }
    //l'élément cible est affiché
    else {
      nextHeight = 0;
    }
    target.animate({height: nextHeight});
    target.toggleClass("collapsed");
  });

});
