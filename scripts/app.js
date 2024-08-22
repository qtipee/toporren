/*
	JavaScript de la page index.php de toporren.ch

	@author
		qtipee
*/
$(document).ready(function() {

	//Owl-Carousel Archives
	$(".owl-archives").owlCarousel({
		nav: true,
		navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
		dots: false,
		margin: 25,
		lazyLoad: true,
		//breakpoint from value to next one
		responsive: {
			0: {
				items: 2
			},
			480: {
				items: 3
			},
			679: {
				items: 4
			},
			991: {
				items: 5
			},
			1200: {
				items: 6
			}
		}
	});

	//Owl-Carousel Sponsors
	$(".owl-sponsors").owlCarousel({
		nav: true,
		navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
		dots: false,
		margin: 20,
		lazyLoad: true,
		loop: true,
		autoplay: true,
		autoplayTimeout: 2500,
		autoplaySpeed: 1000,
		autoplayHoverPause: true,
		//breakpoint from value to next one
		responsive: {
			0: {
				items: 3
			},
			480: {
				items: 4
			},
			679: {
				items: 5
			},
			991: {
				items: 6
			},
			1200: {
				items: 8
			}
		}
	});

    //Défini l'année actuelle
    $("#year").text(new Date().getFullYear());

	//Taille de la navbar en fonction de la position sur le site
	$(document).scroll(function() {
		$(this).scrollTop() > 0 ? $(".navbarWrapper").addClass("lessPadding") : $(".navbarWrapper").removeClass("lessPadding");
	});

	//Un clic sur un lien avec la classe 'smoothScroll' est animé via la fonction 'animate' de jQuery
	$(".smoothScroll").click(function(e) {
		e.preventDefault();
		//html pour firefox
		$("body, html").animate({
			scrollTop: $($(this).attr("href")).offset().top - 30
		}, 1000);
	});

	//Un clic sur un lien de la phoneNav ferme le menu
	$(".phoneNav .smoothScroll").click(function() {
		$(".navbarWrapper .menu").trigger("click");
	});

	//Un clic sur le menu de la phoneNav ouvre/ferme la liste des liens
	$(".navbarWrapper .menu").click(function(){
		$(this).toggleClass("open");
		$("body").toggleClass("noscroll");
	});

	$(document).on("click", ".contactWrapper .contactForm .sendmail", function(e) {
		e.preventDefault();
		//supprime l'éventuel message présent
		$(".contactWrapper .contactForm .mailResponse").remove();
		//les champs requis sont remplis
		if (formRequired($(this).closest("form"))) {
			var from = $(".contactForm .email").val();
			var message = $(".contactForm .message").val();
			var post = {
				"message": message,
				"object": "[ToPorren] Formulaire de contact",
				"from": from,
				"to": "do.vallat@bluewin.ch"
			};
			$.post("scripts/sendmail.php", post, function(response) {
				$(response).appendTo(".contactWrapper .contactForm");
				//efface le contenu des champs si le mail a été envoyé
				if ($(".contactWrapper .contactForm .mailResponse").hasClass("sent")) {
					$(".contactWrapper .contactForm").find("input, textarea").val("");
				}
			});
		}
	});

	//Un click sur la croix du returnMessage fait disparaître ce message
	$(document).on("click", ".contactWrapper .contactForm .hideResponse", function() {
		//$(this).parent().addClass("fade");
		$(this).parent().animate({"opacity": 0}, 500);
		$(this).parent().hide();
	});

	//Un click sur le bouton 'Plus d'actualités' rend visibles quelques actualités supplémentaires
	$(".newsWrapper .btn.moreNews").click(function() {
		var count = 0;
		var max = 2;
		var total = 0;
		//rend visibles jusqu'à 'max' actualités supplémentaires
		$(".newsWrapper .news").each(function() {
			if (count < max) {
				if ($(this).hasClass("hiddenNews")) {
					$(this).removeClass("hiddenNews");
					++count;
				}
			}
			//compte le nombre d'actualités visibles
			if ((! $(this).hasClass("hiddenNews")) && $(this).hasClass("count")) {
				++total;
			}
		});
		//si toutes les actualités sont visibles, le bouton 'Plus d'actualités' devient inactif
		if (total == $(".newsWrapper .news.count").length) {
			var btn = $(".newsWrapper .btn.moreNews");
			btn.addClass("disabled");
			btn.prop("disabled", "disabled");
		}
	});

});
