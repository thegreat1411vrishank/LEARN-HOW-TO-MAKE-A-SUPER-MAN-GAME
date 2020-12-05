"use strict"

$(document).ready(function() {

	$('body').css('height', $(window).height());

	const _this = this;
	this.data = {};
	this.data.cloudLaunched = 0;
	let new_wall;
	let new_star;

	this.data.checkwall = {};
	this.data.scoreWall = 0;
	this.data.checkstar = {};
	this.data.scoreStar = 0;

	this.data.stopGame = 0;

	for (let w = 0; w < 10; w++) {
		this.data.checkwall[w] = 0;
		new_wall = 
			'<div class="wall wall'+w+'" data-id="'+w+'">' +
				new_wall_block +
			'</div>'
		;

		$('.walls').append(new_wall);
		$('.wall'+w).css('top', random(100, 600)+'px');
	}

	for (let s = 0; s < 20; s++) {
		this.data.checkstar[s] = 0;
		new_star = 
			`<div class="star star`+s+`" data-id="`+s+`">
				<img src="img/star.png" width="100" />
			</div>`
		;

		$('.stars').append(new_star);
		$('.star'+s).css('top', random(100, 600)+'px');
	}

	window.requestAnimationFrame = 
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.msRequestAnimationFrame
	;

	const start = null;
	$('.wall0').show();
	$('.star0').show();

	function random(min, max) { 
		return (Math.floor((max-min)*Math.random())+min); 
	} 

	this.endGame = () => {

		_this.data.stopGame = 1;
		let score_total = (_this.data.scoreWall * 2) + (_this.data.scoreStar * 5);
		$('.end_game').fadeIn();

		$('.end_game .final_wall').hide().text(_this.data.scoreWall+' * 2').delay(500).fadeIn();
		$('.end_game .final_star').hide().text(_this.data.scoreStar+' * 5').delay(1000).fadeIn();
		$('.end_game .final_all').hide().text(score_total).delay(1500).fadeIn();

		$("svg").stop().delay(3000).animate({
		    left: '2500',
		  }, 3000);
	};

	this.animateCloud = (cloud) => {

		if(cloud === 2) {

			$(".cloud2").animate({
			    right: "2100",
			}, 4000, function() {
			  	_this.replaceCloud(2);
			});

		} else if(cloud === 1) {

			$( ".cloud1" ).animate({
				right: "2100",
			}, 6000, function() {
			  	_this.replaceCloud(1);
			});
		}
	};

	this.replaceCloud = (cloud) => {

		if(cloud === 2) {

			$( ".cloud2" ).animate({
			    right: "-500",
			}, 0, function() {
			  	_this.animateCloud(2);
			});

		} else if(cloud === 1) {

			$( ".cloud1" ).animate({
			    right: "-500",
			}, 0, function() {
			  	_this.animateCloud(1);
			});
		}				
	};

	this.makeWall = (number_wall) => {

		$(".wall"+number_wall).animate({
		    right: "2100",
		  }, 3000, function() {

		  	if(_this.data.checkwall[number_wall] === 0) {

		  		if(number_wall != 9) {
		  			$('.wall'+number_wall).hide();
					$('.wall'+(number_wall+1)).show();
					_this.makeWall(number_wall+1);
		  		} else {
		  			_this.endGame();
		  		}

		  	} else {
		  		if(number_wall === 9) {
		  			_this.endGame();
		  		}
		  	}
		});
	};

	this.breakWall = (what_wall) => {

		$('.wall'+what_wall+' .part_wall').each(function() {
			$(this).find('.tridiv1').animate({
				left: "+=400"
			}, 400);
			$(this).find('.tridiv2').animate({
				left: "+=400",
				top: "+=200"
			}, 300);
			$(this).find('.tridiv3').animate({
				left: "+=350",
				top: "+=100"
			}, 350);
		});

		setTimeout(function() {

			$('.boum').hide();
			let koko = 0;

			$('.wall'+what_wall+' .part_wall').each(function() {

				$(this).find('.tridiv1').animate({
					left: "-=125"+koko,
					top: "+=666"
				}, 800);
				$(this).find('.tridiv2').animate({
					left: "-=100"+koko,
					top: "+=405"
				}, 300);
				$(this).find('.tridiv3').animate({
					left: "-=78"+koko,
					top: "+=500"
				}, 350);

				koko = koko +75;
			});

			$('.wall'+what_wall).stop().animate({
				top: "+=500",
			}, 400, function() {
				$('.wall'+what_wall).hide();
				if(what_wall === 9) {
					_this.endGame();
				}
			});

		}, 250);

		setTimeout(function() {
			$('.wall'+(what_wall+1)).show();
			_this.makeWall(what_wall+1);
		}, 1000);
	};

	this.makeStar = (number_star) => {

		$(".star"+number_star).animate({
		    right: "2100",
		  }, 1000, function() {
		  	if(_this.data.checkstar[number_star] === 0) {
		  		$('.star'+number_star).hide();
				$('.star'+(number_star+1)).show();
				_this.makeStar(number_star+1);
		  	}
		});
	};

	this.winStar = (star_number) => {

		_this.data.checkstar[star_number] = 1;
		_this.data.scoreStar++;
		$('.scoreStar span').text(_this.data.scoreStar);

		$('.star'+star_number).animate({
		    top: "30",
		    left: "465"
		  }, 300, function() {
		  	$('.star'+star_number+ ' img').animate({
		  		width : '60px',
		  		height : '57px'
		  	}, 200, function() {
		  		$('.star'+star_number).fadeOut();
		  		$('.star'+(star_number+1)).show();
				_this.makeStar(star_number+1);
		  	});
		});
	};

	this.moveTop = () => {
		$("svg").stop().animate({
		    top: '-=100',
		  }, 300, function() {
		});
	};

	this.moveBottom = () => {
		$("svg").stop().animate({
		    top: '+=100',
		  }, 300, function() {
		});
	};

	this.moveLeft = () => {
		$("svg").stop().animate({
		    left: '-=4',
		  }, 5, function() {
		});
	};

	this.moveRight = () => {
		$("svg").stop().animate({
		    left: '+=4',
		  }, 5, function() {
		});
	};

	_this.checkCollisions = () => {

		if
		(
			$('.wall:visible').length !== 0 &&
			$('.wall:visible').offset().left < ($('.bonhomme').offset().left + 220) && 
			$('.wall:visible').offset().left > ($('.bonhomme').offset().left) && 
			$('.wall:visible').offset().top < ($('.bonhomme').offset().top) && 
			($('.wall:visible').offset().top + $('.wall:visible').height()) > ($('.bonhomme').offset().top)
		) {
			let this_wall = parseInt($('.wall:visible').attr('data-id'));
			if(_this.data.checkwall[this_wall] === 0) {
				_this.data.checkwall[this_wall] = 1;
				_this.data.scoreWall++;
				$('.scoreWall span').text(_this.data.scoreWall);

				$('.boum').css('left', $('.bonhomme').offset().left + 220+'px');
				$('.boum').css('top', $('.bonhomme').offset().top-50+'px');
				$('.boum').show();

				_this.breakWall(this_wall);
			}	
		}

		if
		(
			$('.star:visible').length !== 0 &&
			$('.star:visible').offset().left < ($('.bonhomme').offset().left + 220) && 
			$('.star:visible').offset().left > ($('.bonhomme').offset().left) && 
			$('.star:visible').offset().top < ($('.bonhomme').offset().top) && 
			($('.star:visible').offset().top + $('.star:visible').height()) > ($('.bonhomme').offset().top)
		) {
			let this_star = parseInt($('.star:visible').attr('data-id'));
			if(_this.data.checkstar[this_star] === 0) {

				_this.winStar(this_star);
			}
		}
	};

	this.render = () => {

		if(_this.data.stopGame === 0) {
			_this.checkCollisions();
			requestAnimationFrame(_this.render);
		}
	};

	const whatToDo = (e) => {

		if(_this.data.stopGame === 0) {

		    if(e.which === 40) {
				_this.moveBottom(function() {
					_this.moveBottom();
				});

			} else if(e.which === 38) {
				_this.moveTop(function() {
					_this.moveTop();
				});
				
			} else if(e.which === 39) {
				_this.moveRight(function() {
					_this.moveRight();
				});

			} else if(e.which === 37) {
				_this.moveLeft(function() {
					_this.moveLeft();
				});

			}
		}
	}


	$(document).on({

	  keydown: function(e) {
	  	whatToDo(e);
	  }, keypress: function(e) {
	  	whatToDo(e);
	  }

	});

	$('.walls, .stars, svg, .score').hide();

	$('.launch_game').on('click', function() {

		if(_this.data.cloudLaunched === 0) {
			$('.before_play').hide();
			$('.walls, .stars, svg, .score').show();
			_this.data.cloudLaunched = 1;
			_this.animateCloud(1);
			_this.animateCloud(2);
			_this.makeWall(0);
			_this.makeStar(0);
		}

		_this.render();
	});

	$('.play_again').on('click', function() {
		location.reload();
	});

});