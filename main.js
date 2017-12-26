//(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()

//Nav bar color change

var change = function() {
	var top  = window.pageYOffset || document.documentElement.scrollTop;
	var navbar = document.getElementById("header");
	var height = document.documentElement.clientHeight;
if (top >= height) {
	var fixed = navbar.style.backgroundColor = "black";
}else {
	var fixed = navbar.style.backgroundColor = "";
	}
}

//background dots

function main() {

	var canvas = document.querySelector('canvas');
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	var c = canvas.getContext("2d");

	var mouse = {
		x: undefined,
		y: undefined,
	}
	window.addEventListener("mousemove",function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
	})

	//circle object

	function Circle(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius =radius;

		this.draw = function() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle="black";
			c.fill();
			c.strokeStyle="white";
			c.stroke();
		}

		this.update = function() {
			if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
				this.dx = -this.dx;
			}
			if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy;
			}

			this.x += this.dx;
			this.y += this.dy;

			//interactive mouse

			if ( (Math.abs(this.x - mouse.x) < 100) && (Math.abs(this.y - mouse.y) < 100)) {
				c.beginPath();
				this.x +=this.dx *10;
				this.y +=this.dy *10;
				// c.moveTo(this.x, this.y);
				// c.lineTo(mouse.x, mouse.y);
				// c.stroke();
			}

			// connect to each other

			for (var i = 0; i < circleArray.length; i++) {
				if ( (Math.abs(this.x - circleArray[i].x) < 100) && (Math.abs(this.y - circleArray[i].y) < 100)) {
					var widthLine;
					if (this.radius == circleArray[i].radius){
						if (this.radius == 2) {
						widthLine = 0.5;
						} else{
						 widthLine = 0.1;
						}
					}else {
						widthLine = 0.3;
					}
					c.beginPath();
					c.moveTo(this.x, this.y);
					c.lineTo(circleArray[i].x, circleArray[i].y);
					c.lineWidth=widthLine;
					c.strokeStyle="gray";
					c.stroke();
				}
			}
			this.draw();
		}
	}
	var circleArray = [];

	//create array of dots
    if (canvas.width < 800) {
		for (var i = 0; i < 40; i++) {
				var x = Math.random()* window.innerWidth;
				var y = Math.random()* window.innerHeight;
				var dx = (Math.random()-0.5)* 2;
				var dy = (Math.random()-0.5)* 2;
				var radius = Math.floor((Math.random() * 2) + 1);
				circleArray.push(new Circle(x, y, dx, dy, radius));
		}
	} else {
		for (var i = 0; i < 150; i++) {
				var x = Math.random()* window.innerWidth;
				var y = Math.random()* window.innerHeight;
				var dx = (Math.random()-0.5)* 2;
				var dy = (Math.random()-0.5)* 2;
				var radius = Math.floor((Math.random() * 2) + 1);
				circleArray.push(new Circle(x, y, dx, dy, radius));
				}
		}
	animate();
	function animate() {
		requestAnimationFrame(animate);
		c.clearRect(0, 0, innerWidth, innerHeight);

		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	}
}

//change ltters

// function about() {
// 	var h1 = document.querySelector('#textEffect').textContent;
// 	var h1change = document.querySelector("#textEffect");
// 	var name = h1.split("");
// 	var newName = ["D","A","N","Y","L","O"," ","B","O","H","U","N"];

// 	var letterArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'U', 'X', 'Y', 'Z'];

// 	for (let i = 0; i < name.length; i++) {
// 		for (let j = 0; j < letterArray.length; j++) {
// 			function interval () {
// 				if (name[i] == " ") {
// 					name[i] = " ";
// 				} else {
// 					name[i]=letterArray[j];
// 					h1change.innerHTML = name.join("");
// 					console.log(name);
// 				}
// 			}
// 			setTimeout(interval(), 2000);
// 		}
// 		name[i] = newName[i];
// 		h1change.innerHTML = name.join("");
// 	}
// }
