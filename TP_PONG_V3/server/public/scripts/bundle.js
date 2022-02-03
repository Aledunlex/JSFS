(()=>{"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},i(t)}function o(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=i(t)););return t}function r(){return r="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=o(t,e);if(i){var r=Object.getOwnPropertyDescriptor(i,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},r.apply(this,arguments)}function a(t,e){return a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},a(t,e)}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&a(t,e)}function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}function c(t,e){if(e&&("object"===h(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}var l=function(){function e(n,i,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0;t(this,e),this.y=i,this.x=n,this.img=new Image,this.img.src=o,this.horizontalSpeed=r,this.verticalSpeed=a}return n(e,[{key:"width",get:function(){return this.img.width}},{key:"height",get:function(){return this.img.height}},{key:"move",value:function(){this.x+=this.horizontalSpeed,this.y+=this.verticalSpeed,this.updateCenter()}},{key:"draw",value:function(t){t.drawImage(this.img,this.x,this.y)}},{key:"stopMoving",value:function(){this.horizontalSpeed=0,this.verticalSpeed=0}},{key:"updateCenter",value:function(){this.top=this.y,this.bottom=this.y+this.height,this.center=(this.top+this.bottom)/2}}]),e}();var u=Symbol(0),f=Symbol(1),p=Symbol(2),d=function(){function e(){t(this,e)}return n(e,null,[{key:"UP",get:function(){return u}},{key:"DOWN",get:function(){return f}},{key:"NONE",get:function(){return p}}]),e}();function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=i(t);if(e){var r=i(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return c(this,n)}}var y,m,g,w=function(e){s(a,e);var o=v(a);function a(e,n,i){var r;return t(this,a),(r=o.call(this,e,n,"../images/paddle.png",0,0)).moving=d.NONE,r.theGame=i,r}return n(a,[{key:"getUp",value:function(){return this.moving===d.UP}},{key:"getDown",value:function(){return this.moving===d.DOWN}},{key:"getStop",value:function(){return this.moving===d.NONE}},{key:"moveUp",value:function(){this.moving=d.UP}},{key:"moveDown",value:function(){this.moving=d.DOWN}},{key:"stopMoving",value:function(){this.moving=d.NONE,r(i(a.prototype),"stopMoving",this).call(this)}},{key:"move",value:function(){this.getUp()?(this.verticalSpeed=-7,this.y=Math.max(0,this.y+this.verticalSpeed)):this.getDown()&&(this.verticalSpeed=7,this.y=Math.min(this.theGame.canvas.height-this.img.height,this.y+this.verticalSpeed)),r(i(a.prototype),"updateCenter",this).call(this)}}]),a}(l);function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=i(t);if(e){var r=i(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return c(this,n)}}g=44,(m="PADDLEHEIGHT")in(y=w)?Object.defineProperty(y,m,{value:g,enumerable:!0,configurable:!0,writable:!0}):y[m]=g;var k=function(e){s(a,e);var o=b(a);function a(e,n,i){var r;return t(this,a),(r=o.call(this,e,n,"./images/balle24.png",8,4)).theGame=i,r}return n(a,[{key:"move",value:function(){this.x+this.horizontalSpeed<=0&&(this.x=0,r(i(a.prototype),"stopMoving",this).call(this)),(this.y+this.verticalSpeed<=0||this.y+this.height>=this.theGame.canvas.height)&&(this.verticalSpeed=-this.verticalSpeed),this.x+this.width>=this.theGame.canvas.width&&(this.horizontalSpeed=-this.horizontalSpeed),r(i(a.prototype),"move",this).call(this)}},{key:"checkForCollisionWith",value:function(t){var e=t.x+t.width,n=t.y+t.height,i=Math.max(this.x,t.x+2*t.width/3),o=Math.max(this.y,t.y+2*t.height/3),r=Math.min(this.x+t.width,e),a=Math.min(this.y+t.height,n),s=i<r&&o<a;return s&&this.handleCollision(t),s}},{key:"handleCollision",value:function(t){var e=Math.abs(this.center-t.center);console.log(e),e<10?(console.log("centre proche"),this.horizontalSpeed=-(this.horizontalSpeed+1),this.verticalSpeed=-(this.verticalSpeed-1)):e<30?(console.log("centre ... moyen?"),this.horizontalSpeed=-(this.horizontalSpeed+2),this.verticalSpeed=-(this.verticalSpeed-2)):(console.log("centre éloigné"),this.horizontalSpeed=-(this.horizontalSpeed+3),this.verticalSpeed=-(this.verticalSpeed-3))}}]),a}(l),S=function(){function e(n){t(this,e),this.raf=null,this.canvas=n,this.context=this.canvas.getContext("2d"),this.ball=new k(this.canvas.width/2,this.canvas.height/2,this),this.paddle1=new w(20,this.canvas.height/2-w.PADDLEHEIGHT,this)}return n(e,[{key:"start",value:function(){this.animate()}},{key:"stop",value:function(){window.cancelAnimationFrame(this.raf)}},{key:"animate",value:function(){this.moveAndDraw(),this.raf=window.requestAnimationFrame(this.animate.bind(this))}},{key:"moveAndDraw",value:function(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.paddle1.draw(this.context),this.ball.draw(this.context),this.ball.move(),this.ball.checkForCollisionWith(this.paddle1),this.paddle1.move()}},{key:"keyDownActionHandler",value:function(t){switch(t.key){case"ArrowUp":case"Up":this.paddle1.moveUp();break;case"ArrowDown":case"Down":this.paddle1.moveDown();break;default:return}t.preventDefault()}},{key:"keyUpActionHandler",value:function(t){switch(t.key){case"ArrowUp":case"Up":this.paddle1.getDown()||this.paddle1.stopMoving();break;case"ArrowDown":case"Down":this.paddle1.getUp()||this.paddle1.stopMoving();break;default:return}t.preventDefault()}}]),e}();window.addEventListener("load",(function(){var t=document.getElementById("field"),e=new S(t);document.getElementById("start").addEventListener("click",(function(){return D(e)})),window.addEventListener("keydown",e.keyDownActionHandler.bind(e)),window.addEventListener("keyup",e.keyUpActionHandler.bind(e))}));var O=!1,D=function(t){O?(document.getElementById("start").value="jouer",t.stop()):(t.start(),document.getElementById("start").value="stop"),O=!O}})();