/***************************
****************************

원자력 병원 권역별 호스피스센터
공통 스크립트

****************************
****************************/

var $Gb = {};

(function($){

	'use strict';

	$(function(){
		$Gb.activeFunc().initFunc();
	});

	function $commonFunc(){
		// Web
		$Gb.Browser = navigator.userAgent,
		$Gb.screenW = screen.width,
		$Gb.screenH = screen.height,
		$Gb.innerW = window.innerWidth,
		$Gb.innerH = window.innerHeight,
		$Gb.Body = $('body'),
		$Gb.gnbWrap = $('header .gnb-web'),
		$Gb.menu = $Gb.gnbWrap.find('.menu'),
		$Gb.gnbBg = $('header').find('.gnb-bg'),
		$Gb.mainSection = $('.main-section'),
		$Gb.depth2 = $Gb.gnbWrap.find('.depth2'),
		$Gb.Dropdown = $('.dropDown'),
		$Gb.mainCarousel = $('.mainCarousel'),
		$Gb.ftCarousel = $('.ftCarousel'),
		$Gb.aniBar = $('<div id="ani--bar"></div>'),
		$Gb.dimmed = $('<div id="dimmed"></div>'),
		$Gb.dimmed30 = $('<div id="dimmed30"></div>'),
		$Gb.location = location.href.split('/'),
		$Gb.tabMenu = $('.tab-menu'),

		// Mobile
		$Gb.gnbWrap_m = $('header .gnb-mob'),
		$Gb.menu_m = $Gb.gnbWrap_m.find('.menu'),
		$Gb.dimmedAllmenu = $('<div id="dimmed_Allmenu"></div>');

		var gnbHover = function(){// pc Gnb
			$Gb.menu.append($Gb.aniBar); // 애니메이션 바 생성

			$Gb.menu.find('> li').on({
				'mouseenter' : function(){
					var trgItem = $(this),
						Item_wid = $Gb.menu.find('> li').width(),
						idx = trgItem.index();

					trgItem.addClass('on');
					$Gb.menu.find('> li').not(trgItem).removeClass('on');

					$('#ani--bar')
					.stop(false, true).animate({
						left : Item_wid*idx
					},200, 'easeOutSine', function(){
						$(this).stop(false, true).animate({
							height : '11px'
						},200);
					});

					$Gb.Body.append($Gb.dimmed30);
					$('#dimmed30').stop().fadeIn(400);

					$Gb.gnbBg.stop().slideDown(400);
					$Gb.depth2.stop().slideDown(400);
				}
			});

			$Gb.menu.on({
				'mouseleave' : function(){
					$Gb.menu.find('> li').removeClass('on');

					$Gb.depth2.stop().slideUp(300);
					$Gb.gnbBg.stop().slideUp(300);
					
					$('#dimmed30').stop().fadeOut(300, function(){
						$(this).remove();
						$('#ani--bar').stop().animate({
							height : 0
						},200, 'easeOutSine');
					});
				}
			});

			$Gb.menu.find('> li > a').on({
				'focusin' : function(){
					var trgItem_ = $(this).closest('li'),
						Item_wid_ = $Gb.menu.find('> li').width(),
						idx_ = trgItem_.index();

					$Gb.menu.find('> li').removeClass('on');
					$(this).closest('li').addClass('on');

					$('#ani--bar')
					.stop(false, true).animate({
						left : Item_wid_*idx_
					},200, 'easeOutSine', function(){
						$(this).stop(false, true).animate({
							height : '11px'
						},200);
					});

					$Gb.Body.append($Gb.dimmed30);
					$('#dimmed30').stop().fadeIn(400);

					$Gb.gnbBg.stop().slideDown(400);
					$Gb.depth2.stop().slideDown(400);
				}
			});

			$Gb.menu.find('> li').last().find('.depth2 li:last-child').on('focusout', function(){
				$Gb.menu.find('> li').removeClass('on');

				$Gb.depth2.stop().slideUp(300);
				$Gb.gnbBg.stop().slideUp(300);

				$('#dimmed30').stop().fadeOut(300, function(){
					$(this).remove();
					$('#ani--bar').stop().animate({
						height : 0
					},200, 'easeOutSine');
				});
			});


		},

		allMenu = function(){// mobile 전체 메뉴
			$('.m-menu').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				if(!$(this).hasClass('open')){
					$(this).addClass('open');
					$Gb.gnbWrap_m.stop().animate({
						'right': 0
					},{
						duration:300,
						complete:function(){
							$Gb.dimmedAllmenu
							.insertAfter($Gb.gnbWrap_m)
							.stop().fadeIn(400);
							$Gb.Body.css({
								'height' : $Gb.dimmedAllmenu.height(),
								'overflow' : 'hidden'
							});
						}
					});
				}else {
					$(this).removeClass('open');
					$Gb.gnbWrap_m.stop().animate({
						'right': '-225px'
					},300);
					$Gb.Body.css({
						'height' : 'auto',
						'overflow' : 'visible'
					});
					$Gb.dimmedAllmenu.stop().fadeOut(300, function(){
						$(this).remove();
					});
				}
			});

			$(document).on('click', '#dimmed_Allmenu', function(e){
				e.preventDefault();
				e.stopPropagation();

				$('#dimmed_Allmenu').stop().fadeOut(300, function(){
					$(this).remove();
				});
				$('.m-menu').removeClass('open');
				$Gb.gnbWrap_m.stop().animate({
					'right': '-225px'
				},300);
				$Gb.Body.css({
					'height' : 'auto',
					'overflow' : 'visible'
				});
			});

			$Gb.menu_m.find('.depth2 a').each(function(){
				var _trg = $(this),
					_href = _trg.attr('href').split('/');

				if(_href[_href.length - 1] == $Gb.location[$Gb.location.length - 1]){
					_trg
					.addClass('on')
					.closest('.depth2').css('display','block')
					.parent('li').addClass('on');
				}
			});

			$Gb.menu_m.find('> li > a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var _trg = $(this),
						currentMenu = _trg.closest('li');

				if(!currentMenu.hasClass('on')){
					currentMenu.addClass('on');
					$Gb.menu_m.find('> li').not(currentMenu).removeClass('on');
					currentMenu.find('.depth2').stop().slideDown(300);
					$Gb.menu_m.find('> li').not(currentMenu).find('.depth2').stop().slideUp(300);
				}else {
					currentMenu.removeClass('on');
					currentMenu.find('.depth2').stop().slideUp(300);
				}
			});
		},

		OpenPop = function(){
			function $OpenPop(Id){
				$Gb.currentPop = $('.lpop#lpop_' + Id);

				if(getCookie(Id) != 'Y'){
					$Gb.currentPop.css('display','block');
					$Gb.Body.append($Gb.dimmed);
				}
				
				$(document).on('click','.lpop_close, #dimmed', function(e){
					e.preventDefault();
					e.stopPropagation();
					
					if($('.lpopCheck').prop('checked')){
						setCookie(Id,'Y',1);
					}

					$Gb.currentPop.css('display','none');
					$('#dimmed').remove();
				});
			}

			return $OpenPop;
		}(),

		MainSlider = function(){ //메인 슬라이드
			if($Gb.mainCarousel.length){
				var activeMainSlide = function(){
					$('.mainCarousel').imagesLoaded(function(){
						console.log('메인 이미지 로드 완료');

						$Gb.mainCarousel.slick({
						  dots: true,
						  dotsClass:'dots-item',
						  infinite: true,
						  speed: 400,
						  slidesToShow: 1,
						  slidesToScroll: 1,
						  autoplay:true,
						  adaptiveHeight:true,
						  centerMode:true,
						  centerPadding: '1200px',
						  responsive: [
								{
						      breakpoint: 1200, // 가로 1200px 이하
						      settings: {
						    		arrows:false,
						    		centerPadding: 0,
						      }
						    },
						  ]
						});
					});
				}();
			}
		},

		FooterSlider = function(){
			if($Gb.ftCarousel.length){
				$Gb.ftCarousel.slick({
				  dots: false,
				  infinite: true,
				  speed: 500,
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  autoplay:true,
				  adaptiveHeight:true,
				  centerMode:true,
				  centerPadding:0,
				  responsive: [
						{
				      breakpoint: 1280, // 가로 1200px 이하
				      settings: {
				      }
				    },
				  ]
				});
			}
		},

		dropDown = function(){
			$Gb.Dropdown.find('> span a').on('click',function(e){
				e.preventDefault();
				e.stopPropagation();

				$Gb.Dropdown.find('> span a').not($(e.target)).removeClass('on');

				$Gb.Dropdown.find('ul')
				.not($(e.target).closest('span').next('ul'))
				.stop(false,true)
				.slideUp(300);

				if($(e.target).hasClass('on')){
					$(e.target)
					.closest('span')
					.next('ul')
					.stop(false,true)
					.slideUp(200, function(){
						$(e.target).removeClass('on');
					});
				}else {
					$(e.target)
					.closest('span')
					.next('ul')
					.stop(false,true)
					.slideDown(200, function(){
						$(e.target).addClass('on');
					});
				}
			});

			$Gb.Dropdown.each(function(){
				var _trg = $(this);

				_trg.find('li').last().find('> a').on('focusout', function(){
					_trg.find('ul').slideUp(200, function(){
						_trg.find('> span a').removeClass('on');
					});
				});

				_trg.on('mouseleave', function(){
					_trg.find('ul').slideUp(200, function(){
						_trg.find('> span a').removeClass('on');
					});
				});
			});
		},

		tabMenu = function(){
			$Gb.tabMenu.find('li a').on('click', function(e){
				e.preventDefault();
				e.stopPropagation();

				var currentItem = $(this),
				currentId = currentItem.attr('href'),
				currentIdx = $Gb.tabMenu.find('a').index(currentItem);

				currentItem.addClass('on');
				$Gb.tabMenu.find('li a').not(currentItem).removeClass('on');
				$('.tab-contents > li').css('display','none');
				$('.tab-contents > li').filter(currentId).css('display','block');

				$('#agencyList').prop('selectedIndex',currentIdx);
			});

			$('#agencyList').on('change', function(){
				var _currentId = $(this).val(),
				_currentIdx = $(this).find('option:selected').index();

				$('.tab-contents > li').css('display','none');
				$('.tab-contents > li').filter('#' + _currentId).css('display','block');
				$Gb.tabMenu.find('li a').removeClass('on');
				$Gb.tabMenu.find('li a').eq(_currentIdx).addClass('on');
			});	
		},

		initFunc = function(){
			gnbHover();
			allMenu();
			dropDown();
			MainSlider();
			FooterSlider();
			tabMenu();
		}

		return {
			initFunc : initFunc,
			OpenPop : OpenPop
		}
	}

	$Gb.activeFunc = function() {
		var $activeFunc = new $commonFunc();

		return $activeFunc;
	}

	$(window).on({
		'scroll' : function(){
			if($(this).scrollTop() >= 142){
				$('header').addClass('fixed');
			}else {
				$('header').removeClass('fixed');
			}
		}
	});

})(jQuery);

// 쿠키설정
function setCookie(cName, cValue, cDay){
	var expire = new Date();

	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
    	document.cookie = cookies;
}
 
function getCookie(cName) {
    cName = cName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cName);
    var cValue = '';
    if(start != -1){
        start += cName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cValue = cookieData.substring(start, end);
    }
    return unescape(cValue);
}