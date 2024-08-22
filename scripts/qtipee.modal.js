
const DefaultModalSettings = {
  width: 800,
  height: 450,
  color: "#28bb08",
  title: "You forgot the title",
  content: "You forgot the content.",
  singleBtn: false,
  btnText: "Ok",
  id: "defaultID"
};

//Les différents types de modal et leur couleur associée
const ModalEnum = {
  "CONFIRM": "greenModal",
  "WARNING": "orangeModal",
  "ERROR": "redModal"
};

/*
  Un modal

  @param type (ModalEnum)
    le type du modal
  @param title
    le titre du modal
  @param content
    le contenu du modal
  @param btnText
    le texte du bouton de confirmation
    (une chaîne vide crée un modal avec un bouton d'action unique)
  @param id
    l'id du modal
  @param attr (objet JS / facultatif)
    les éventuels attributs html du modal
*/
function Modal(settings) {

  this.settings = settings != "undefined" ? settings : DefaultModalSettings;

  this.isSet = function(prop) {
    //return typeof this.settings.prop !== "undefined" ? this.settings.prop : DefaultModalSettings.prop;
    //console.log(prop);
    console.log(this.settings[prop]);
    return "";
  }

  /*
    Crée le modal en fonction des paramètres
  */
  this.create = function() {
    let singleBtn = this.isSet("singleBtn");
    let modal = "<div class='modal " + (singleBtn ? "oneAction" : "") + "' id='" + this.isSet("id") + "'>";
    modal += "<div class='modalHeader'><h3 class='title'>" + this.isSet("title") + "</h3></div>";
    modal += "<div class='modalContent'>" + this.isSet("content") + "</div>";
    modal += "<div class='modalFooter'><div class='qrow'>";
    if (singleBtn) {
      modal += "<div class='qcol two offset-ten'>";
      modal += "<button class='btn confirm'>Ok</button></div>";
    }
    else {
      modal += "<div class='qcol two offset-eight'>";
      modal += "<button class='btn confirm'>" + this.isSet("btnText") + "</button>";
      modal += "</div><div class='qcol two'>";
      modal += "<button class='btn cancel'>Annuler</button></div>";
    }
    modal += "</div></div></div>";
    $(modal).appendTo("body");
    //ajout des éventuels attributs html au modal
    let $_modal = $(".modal[id='" + this.isSet("id") + "']");
    for (let key in this.settings.attr) {
      $_modal.attr(key, this.settings.attr[key]);
    }

    //css
    $_modal.css("width", this.isSet("width"));
    $_modal.css("border", "1px solid " + this.isSet("color"));
    $_modal.find(".modalHeader").css("background", this.isSet("color"));
    $_modal.find(".modalContent").css("height", this.isSet("height"));
    $_modal.find(".modalFooter").css("border-top", this.isSet("color"));

    //ombrage ajouté s'il n'est pas déjà présent
    if ($(document).find(".modalBackground").length < 1) {
      $("<div class='modalBackground'></div>").appendTo("body");
    }
  };

  /*
    Ajoute le contenu donné au contenu déjà présent du modal

    @param content
      le contenu à ajouter au modal
  */
  this.addContent = function(content) {
    this.content += content;
    $(content).appendTo($(".modal[id='" + this.isSet("id") + "']").find(".modalContent"));
  };

  /*
    Remplace le contenu du modal par celui donné

    @param content
      le nouveau contenu du modal
  */
  this.setContent = function(content) {
    this.content = content;
    $(".modal[id='" + this.isSet("id") + "']").find(".modalContent").html(content);
  };

  //méthodes appelées à la création de l'objet
  this.create();
}

/*
  Supprime le modal donné de la page

  @param modal
    le modal à supprimer
*/
function removeModal(modal) {
  modal.remove();
  //l'ombrage est enlevé s'il n'y a plus de modal sur la page
  if ($(document).find(".modal").length < 1) {
    $(document).find(".modalBackground").remove();
  }
}

$(document).ready(function() {

  /*
    Un clic sur le bouton 'Annuler' d'un modal ou sur le bouton d'un modal n'en
    ayant qu'un supprime le modal
  */
  $(document).on("click", ".modal .modalFooter .btn.cancel, .modal.oneAction .modalFooter .btn.confirm", function() {
    removeModal($(this).closest(".modal"));
  });

});
