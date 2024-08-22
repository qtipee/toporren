
/*
  Parcourt tous les champs ayant la classe 'required' du formulaire donné.
  Ajoute la classe 'empty' à chaque champ requis vide.

  @param form (jQuery)
    le formulaire dont les champs requis sont à vérifier

  @return
    true si tous les champs requis sont remplis, false sinon
*/
function formRequired(form) {
  var complete = true;
  //parcourt tous les champs avec la classe 'required'
  form.find(".required").each(function() {
    //champ vide
    if ($(this).val() == "") {
      $(this).addClass("empty");
      complete = false;
    }
    else {
      $(this).removeClass("empty");
    }
  });

  return complete;
}

function showLinkedInput(item) {
  var target = item.attr("target");
  // !! niveau inférieur !!
  var form = item.closest("form");
  form.find(".showInputTarget").addClass("hidden");
  if (target != "none") {
    form.find(".showInputTarget[name='" + target + "']").removeClass("hidden");
  }
}





/*
  Bidings des événements
*/
$(document).ready(function() {

  /*
    Un clic sur un élément ayant la classe 'showInput' affiche le champ dont le nom
    correspond à l'attribut target de l'élément cliqué, à moins que le nom soit 'none'
    et aucun champ n'est affiché dans ce cas
  */
$(document).on("click", ".showInput", function() {
  showLinkedInput($(this));
});

  

});
