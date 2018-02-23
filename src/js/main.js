"use strict";
var VN = window.VN || {};

VN.Portfolio = (function ($) {
    var portfolio = {

        _init: function () {
            portfolio._addEventListeners();
            portfolio._formValidation();
            portfolio._modal();
            portfolio._scroll();
            portfolio._retriveData();
        },

        _addEventListeners: function() {
			$(document).on('click', '.jsModalDismiss', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
			});
        },

        _retriveData: function() {
		    var dataSource = '/portfolio.json';
		    $.getJSON(dataSource, portfolio._renderDataVisualsTemplate);
		},

		// render compiled handlebars template
		_renderDataVisualsTemplate: function(data){
		    portfolio._renderHandlebarsTemplate('/portfolio.handlebars', '.jsFolioWrapper', data);
		},
		
		// render handlebars templates via ajax
		_getTemplateAjax: function(path, callback) {
		    var source, template;
		    $.ajax({
		        url: path,
		        success: function (data) {
		            source = data;
		            template = Handlebars.compile(source);
		            if (callback) callback(template);
		        }
		    });
		},

		_hasWebP: function() {
		    var rv = $.Deferred(), img = new Image();
		    img.onload = function() { rv.resolve(); };
		    img.onerror = function() { rv.reject(); };
		    img.src = "http://www.gstatic.com/webp/gallery/1.webp";
		    return rv.promise();
		},


		// function to compile handlebars template
		_renderHandlebarsTemplate: function(withTemplate,inElement,withData){
		    portfolio._getTemplateAjax(withTemplate, function(template) {
		        $(inElement).html(template(withData));
		    });
		},

    	/*----------------------------------------------------*/
		/*	Modal Popup
		------------------------------------------------------*/

		_modal: function() {
			$('.jsFolioWrapper').on('click', '.jsFolioItem a',function (e) {
				e.preventDefault();
			    var theGoodStuff = $(this).attr('href');
			    $.magnificPopup.open({
			    	items: {
			            src: theGoodStuff
			        },
			        type:'inline',
			        gallery: {
				      enabled: true
				    },
					fixedContentPos: false,
					removalDelay: 300,
					showCloseBtn: false,
					mainClass: 'mfp-fade'
			    });
			});
		},

        /*---------------------------------------------------- */
	  	/* Smooth Scrolling
	  	------------------------------------------------------ */
	  	_scroll: function() {
		  	$('.jsSmoothScroll').on('click', function (e) {
			 	e.preventDefault();
		   		var target = this.hash,
		    		$target = $(target);

		    	$('html, body').stop().animate({
		       		'scrollTop': $target.offset().top
		      	}, 500, 'swing', function () {
		      		window.location.hash = target;
		      	});
		  	});
	  	},

        /*---------------------------------------------------- */
		/*	contact form
		------------------------------------------------------ */
        _formValidation: function() {
           $('.jsContactForm').validate({
			/* submit via ajax */
			submitHandler: function(form) {
				var sLoader = $('#submit-loader');

				$.ajax({
			      type: "POST",
			      url: "inc/sendEmail.php",
			      data: $(form).serialize(),
			      beforeSend: function() {
			      	sLoader.fadeIn();
			      },
			      success: function(msg) {

		            // Message was sent
		            if (msg == 'OK') {
		            	sLoader.fadeOut();
		               $('#message-warning').hide();
		               $('#contactForm').fadeOut();
		               $('#message-success').fadeIn();
		            }
		            // There was an error
		            else {
		            	sLoader.fadeOut();
		               	$('#message-warning').html(msg);
			            $('#message-warning').fadeIn();
		            }
			      },
			      error: function() {
			      	sLoader.fadeOut();
			      	$('#message-warning').html("Something went wrong. Please try again.");
			        $('#message-warning').fadeIn();
			      }

		      });
	  		}
		});
        }
    };

    $(function() {
        portfolio._init();
    });

})($);