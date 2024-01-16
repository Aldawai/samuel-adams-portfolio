const $ = (s) => {
	return document.querySelector(s);
} 

const $$ = (s) => {
	return document.querySelectorAll(s);
}

const items = $$('.item');
const body = $('.body');
const nav = $('header nav');
const itemsBody = $('.main-part > .items-body');
const scrollbar = $('.main-part > .scrollbar');
const scrollbarBut = $('.main-part > .scrollbar-buttons');
const pageUpBut = scrollbarBut.querySelector('.page-up');
const pageDownBut = scrollbarBut.querySelector('.page-down');
const footer = $('.main-footer');
const buttons = $$('.main-footer > .button');
const details = $('.main-footer .details');

let emptyBg = true;

pageDownBut.addEventListener('click', (e) => {
	if(scrollbarButDown.classList.contains('active')) {
		scrollPageDown();
		scrollbarButUp.classList.add('active')
		scrollbarButDown.classList.remove('active')
	}
})

pageUpBut.addEventListener('click', (e) => {
	if(scrollbarButUp.classList.contains('active')) {
		scrollPageUp();
		scrollbarButDown.classList.add('active')
		scrollbarButUp.classList.remove('active')
	}
})

function scrollPageDown() {
	itemsBody.scrollTo(0, itemsBody.scrollHeight)
}

function scrollPageUp() {
	itemsBody.scrollTo(0, 0)
}

function hiddeItems() {
	items.forEach((item) => {
		if (item.classList.contains('on-list')){
			item.animate({opacity: 0}, {duration: 200, fill: 'forwards'})
		}
	});
	footer.animate({opacity: 0}, {duration: 500, fill: 'forwards'})
}

function showItems() {
	items.forEach((item) => {
		if (item.classList.contains('on-list')){
			item.animate({opacity: 1}, {duration: 500, fill: 'forwards'})
		}
	});
	footer.animate({opacity: 1}, {duration: 200, fill: 'forwards'})
}


items.forEach((item) => {
	let titleBlock = item.querySelector(".title-block");
	let itemTitle = titleBlock.querySelector(".title");
	let title = item.querySelector("span[title]");
	let image = item.querySelector(".content img.rep");

	let url = `url('${item.getAttribute('url')}')`;
	let cX = item.offsetLeft;
	let cY = item.offsetTop;
	let cW = item.offsetWidth;
	let cH = item.offsetHeight;
	let initialValues = {x: cX, y: cY, w: cW, h: cH};
	
	image.src = item.getAttribute('url');
	title.innerText = itemTitle.innerText;

	window.addEventListener('resize', (e) => {
		let cX = item.offsetLeft;
		let cY = item.offsetTop;
		let cW = item.offsetWidth;
		let cH = item.offsetHeight;
		initialValues = {x: cX, y: cY, w: cW, h: cH};
	});

	function handleClick(e){
			let container = item.querySelector('.content');
			if (item.classList.contains('on-list')) {
				item.classList.remove('on-list');
				item.style.overflow = 'visible';

			if(pageUpBut.classList.contains('active')){
				pageUpBut.classList.remove('active')
			}

			if(pageDownBut.classList.contains('active')){
				pageDownBut.classList.remove('active')
			}

				let h = document.body.offsetHeight;
				let w = document.body.offsetWidth;
				let cX = item.offsetLeft;
				let cY = item.offsetTop;
				let newW = 490;
				let newH = 455;
				let x = (w / 2 - newW / 2) - cX;
				let y = (h / 2 - newH / 2) - cY;

				item.style.zIndex = '1';

				let containerKeys = [
					{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						transform:  `translate(${x}px, ${y}px)`,
						height:  CSS.px(newH),
						width:  CSS.px(newW),
						borderRadius: CSS.px(18),
					}
				];

				container.animate(
					containerKeys,
					{
						easing: 'cubic-bezier(0.93, 0.03, 0.82, 0.99)',
						fill: 'forwards',
						iteration: 1,
						delay: 0,
						duration: 450
					}
				);

				image.style.transformOrigin = '35% 35%'
				image.animate(
					{
						transform: 'scale(1)'
					},
					{
						easing: 'cubic-bezier(0.93, 0.03, 0.82, 0.99)',
						iteration: 1,
						delay: 50,
						fill: 'forwards',
						duration: 600
					}
				)
		
				details.animate(
					{
						transform: `translateY(${newH + cY - details.offsetTop - 95}px)`,
					},
					{
						easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
						iteration: 1,
						fill: 'forwards',
						duration: 500
					}
				)

				nav.animate(
					{
						left: CSS.px(itemsBody.offsetLeft + nav.offsetWidth / 2),
					},
					{
						easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
						iteration: 1,
						fill: 'forwards',
						duration: 500
					}
				)

				setTimeout(() => {
					titleBlock.animate(
						[
							{
								left: CSS.px(10),
								position: 'fixed',
								display: 'flex',
								opacity: 0,
							},
							{
								left: CSS.px(10),
								position: 'fixed',
								display: 'flex',
								opacity: 1,
							},
						],
						{
							easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
							iteration: 1,
							fill: 'forwards',
							duration: 100
						}
					)
				}, 450);

				scrollbar.animate(
					{
						transform: 'translateX(calc(100% + 20px))'
					},
					{
						easing: 'cubic-bezier(0.81, 0.18, 0.58, 1)',
						fill: 'forwards',
						iteration: 1,
						delay: 0,
						duration: 400
					}
				)

				scrollbarBut.animate(
					{
						transform: 'translateX(calc(-100% - 20px))'
					},
					{
						easing: 'cubic-bezier(0.29, 0.05, 0.66, 0.42)',
						fill: 'forwards',
						iteration: 1,
						delay: 0,
						duration: 400
					}
				)
			}

	}

	function handleMouseOver(e) {
		document.body.style.backgroundImage = url
		body.animate(
			{ backgroundColor: 'rgba(0, 0, 0, 0.437)' },
			{
				duration: 300,
				fill: 'forwards'
			}
		)
		emptyBg = false
	}

	function handleMouseOut(e) {
		emptyBg = true
		if (item.classList.contains('on-list')){
			setTimeout(() => {
				if (emptyBg == true){
					setTimeout(() => {
						document.body.style.backgroundImage = 'none'
					}, 300);
					body.animate(
						{ backgroundColor: 'rgba(0, 0, 0, 1)' },
						{
							duration: 300,
						}
					)
				}
			}, 400)
		}
	}

	function handleMouseWheel(e) {
		let container = item.querySelector('.content');
		let h = document.body.offsetHeight;
		let w = document.body.offsetWidth;
		let cX = container.offsetLeft;
		let cY = container.offsetTop;
		let x = - cX;
		let y = - cY;
		let newH = 180;
		if (!item.classList.contains('on-list') && e.wheelDelta < 0){

			hiddeItems();

			if(!pageDownBut.classList.contains('active')){
				pageDownBut.classList.add('active')
			}

			let keyFrames = [
				{
					transform:  `translate(${x}px, ${y}px)`,
					width: CSS.px(document.body.offsetWidth),
					height: CSS.px(newH),
					borderRadius: CSS.px(12),
					position:'sticky',
					top: 0,
					zIndex: 10, 
				},
			];

			container.animate(keyFrames,
				{
					easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
					iteration: 1,
					fill: 'forwards',
					duration: 600
				}
			)

			details.animate(
				{
					transform: `translateY(0px)`,
				},
				{
					easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
					iteration: 1,
					fill: 'forwards',
					duration: 500
				}
			)
			
			titleBlock.animate(
				{
					left: CSS.px(itemsBody.offsetLeft),
					position: 'absolute',
					display: 'flex',
					opacity: 1,
				},
				{
					easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
					iteration: 1,
					fill: 'forwards',
					duration: 600
				}
			)

			itemsBody.animate(
				{
					transform: 'translateY(-100%)'
				},
				{
					easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
					fill: 'forwards',
					iteration: 1,
					delay: 0,
					duration: 600
				}
			)

			if(!itemsBody.classList.contains('open')){
				itemsBody.classList.add('open')
			}
		} else if (!item.classList.contains('on-list') && e.wheelDelta > 0){
			if(itemsBody.scrollTop == 0) {
				showItems();
				
				setTimeout(() => {
					document.body.style.backgroundImage = 'none'
				}, 500);
				body.animate(
					{ backgroundColor: 'rgba(0, 0, 0, 1)' },
					{
						duration: 500,
					}
				)

				if(itemsBody.classList.contains('open')){
					itemsBody.classList.remove('open')
				}

				if(pageUpBut.classList.contains('active')){
					pageUpBut.classList.remove('active')
				}

				if(pageDownBut.classList.contains('active')){
					pageDownBut.classList.remove('active')
				}

				let keys = {
					transform: `translate(${initialValues.x - container.offsetLeft}px, ${initialValues.y - container.offsetTop}px)`,
					height: CSS.px(initialValues.h),
					width: CSS.px(initialValues.w),
					borderRadius: CSS.px(4),
				};

				container.animate(keys, {
					easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
					fill: 'forwards',
					duration: 500,
				})

				item.classList.add('on-list')

				setTimeout(()=>{item.style.zIndex = '0';}, 350);

				nav.animate(
					{
						left: CSS.percent(50),
					},
					{
						easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
						iteration: 1,
						fill: 'forwards',
						duration: 500
					}
				)

				titleBlock.animate(
					{
						left: CSS.px(itemsBody.offsetLeft),
						opacity: 0
					},
					{
						easing: 'cubic-bezier(0.7,-0.08, 0.68, 0.74)',
						iteration: 1,
						fill: 'forwards',
						duration: 0
					}
				)

				image.animate(
					{
						tranformOrigin: '0% 0%',
						transform: 'scale(0.6)'
					},
					{
						easing: 'cubic-bezier(0.93, 0.03, 0.82, 0.99)',
						iteration: 1,
						delay: 150,
						fill: 'forwards',
						duration: 600
					}
				)

				scrollbar.animate(
					{
						transform: 'none'
					},
					{
						easing: 'cubic-bezier(0.29, 0.05, 0.66, 0.42)',
						fill: 'forwards',
						iteration: 1,
						delay: 0,
						duration: 400
					}
				)

				scrollbarBut.animate(
					{
						transform: 'none'
					},
					{
						easing: 'cubic-bezier(0.29, 0.05, 0.66, 0.42)',
						fill: 'forwards',
						iteration: 1,
						delay: 0,
						duration: 400
					}
				)

				itemsBody.animate(
					{
						transform: 'none'
					},
					{
						easing: 'cubic-bezier(0.29, 0.05, 0.66, 0.42)',
						fill: 'forwards',
						iteration: 1,
						delay: 0,
						duration: 400
					}
				)
			}else{
				const pageUpBut = scrollbarBut.querySelector('.page-up');
				if(!pageUpBut.classList.contains('active')){
					pageUpBut.classList.add('active')
				}
			}
		}
	}

	function handleScroll(e) {
		if(itemsBody.scrollTop != 0) {
			const pageUpBut = scrollbarBut.querySelector('.page-up');
			if(!pageUpBut.classList.contains('active')){
				pageUpBut.classList.add('active')
			}
		}
		if(itemsBody.scrollTop < itemsBody.scrollHeight) {
			const pageDownBut = scrollbarBut.querySelector('.page-down');
			if(!pageDownBut.classList.contains('active')){
				pageDownBut.classList.add('active')
			}
		}
	}

	image.addEventListener("mouseenter", handleMouseOver)
	image.addEventListener("mousemove", handleMouseOver)
	image.addEventListener("mouseover", handleMouseOver)

	item.addEventListener("mouseout", handleMouseOut)

	item.addEventListener("click", handleClick)

	document.addEventListener('mousewheel', handleMouseWheel)
	document.addEventListener('scroll', handleScroll)

});


