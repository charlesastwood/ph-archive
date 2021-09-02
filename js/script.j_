jQuery(function($) {

    //  Listen Window Resize
    $(window).resize(function() {

        //  Get the Window Width
        var winWidth = parseInt($(window).width());

        //  HTML
        var $html = $('html');

        //  Remove Classes
        $html.removeClass('device-xs')
            .removeClass('device-sm')
            .removeClass('device-md')
            .removeClass('device-lg');

        //  Check Sizes and Add Class
        if(winWidth >= 1200)
            $html.addClass('device-lg');
        else if(winWidth >= 991)
            $html.addClass('device-md');
        else if(winWidth >= 768)
            $html.addClass('device-sm');
        else
            $html.addClass('device-xs');

        //  Trigger Screen Updated Event
        $(document).trigger('screen-updated');

        //  Fix Search Container
        fixSearchContainer();

        //  Fix the Overlays
        fixTheOverlays();

    }).resize();

	//	Add Class to Every first and Last Child
    $('nav>a:first, ul>li:first, ol>li:first').addClass('first-child');
    $('nav>a:last, ul>li:last, ol>li:last').addClass('last-child');
    $('.item').find('>.blog-item:first').addClass('first-child');
    $('.item').find('>.blog-item:last').addClass('last-child');

    //  Add the Class to Every Img Tag
    $('img').each(function(){
        var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
        $(this).addClass('img-' + imgClass);
    });

    //	Setup the Nav Handler
    $("#main-header .main-navigation").navsetup();

    //  Init Popover
    $('.has-popover').popover( {

        //  Title
        title: function() {

            //  Title
            var title = $(this).data( 'title' );

            //  Check
            if( ( !title || title.length == 0 ) && $(this).data( 'titleHref' ) && String( $(this).data( 'titleHref' ) ).substring( 0, 1 ) == '#' ) {

                //  Extract Title
                title  = $( $(this).data( 'titleHref' ) ).html();
            }

            //  Return
            return title;
        },

        //  Content
        content: function() {

            //  Content
            var content = $(this).data( 'content' );

            //  Check
            if( ( !content || content.length == 0 ) && $(this).data( 'href' ) && String( $(this).data( 'href' ) ).substring( 0, 1 ) == '#' ) {

                //  Extract Contents
                content  = $( $(this).data( 'href' ) ).html();
            }

            //  Return
            return content;
        }
    } );

    //  Check
    if ($(window).width() > 767) {

        //  Init the Sticky Header
        $("#main-header .main-header-area:not(.no-scroll)").sticky({
            topSpacing: 0,
            responsiveWidth: true,
            getWidthFrom: document.body,
            className: 'fixed-header'
        });
    }

    //  Init the MMenu
    $("#mobile-menu").mmenu({
        classes: "mm-light",
        offCanvas: {
            position  : "left",
            zposition : "next"
        }
    });

    //  Listen for Toggle Extra Content
    $(".toggle-extra-content").click(function(e) {

        //  Toggle
        $(this).parent().find('.extra-contents').slideToggle(500);

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Toggle Extra Content
    $(".toggle-readmore").click(function(e) {

        //  Control
        var $control = $(this);

        //  Target
        var $target = $control.parent().parent().find( '.hidden-toggle-contents' );

        //  Check
        if( !$control.data( 'originalText' ) )  $control.data( 'originalText', $control.text() );

        //  Toggle
        $target.stop( true, true ).slideToggle( 500, function() {

            //  Check
            if( $target.is( ':visible' ) )  $control.addClass( 'showing' ).text( $control.data( 'ignoreText' ) == true ? $control.data( 'originalText' ) : 'Read less' );
            else $control.removeClass( 'showing' ).text( $control.data( 'originalText' ) );
        } );

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Click
    $(".serving-nav a").click(function(e) {

        //  Get the Character
        var theChar = $(this).data('alpha');

        //  Hide Others
        $(this).parent().find('a').not($(this)).removeClass('active');
        $(".serving-data .serving-nav-data").stop(true, true).slideUp(500);

        //  Show the Related
        $(this).addClass('active');
        $(".serving-data .serving-nav-data[data-alpha='" + theChar + "']").stop(true, true).slideDown(500);

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Trigger Click on Active One
    $(".serving-nav a.active").click();

    //  Check for owlCarousel
    if($.fn.owlCarousel) {

        //  Carousel Init
        $('.section-carousel').owlCarousel({
            items: 1,
            nav: false,
            loop: true,
            dots: false,
            single: true,
            autoplay: true,
            autoplayTimeout: 10000,
            autoplayHoverPause: true
        });

        //  Controlless Carousel Init
        $('.section-carousel-nc').each(function () {

            //  Autoplay Timeout
            var apTimeout = $(this).data('autoplayTimeout');
            if (!apTimeout || apTimeout == 'undefined')  apTimeout = 5000;

            //  Count for 500
            var count500 = Math.round($(this).data('itemCount') / 2);
            if (count500 < 1)    count500 = 1;

            //  Options
            var owlOptions = {
                items: $(this).data('itemCount'),
                nav: false,
                loop: true,
                dots: false,
                single: false,
                autoHeight: $(this).data('itemCount') == '1',
                //autoHeight: false,
                autoplay: true,
                autoplayTimeout: apTimeout,
                autoplayHoverPause: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    500: {
                        items: count500
                    },
                    1000: {
                        items: $(this).data('itemCount')
                    }
                }
            };

            //  Check for Animate Options
            if($(this).data('animateIn'))   owlOptions.animateIn = $(this).data('animateIn');
            if($(this).data('animateOut'))   owlOptions.animateOut = $(this).data('animateOut');

            //  Check for Auto Height
            if($(this).data('autoHeight'))   owlOptions.autoHeight = $(this).data('autoHeight');

            //  Init
            $(this).owlCarousel(owlOptions);
        });

        //  Listen for Section Controls Prev
        $(".section-controls .section-control-left").on('click', function (e) {

            //  Get the Carousel Node
            var $carousel = $(this).parent().parent().parent().find('.section-carousel');

            //  Trigger
            $carousel.trigger('prev.owl.carousel');

            //  Prevent Default
            e.preventDefault();
            return false;
        });

        //  Listen for Section Controls Next
        $(".section-controls .section-control-right").on('click', function (e) {

            //  Get the Carousel Node
            var $carousel = $(this).parent().parent().parent().find('.section-carousel');

            //  Trigger
            $carousel.trigger('next.owl.carousel');

            //  Prevent Default
            e.preventDefault();
            return false;
        });
    }

    //  Check
    if($.fn.datepicker) {

        //  Init
        $("div.use-dpicker").datepicker({
            format: 'mm/dd/yyyy'
        }).on('changeDate', function() {

            //  Set Date
            $(this).find('.date-input').val($(this).data('date'));

            //  Hide
            $(this).datepicker('hide');
        });
    }

    //  Init SelectFX
    $(".select-fx").each(function() {
        new SelectFx(this);
    });

    //  Listen for Custom Tabs Navigation
    $(".custom-tabs .tabs-navigation li>a, .tabbed-container .tabs-navigation li>a").click(function(e) {

        //  Get Index
        var index = $(this).parent().index();

        //  Check
        if(!$(this).hasClass('active')) {

            //  Remove Active Classes
            $(this).parent().parent().find('li a.active').removeClass('active');
            $(this).parent().parent().parent().find('.tab-contents>.tab-content').removeClass('active');

            //  Get Target Container
            var $tContainer = $(this).parent().parent().parent().find('.tab-contents>.tab-content:nth-child(' + (index + 1) + ')');

            //  Add Active Classes
            $(this).addClass('active');
            $tContainer.addClass('active');

            //  Check for Tab Content Animate
            if($tContainer.find('.tab-content-animate').length > 0) {

                //  Run Transition
                $tContainer.find('.tab-content-animate').animate({
                    scale: 0.8,
                    easing: 'ease',
                    duration: 0
                }, function() {

                    //  Run Transition Back
                    $(this).animate({
                        scale: 1.1,
                        easing: 'ease',
                        duration: 300
                    }, function() {

                        //  Back to Original
                        $(this).animate({
                            scale: 1,
                            easing: 'ease',
                            duration: 200
                        })
                    });
                });
            }
        }

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Init
    $(".custom-tabs, .tabbed-container").each(function() {

        //  Trigger Click
        $(this).find('.tabs-navigation li:first>a').click();
    });

    //  Listen for Goto Top
    $(".goto-top").click(function(e) {

        //  Scroll to Top
        $('body,html').animate({
            scrollTop: 0
        }, 800);

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Scroll To
    $("[data-scroll-to]").css('cursor', 'pointer').addClass('hoverline');
    $("[data-scroll-to]").click(function(e) {

        //  Target
        var $target = $($(this).data('scrollTo'));

        //  Offset
        var theOffset = $target.offset().top - 70;

        //  Check
        if($(this).data('addOffset'))   theOffset += parseInt($(this).data('addOffset'));
        if($(this).data('delOffset'))   theOffset -= parseInt($(this).data('delOffset'));

        //  Scroll
        $('body,html').animate({
            scrollTop: theOffset
        }, 500, function() {

            //  Trigger Viewable
            $target.trigger('visible-on-screen');
        });

        //  Check
        if( $(this).data('no-default') ) {

            //  Prevent Default
            e.preventDefault();
            return false;
        }
    });

    //  Listen for Hover
    $("#visual-section .active-block").mouseover(function() {

        //  Remove Class
        $(this).removeClass('active-block');
    });

    //  Listen for FAQ Question Interaction
    $(".faq-questions .faq-interaction .faq-question").click(function() {

        //  Hide Others
        $(this).parent().parent().find('.faq-answer').not($(this).next()).slideUp(500);
        $(this).parent().parent().find('.faq-interaction').removeClass('open');

        //  Show
        $(this).next().slideToggle(500, function() {

            //  Check
            if($(this).is(':visible')) {

                //  Add Class
                $(this).parent().addClass('open');
            } else {

                //  Remove Class
                $(this).parent().removeClass('open');
            }
        });
    });

    //  Listen for Filter Faq Items Events
    $("#filter-faq-items").on({

        //  On Keyup
        keypress: function(e) {

            //  Check
            if(e.which == 13) {

                //  Trigger Click
                $("#search-the-faqs").click();
            }
        },

        //  On Keyup
        keyup: function(e) {

            //  Check
            if(e.which != 13) {

                //  Trigger Click
                $("#search-the-faqs").click();
            }
        }
    });

    //  Listen for Search FAQs Button
    $("#search-the-faqs").click(function(e) {

        //  Serach Term
        var sTerm = String($.trim($("#filter-faq-items").val())).toLowerCase();

        //  Check
        if(sTerm.length == 0) {

            //  Show All
            $(".faq-questions .faq-interaction").stop(true, true).slideDown(200);
        } else {

            //  Hide All
            $(".faq-questions .faq-interaction").stop(true, true).slideUp(300);

            //  Filter and Show
            $(".faq-questions .faq-interaction").filter(function () {

                //  Contents
                var theTitle = String($(this).find('.faq-question').text()).toLowerCase();

                //  Return
                return (theTitle.lastIndexOf(sTerm) > -1);
            }).stop(true, true).slideDown(500);
        }

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Input Focus
    $("form input, form textarea").on({

        //  On Focus
        focus: function() {

            //  Check
            if($(this).parent().hasClass('form-group')) {

                //  Add Class
                $(this).parent().addClass('active');
            }
        },

        //  On Blur
        blur: function() {

            //  Check
            if($(this).parent().hasClass('form-group')) {

                //  Add Class
                $(this).parent().removeClass('active');
            }
        }
    });

    //  Listen for Map Overlay
    $(".map-overlays .overlay").on({

        //  Listen Mouseover
        mouseover: function() {

            //  Check
            if($(this).find('.hover-data').is(':hidden')) {

                //  Collapse Others
                $(this).closest('.map-overlays').find('.overlay').find('.hover-data').not($(this).find('.hover-data')).stop(true, true).slideUp(500);

                //  Slide Down
                $(this).find('.hover-data').stop(true, true).slideDown(500);
            }
        },

        //  Listen Mousemove
        mousemove: function() {

            //  Check
            if($(this).data('timeId')) {

                //  Clear
                clearTimeout($(this).data('timeId'));
                $(this).data('timeId', null);
            }
        },

        //  Listen Mouseout
        mouseout: function() {

            //  Elem
            var $theElem = $(this);

            //  Set Timeout
            $theElem.data('timeId', setTimeout(function() {

                //  Hide
                $theElem.find('.hover-data').stop(true, true).slideUp(500);
            }, 100));
        }
    });

    //  Listen for Popup Open
    $('.popup-opener[data-target]').click(function(e) {

        //  Open
        $('#' + $(this).data('target') + '.popup-info-block').fadeIn(500);

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Popup Close
    $(document).on('click', '.popup-info-block .popup-closer', function(e) {

        //  Close
        $(this).closest('.popup-info-block').fadeOut(500);

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Add More Fields
    $("#search-section").on('click', ".add-more-fields-btn", function(e) {

        //  Search Section
        var $searchSection = $('#search-section');

        //  Get the Clone
        var $clone = $searchSection.find('.hidden-template .fields-row:first').clone();

        //  Add Class
        $clone.addClass('cloned-row');

        //  Remove Add Control
        $clone.find('.add-more-fields-btn').remove();

        //  Remove Search Button from others
        $searchSection.find( '.search-extra-fields .fields-row .btnPlaceholder' ).attr( 'disabled', true ).hide(0);

        //  Remove the Hidden Class from Remove Control
        $clone.find('.remove-this-field-btn').removeClass('hidden');

        //  Append
        $searchSection.find('.search-extra-fields').append($clone);

        //  Slide Down
        $clone.slideDown(500, function() {

            //  Init Material
            initSearchMaterialAndErrors( $(this) );

            //  Scroll
            animateToLatestSearchRow();
        });

        //  Loop
        $clone.find('.select-fx-init').each( function() {
            new SelectFx(this);
        });

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Listen for Remove this Field More Fields
    $("#search-section").on('click', ".remove-this-field-btn", function(e) {

        //  Search Section
        var $searchSection = $('#search-section');

        //  Fade Out
        $(this).parent().parent().slideUp(500, function() {

            //  Remove
            $(this).remove();

            //  Remove Search Button from others
            $searchSection.find( '.search-extra-fields .fields-row:last-child .btnPlaceholder' ).attr( 'disabled', false ).show(0);

            //  Scroll
            animateToLatestSearchRow();
        });

        //  Prevent Default
        e.preventDefault();
        return false;
    });

    //  Check for Parcels Weight Focus
    $("#input-parcels-count").focus(function() {

        //  Check
        if( !$("#search-section .search-extra-fields").is(':visible') ) {

            //  Get the Clone
            var $clone = $('#search-section .hidden-template .fields-row:first').clone();

            //  Append
            $('#search-section .search-extra-fields').append($clone);

            //  Loop
            $clone.find('.select-fx-init').each( function() {
                new SelectFx(this);
            });

            //  Add Class
            $("#search-section").addClass( 'expanded-view' );

            //  Open Panel
            $("#search-section .search-extra-fields").slideDown(500, function() {

                //  Init Material
                initSearchMaterialAndErrors( $(this) );
            });
        }
    });

    //  Listen for Remove this Field More Fields
    $("#search-section").on('click', ".search-ocontrol.interactive", function(e) {

        //  Trigger the Click
        $(this).parent().find( '.unit-toggle-handle' ).trigger( 'click' );

        //  Prevent Default
        e.preventDefault();
        return false;
    } );

    //  Init Nice Scroll
    $( 'textarea.nice-scroll').niceScroll( {
        cursoropacitymin: .4,
        cursorwidth: "10px"
    } );

    //  Init Ripple Effect
    $('[data-ripple]').rippleIt();

    //  Init Material
    initSearchMaterialAndErrors( $( '.search-form .main-form' ) );

    //  Call Setup the Parallax
    setupTheParallax();

    //  Preload Images
    preloadImages($(document.body));

    //  Init SelectBox Filter Source
    $(".selectbox-filter-source:not(.dmui)").selectBoxFilter();

    //  Init Selectbox
    init_selectbox( $( '.search-form .main-form' ) );

    //  Check
    if( isIE() ) {

        //  Add Class
        $('html').addClass( 'ie ie-' + isIE() );
    }

    //  Listen for Events on Review Comments
    $('.extended-comments-view .review-comment').on( {

        //  Comments Open
        commentsOpen: function() {
            $(this).trigger('fixActiveCommentsText');
        },

        //  Comments Closed
        commentsClosed: function() {
            $(this).trigger('fixActiveCommentsText');
        },

        //  Fix the Active Text
        fixActiveCommentsText: function() {

            //  Get Item
            var $activeItem = $('.reviews-carousel').find(".owl-item.active .item");

            //  Fix Text
            $activeItem.find( '.toggle-review-comments').text( $('.extended-comments-view').is( ':visible' ) ? 'Read less' : 'read more' );
        }
    } );

    //  Listen Toggle Comments
    $('.toggle-review-comments').click( function(e) {

        //  Comments Holder
        var $comments = $('.extended-comments-view');

        //  Get the ID
        var theID = $(this).parent().data('id');

        //  Check
        if( theID != $comments.data( 'lastId' ) || !$comments.is( ':visible' ) ) {

            //  Target Comment
            var $targetComment = $comments.find(".review-comment[data-id='" + theID + "']");

            //  Show Comment
            $comments.find('.review-comment').not($targetComment).hide(0);
            $targetComment.show(0);
            $comments.stop(true, true).slideDown(500, function() {
                $targetComment.trigger("commentsOpen");
            });
        } else {

            //  Clear ID
            theID = null;

            //  Hide Comments
            $comments.stop(true, true).slideUp(500, function() {
                $comments.find('.review-comment').hide(0);
                $('.extended-comments-view .review-comment:first').trigger("commentsClosed");
            });
        }

        //  Store Last ID
        $comments.data( 'lastId', theID );

        //  Prevent Default
        e.preventDefault();
        return false;
    } );

    //  Listen for Carousel Change
    $('.reviews-carousel').on( 'changed.owl.carousel', function() {

        //  This
        var $this = $(this);

        //  Timeout
        setTimeout( function() {

            //  Comments Holder
            var $comments = $('.extended-comments-view');

            //  Check is Visible
            if( $comments.is( ':visible' ) ) {

                //  Get ID
                var theID = $this.find(".owl-item:not(.cloned)").filter(function() { return $(this).hasClass('active'); } ).find('.item').data('id');
                if( !theID || theID == 'undefined' )    theID = 1;

                //  Target Comment
                var $targetComment = $comments.find(".review-comment[data-id='" + theID + "']");

                //  Show Comment
                $comments.find('.review-comment').not($targetComment).hide(0);
                $targetComment.show(0).trigger("commentsOpen");
            }
        }, 100 );
    } );

    //  Listen Unit Toggle Click
    $(document).on( 'click', '[data-toggle-unit]', function(e) {

        //  Trigger
        $( "[data-toggle-group='" + $(this).data( 'toggleGroup' ) + "']" ).trigger( 'changeUnit', $(this).data( 'toggleUnit' ), $(this).text() );

        //  Prevent Default
        e.preventDefault();
        return false;
    } );

    //  Listen Unit Toggle Change
    $(document).on( 'changeUnit', '[data-toggle-unit]', function( e, unit, unit2 ) {

        //  Elem
        var $elem = $(this);

        //  Current Unit
        var cUnit = $elem.text();

        //  New Unit
        var nUnit = $elem.data( 'toggleUnit' );

        //  Fix
        if( cUnit == nUnit )
        {
            //  Set New Unit
            nUnit = unit;

            //  Set Current Unit
            cUnit = unit2;
        }

        //  Animate Out
        $elem.find( 'span' ).transition( {
            y: -25,
            opacity: 0.5
        }, 300, 'linear', function()
        {
            //  Change Unit
            $elem.find( 'span' ).text( nUnit );

            //  Store the Toggle Unit
            $elem.data( 'toggleUnit', cUnit );

            //  Animate In
            $elem.find( 'span' ).transition( { y: 25 }, 0 ).transition( {
                y: 0,
                opacity: 1
            }, 300, 'linear' );
        } );
    } );

    //  Listen Toggle Class Click
    $(document).on( {

        //  Click
        click: function(e) {

            //  Toggler
            var $toggler = $(this);

            //  Classes String
            var classesString = $toggler.data( 'toggleClass' );

            //  Classes
            var classes = ( typeof classesString == 'object' ? classesString : String( classesString ).split( ',' ) );

            //  Target
            var $target = ( $toggler.attr( 'href' ) && $toggler.attr( 'href' ) != '#' && $toggler.attr( 'href' ) != 'javascript:void(0);' ? $( $toggler.attr( 'href' ) ) : ( $toggler.data( 'targetChild' ) ? $toggler.find( $toggler.data( 'targetChild' ) ) : ( $toggler.data( 'targetParent' ) ? $toggler.closest( $toggler.data( 'targetParent' ) ) : $toggler ) ) );

            //  Check
            if( $toggler.data( 'targetParentSelector' ) )   $target = $target.find( $toggler.data( 'targetParentSelector' ) );

            //  Check
            if( classes.length > 0 ) {

                //  Class Index
                var classIndex = -1;

                //  Loop Each
                $.each( classes, function( i, theClass ) {

                    //  Check
                    if( $target.hasClass( theClass ) ) {

                        //  Set Index
                        classIndex = i;
                        return true;
                    }
                } );

                //  New Class Index
                var newClassIndex = classIndex + 1;

                //  Fix
                if( newClassIndex == -1 || newClassIndex >= classes.length )  newClassIndex = 0;

                //  New Class
                var newClass = ( ( classIndex != newClassIndex && newClassIndex > -1 ) ? classes[newClassIndex] : null );

                //  Remove Classes
                $.each( classes, function( i, theClass ) {

                    //  Check
                    if( theClass != newClass ) {

                        //  Remove Class
                        $target.removeClass( theClass );

                        //  Trigger Event
                        $target.trigger( 'class_toggle.removed', newClass, $toggler );
                        $target.trigger( 'class_toggle.removed.' + newClass, $toggler );
                    }
                } );

                //  Classes to Clear
                var classesToClearString = $toggler.data( 'toggleClassClear' );

                //  Classes
                var classesToClear = ( typeof classesToClearString == 'object' ? classesToClearString : String( classesToClearString ).split( ',' ) );

                //  Loop
                $.each( classesToClear, function( i, theClass ) {

                    //  Remove Class
                    $target.removeClass( theClass );
                } );

                //  Add Class
                if( newClass ) {

                    //  Add Class
                    $target.addClass( newClass );

                    //  Trigger Event
                    $target.trigger( 'class_toggle.added', newClass, $toggler );
                    $target.trigger( 'class_toggle.added.' + newClass, $toggler );
                }

                //  Trigger Event
                $target.trigger( 'class_toggle.changed', [ newClass, ( classIndex > -1 ? classes[classIndex] : null ), $toggler ] );
                $target.trigger( 'class_toggle.changed.' + newClass, [ ( classIndex > -1 ? classes[classIndex] : null ), $toggler ] );

                //  Check
                if( $target.data( 'toggleTexts' ) ) {

                    //  Get Mappings
                    var textMappings = $target.data( 'toggleTexts' );

                    //  Check
                    if( newClass && textMappings.hasOwnProperty( newClass ) ) {

                        //  Set Class
                        $target.find( '>span' ).text( textMappings[newClass] );
                    } else {

                        //  Set the Default
                        if( textMappings.hasOwnProperty( '' ) ) {

                            //  Set Class
                            $target.find( '>span' ).text( textMappings[''] );
                        }
                    }
                }

                //  Check
                if( $target.data( 'sublistenChild' ) || $target.data( 'sublisten' ) ) {

                    //  Sub Listen Target
                    var $subListenTarget = ( $target.data( 'sublistenChild' ) ? $target.find( $target.data( 'sublistenChild' ) ) : $( $target.data( 'sublisten' ) ) );

                    //  Check
                    if( $subListenTarget.length > 0 ) {

                        //  Get Mappings
                        var subMappings = $subListenTarget.data( 'sublistenMapping' );

                        //  Check
                        if( subMappings ) {

                            //  Loop Each
                            $.each( subMappings, function( i, theClass ) {

                                //  Remove
                                $subListenTarget.removeClass( theClass );
                            } );

                            //  Check
                            if( newClass && subMappings.hasOwnProperty( newClass ) ) {

                                //  Set Class
                                $subListenTarget.addClass( subMappings[newClass] );
                            } else {

                                //  Set the Default
                                if( subMappings.hasOwnProperty( '' ) ) {

                                    //  Set Class
                                    $subListenTarget.addClass( subMappings[''] );
                                }
                            }
                        }
                    }
                }
            }

            //  Prevent Default
            e.preventDefault();
            return false;
        }

    }, '[data-toggle-class]' );

    //  Init Tooltip
    $("[data-toggle=tooltip][data-title]").tooltip();

    //  On SelectBox Focus
    $(document).on( {

        //  elementRemoving
        elementRemoving: function() {

            //  Trigger Destroy Nice Scroll
            $(this).trigger( 'destroySelectBoxNiceScroll' );
        },

        //  elementRefreshed
        elementRefreshed: function() {

            //  Trigger Destroy Nice Scroll
            $(this).trigger( 'destroySelectBoxNiceScroll' );

            //  Trigger Init Nice Scroll
            $(this).trigger( 'initSelectBoxNiceScroll' );
        },

        //  Focus on Select Box
        'focus.selectBox': function() {

            //  Trigger Init Nice Scroll
            $(this).trigger( 'initSelectBoxNiceScroll' );
        },

        //  Blur on Select Box
        'blur.selectBox': function() {

            //  Trigger Destroy Nice Scroll
            $(this).trigger( 'destroySelectBoxNiceScroll' );
        },

        //  Init NiceScroll
        initSelectBoxNiceScroll: function() {

            //  Timeout
            setTimeout( function() {

                //  Visible Dropdown
                var $vDropdown = $( "ul.selectBox-dropdown-menu").filter( function() { return $(this).is( ':visible' ); }).eq(0);

                //  Check
                if( $vDropdown.is( ':visible' ) && $.fn.niceScroll && !$vDropdown.data( '__nicescroll' ) ) {

                    //  Init NiceScroll
                    $vDropdown.niceScroll( {
                        cursorcolor: "#666",
                        cursorwidth: "10px"
                    } );
                }
            }, 100 );
        },

        //  Destroy NiceScroll
        destroySelectBoxNiceScroll: function() {

            //  Visible Dropdown
            var $vDropdown = $( "ul.selectBox-dropdown-menu").filter( function() { return $(this).is( ':visible' ); }).eq(0);

            //  Timeout
            setTimeout( function() {

                //  Check
                if( $.fn.niceScroll && $vDropdown.data( '__nicescroll' ) ) {

                    //  Remove
                    $vDropdown.data( '__nicescroll' ).remove();
                }
            }, 100 );
        }
    }, 'input, select, a.selectBox' );

    //  Fix for Numeric Field
    $(document).on( 'keyup', 'input[type=number]', function() {

        //  Update Value
        this.value = this.value.replace( /[^0-9]+/, "" );
    } );

    //  Init Material UI
    initDefaultMaterialUI();
});

//  Init Default Material UI
function initDefaultMaterialUI( $container ) {

    //  Init Material UI
    jQuery( '[data-ripple]:not(.dmui)', $container ).addClass( 'dmui' ).rippleIt();
    jQuery( '.element-input:not(.dmui)', $container ).addClass( 'dmui' ).materialStyle( {
        auto_next: true
    } );
    jQuery( '.element-input.do-validate:not(.dmui)', $container ).addClass( 'dmui' ).pValidate();
}

function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

//  Init Material with Errors
function initSearchMaterialAndErrors( $container ) {

    //  Elements
    var $elements = $( '.inline-label input, .inline-label textarea, .inline-label select', $container );

    //  Remove Class
    $elements.removeClass( 'dmui' );

    //  Init Material UI
    $elements.materialStyle( {
        holder_class: '.inline-label'
    } );

    //  Init Validation
    $elements.filter( function() { return $(this).hasClass( 'do-validate' ); } ).pValidate( {
        holder_class: '.inline-label'
    } );

    //  Init Selectbox
    init_selectbox( $container );
}

//  Init Selectbox
function init_selectbox( $container ) {

    //  Loop Each
    $( "[data-selectbox=true]:not(.dmui)", $container ).not( 'selectbox-loaded' ).each(function() {

        //  Add Class
        $(this).addClass( 'nice-select selectbox-loaded' );

        //  Init
        $(this).selectBox({
            mobile: true,
            menuSpeed: 200,
            menuTransition: 'slide',
            keepInViewport: false
        });
    });
}

//  Animate to Latest Row
function animateToLatestSearchRow() {

    //  Check
    if( window.innerWidth < 768 ) {

        //  Search Section
        var $searchSection = jQuery('#search-section');

        //  Recent Row
        var $recentRow = $searchSection.find('.search-extra-fields .fields-row:last');

        //  Animate Window Scroll
        jQuery("body,html").animate({
            scrollTop: $searchSection[0].offsetTop + $searchSection[0].offsetHeight - $recentRow[0].offsetHeight - 120
        }, 500);
    }
}

//  Preload Images from Container
function preloadImages($container) {

    //  Loop Each
    $container.find('img').each(function() {

        //  Try/Catch
        try {

            //  Image Path
            var imgPath = $(this).attr('src');

            //  Create new Image Object
            var img = new Image();

            //  Listen Onload
            img.onload = function() {
                //console.log('loaded image: ' + imgPath);
            };

            //  Set the Source
            img.src = imgPath;
        } catch(e) {}
    });
}

//  Fix the Overlays
function fixTheOverlays() {

    //  Check for Overlays
    jQuery(".map-overlays>.overlay").each(function() {

        //  Get the Points
        var ox = jQuery(this).data('ox');
        var oy = jQuery(this).data('oy');

        //  Add Bounce Effect to Library
        jQuery.cssEase['bounce'] = 'cubic-bezier(.17,1.42,.43,.83)';

        //  Check
        if(jQuery('html').hasClass('device-md') && jQuery(this).data('md-ox'))  ox = jQuery(this).data('md-ox');
        if(jQuery('html').hasClass('device-md') && jQuery(this).data('md-oy'))  ox = jQuery(this).data('md-oy');
        if(jQuery('html').hasClass('device-sm') && jQuery(this).data('sm-ox'))  ox = jQuery(this).data('sm-ox');
        if(jQuery('html').hasClass('device-sm') && jQuery(this).data('sm-oy'))  ox = jQuery(this).data('sm-oy');
        if(jQuery('html').hasClass('device-xs') && jQuery(this).data('xs-ox'))  ox = jQuery(this).data('xs-ox');
        if(jQuery('html').hasClass('device-xs') && jQuery(this).data('xs-oy'))  ox = jQuery(this).data('xs-oy');

        //  Check
        if(ox && oy) {

            //  Move the Overlays to Points
            jQuery(this).css({
                left: ox
            });

            //  Display
            jQuery(this).delay(1000 + (jQuery(this).index() * 300)).stop(true, true).transition({
                y: -100,
                duration:0
            }).transition({
                y: oy,
                opacity: 1
            }, 500, 'bounce');
        }
    });
}

//  Fix the Search Container
function fixSearchContainer() {

    //  Check
    if(jQuery(window).width() < 1000 && jQuery('#search-section .search-extra-fields .fields-row').length > 2) {

        //  Add Class
        jQuery("#search-section").addClass('big-container');
    }
    else if(jQuery(window).width() < 1200 && jQuery('#search-section .search-extra-fields .fields-row').length > 3) {

        //  Add Class
        jQuery("#search-section").addClass('big-container');
    }
    else if($(window).width() > 1200 && jQuery('#search-section .search-extra-fields .fields-row').length > 6) {

        //  Add Class
        jQuery("#search-section").addClass('big-container');
    } else {

        //  Remove Class
        jQuery("#search-section").removeClass('big-container');
    }
}

//  Setup the Parallax
function setupTheParallax() {

    //  Loop Each
    jQuery('[data-animate]:not(.animate-done)').each(function() {

        //  Hide
        $(this).css('opacity', '0');
    });

    //  Fix the Container with Video BG
    jQuery(".with-video-bg.lazy-load-video").each(function() {

        //  Set Timeout
        setTimeout($.proxy(function() {

            //  Create the HTML
            var videoHTML = '<video loop>';
            if(jQuery(this).data('videoMp4'))   videoHTML += '<source src="' + jQuery(this).data('videoMp4') + '" type="video/mp4" />';
            if(jQuery(this).data('videoWebm'))   videoHTML += '<source src="' + jQuery(this).data('videoWebm') + '" type="video/webm" />';
            if(jQuery(this).data('videoOgg'))   videoHTML += '<source src="' + jQuery(this).data('videoOgg') + '" type="video/ogg" />';
            videoHTML += 'Your browser does not support the video tag.';
            videoHTML += '</video>';
            videoHTML += '<div class="mask"></div>';

            //  Append
            $(this).prepend(videoHTML)

            //  Show the Mask & Video
            jQuery(this).find('.mask').show(0);
            jQuery(this).find('video').show(0);

            //  Play the Video
            jQuery(this).find('video')[0].play();

            //  Add Video :paded Class
            jQuery(this).parent().addClass('video-loaded');
        }, this), 3000);
    });

    //	Listen Window Scroll
    jQuery(window).scroll(function() {

        //	Scroll Top
        var scrollTopPos = jQuery(window).scrollTop();

        //  Window Height
        var winHeight = jQuery(window).height();

        //  Check
        if(scrollTopPos > 150) {

            //  Show Goto Top
            jQuery(".goto-top").fadeIn(500);

            //  Set Position
            jQuery("section#floating-service-buttons").addClass('scrolling');
        } else {

            //  Hide Goto Top
            jQuery(".goto-top").fadeOut(500);

            //  Set Position
            jQuery("section#floating-service-buttons").removeClass('scrolling');
        }

        //  Loop Each
        jQuery('[data-animate]:not(.animate-done)').each(function() {

            //  Elem
            var $tElem = $(this);

            //  Existing Width, Height & Offset
            var eWidth = $tElem.width();
            var eHeight = $tElem.height();
            var eOffset = $tElem.data('offset');

            //  Fix Offset
            if(!eOffset || eOffset == 'undefined')  eOffset = $tElem.height() / 8;

            //  Hide
            $(this).css('opacity', '0');

            //  Check
            if(eHeight > 0 && ($tElem.offset().top + eOffset) <= (scrollTopPos + winHeight) ) {

                //  Animate Type
                var animateType = String($tElem.data('animate')).toLowerCase();

                //  Animate Delay
                var animateDelay = $tElem.data('animateDelay');
                if(!animateDelay || animateDelay == 'undefined')  animateDelay = 0;

                //  Animate Duration
                var animateDuration = $tElem.data('animateDuration');
                if(!animateDuration || animateDuration == 'undefined')  animateDuration = 500;

                //  Animate Effect
                var animateEffect = $tElem.data('animateEffect');
                if(!animateEffect || animateEffect == 'undefined')  animateEffect = 'linear';

                //  Switch
                switch(animateType) {

                    //  From Top
                    case 'from-top':

                        //  Hide First
                        $tElem.transition({
                            y: -100,
                            duration: 0
                        });

                        //  Animate
                        $tElem.delay(animateDelay).transition({
                            y: 0,
                            opacity: 1,
                            easing: animateEffect,
                            duration: animateDuration
                        });

                        break;

                    //  From Bottom
                    case 'from-bottom':

                        //  Hide First
                        $tElem.transition({
                            y: 100,
                            duration: 0
                        });

                        //  Animate
                        $tElem.delay(animateDelay).transition({
                            y: 0,
                            opacity: 1,
                            easing: animateEffect,
                            duration: animateDuration
                        });

                        break;

                    //  From Left
                    case 'from-left':

                        //  Hide First
                        $tElem.transition({
                            x: -100,
                            duration: 0
                        });

                        //  Animate
                        $tElem.delay(animateDelay).transition({
                            x: 0,
                            opacity: 1,
                            easing: animateEffect,
                            duration: animateDuration
                        });

                        break;

                    //  From Right
                    case 'from-right':

                        //  Hide First
                        $tElem.transition({
                            x: 100,
                            duration: 0
                        });

                        //  Animate
                        $tElem.delay(animateDelay).transition({
                            x: 0,
                            opacity: 1,
                            easing: animateEffect,
                            duration: animateDuration
                        });

                        break;

                    //  Fade
                    case 'fade':

                        //  Animate
                        $tElem.delay(animateDelay).transition({
                            opacity: 1,
                            easing: animateEffect,
                            duration: animateDuration
                        });

                        break;
                }

                //  Add Class
                $tElem.addClass('animate-done');
            }
        });
    }).scroll();
}
