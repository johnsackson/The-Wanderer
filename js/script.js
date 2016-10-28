"use strict";

$(document).ready(function() {
    
    var scrollStart = $('#intro').offset().top,
        $window = $(window);    
    
    //is mobile variable - determines if the device is mobile or not
    var isMobile = {
        Android: function() {return navigator.userAgent.match(/Android/i);},
        BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
        iOS: function() {return navigator.userAgent.match(/iPhone/i);},
        Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
        Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    
    //if not mobile hang the header on scroll
    if(!isMobile.any() && ($window.width() >= 768)) {
        $window.scroll(function() {
            if($window.width() >= 768) {
                if($window.scrollTop() <= 10) {
                    $('.header').removeClass('sticky-scrolling')
                } else if ( $window.scrollTop() >= scrollStart ) {
                    $('.header').addClass('sticky-scrolling');
                } 
            }

        });
    }
    
    $window.resize(function(){
        if($window.width() < 768) {
            $('.header').removeClass('sticky-scrolling');
        } else {
            $('.header').addClass('sticky-scrolling');
        }   
    });
    
      //----------------------------//
     // **** scroll page code **** //
    //----------------------------//
    
    $(document).on("scroll", onScroll); //makes function call to onScroll on each scroll

    //navigation click function
    $('.logo, .nav a[href^="#"], .footer a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
        
        //variables
        var target = this.hash,
            menu = target;
        var $target = $(target);
        
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    // onScroll function
    function onScroll(e){
        var scrollPos = $(document).scrollTop();
        $('.nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav ul li a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

        
      // --------------------------------- //
     // **** animate skills bar code **** //
    // --------------------------------- //
    
    //variables
    var distance = $('.skills').offset().top - 600;

    $window.scroll(function() {
        if ( $window.scrollTop() >= distance ) {
            $('.skill').addClass('animate')
        }
    });    
    
    
    
      // ----------------------- //
     // **** carousel code **** //
    // ----------------------- //
    
    //variables
    var settings = { continuous : true, pageStyles: true, transitions : { content : '', buttons : '' } };
    var pages    = $("#testimonial-slider #pages li").length;
    var currentPage;
    var reachedLastPage, reachedFirstPage;
  
    if (pages > 0) {
        
        // hide navigation arrows when there is a single page
        if (pages == 1)
        {
          $("#testimonial-slider #prev").addClass("hidden");
          $("#testimonial-slider #next").addClass("hidden");
        }

        if(!settings.continuous)
          $("#testimonial-slider #prev").addClass("hidden");
        
        if (settings.pageStyles)
          $("#testimonial-slider").addClass("page1");

        $("#testimonial-slider #pages :first-child").addClass("selected");
        $("#testimonial-slider .navigation :first-child a").addClass("selected");
    }


    $(".navigation a").click(function(e) {
        e.preventDefault();
        // remove the selected class from the currently selected indicator
        $(this).parent().parent().find(".selected").removeClass("selected");
        // make the clicked indicator the selected one
        $(this).addClass("selected");

        updateSlideshowForSelectedPage();
    });

    // navigation arrows
    $("#next").click(function(e) {
        goToNext();
    });

    $("#prev").click(function(e) {
        goToPrev();
    });

    // keyboard shortcuts
    $("body").keyup(function(e) {
        if (e.keyCode == 39) // key right
          goToNext();
        else if (e.keyCode == 37) // key left
          goToPrev();
    });
    
    //function takes you to next testimonial
    function goToNext() {
        reachedLastPage = $(".navigation .selected").parent().index()+1 >= pages;

        if (reachedLastPage && settings.continuous)
        {
          $(".navigation .selected").removeClass("selected")
          $(".navigation :first-child a").addClass("selected");
        }
        else if (reachedLastPage && !settings.continuous)
          return;
        else
          $(".navigation .selected").removeClass("selected").parent().next().find("a").addClass("selected");

        updateSlideshowForSelectedPage();
    }
    
    //function takes you to previous testimonial
    function goToPrev() {
        reachedFirstPage = $(".navigation .selected").parent().index() <= 0;

        if (reachedFirstPage && settings.continuous)
        {
          $(".navigation .selected").removeClass("selected")
          $(".navigation :last-child a").addClass("selected");
        }
        else if (reachedFirstPage && !settings.continuous)
          return;
        else
          $(".navigation .selected").removeClass("selected").parent().prev().find("a").addClass("selected");

        updateSlideshowForSelectedPage();
    }

    //updates testimonial for the selected image
    function updateSlideshowForSelectedPage() {
        var index = $(".navigation .selected").parent().index(),
            classIndex = parseInt(index+1, 10),
            reachedLastPage = $(".navigation .selected").parent().index()+1 >= pages,
            reachedFirstPage = $(".navigation .selected").parent().index() <= 0;

        if (settings.pageStyles)
          $("#testimonial-slider").attr("class", "page" + classIndex);

        if(!settings.continuous)
        {
          reachedLastPage ? $("#testimonial-slider #next").addClass("hidden") : $("#testimonial-slider #next").removeClass("hidden");
          reachedFirstPage ? $("#testimonial-slider #prev").addClass("hidden") : $("#testimonial-slider #prev").removeClass("hidden");
        }

        $("#pages .selected").removeClass("selected");
        $("#pages li:nth-child(" + classIndex + ")").addClass("selected");
    }
    
    
      // ------------------- //
     // **** tabs menu **** //
    // ------------------- //
    
    $(".tabs-menu a").click(function(e) {
        e.preventDefault();

        //current item object
        var currentItem = {
            "tag": $(this).find('span'),
            "class": $(this).find('span').attr('class'),
            "href": $(this).attr('href')
        };
        var activeItem = {
            "tag": $(this).parent().parent().find('li.current').find('span'),
            "class": $(this).parent().parent().find('li.current').find('span').attr('class'),
            "href": $(this).parent().parent().find('li.current').find('a').attr('href')
        };
        if(activeItem.class != currentItem.class) {
            //$(this).parent().parent().find('li.current').children().addClass('animate-me');
            var tab = $(this).attr("href");
            $(".tab-content").not(tab).css("display", "none");
            $(tab).fadeIn();
            currentItem.tag.removeAttr('class').addClass(activeItem.class);                            
            activeItem.tag.removeAttr('class').addClass(currentItem.class);
            $(this).attr('href', activeItem.href);
            $(this).parent().parent().find('li.current').children().attr('href', currentItem.href);
        }            
    });

	//open/close primary navigation
	$('.nav-trigger').on('click', function(){
		$('.cd-menu-icon').toggleClass('is-clicked'); 
		$('header').toggleClass('menu-is-open');
		if( $('.nav').hasClass('is-visible') ) {
            $('body').removeClass('overflow-hidden');
            $('.nav').removeClass('is-visible');
		} else {
            $('body').addClass('overflow-hidden');
            $('.nav').addClass('is-visible');
		}
	});
    
    $('.nav').on('click', function(){
        if( $('.header').hasClass('menu-is-open') ) {
            $('.header').removeClass('menu-is-open');
            $('body').removeClass('overflow-hidden');
        }
    });
   
});
