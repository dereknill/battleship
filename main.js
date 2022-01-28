(()=>{var t={341:t=>{t.exports=function(){const t=document.querySelector("main"),e=new Map;function n(t){for(;t.firstChild;)t.removeChild(t.firstChild)}function a(){return document.querySelector(".ship-placing")}function i(){return"true"==a().dataset.vertical}function r(t){const e=document.querySelector(".info-container");n(e);let a=document.createElement("h2");a.textContent=t,e.appendChild(a)}function l(t){let e=document.createElement("div");e.classList.add("grid");for(let n=10;n>0;n--)for(let a=1;a<11;a++){let i=document.createElement("div");i.classList.add("tile"),i.dataset.x=a,i.dataset.y=n,t&&t(i),e.appendChild(i)}return e}function o(t,e,n=!0){let a=[],i=null;i=n?document.querySelector(".player-grid").querySelectorAll(`[data-x="${t}"]`):document.querySelector(".computer-grid").querySelectorAll(`[data-x="${t}"]`),a=Array.from(i);for(let t=0;t<a.length;t++)if(a[t].dataset.y==e)return a[t]}return e.set("Carrier",["images/Carrier.png","images/CarrierHorizontal.png"]),e.set("Battleship",["images/Battleship.png","images/BattleshipHorizontal.png"]),e.set("Destroyer",["images/Destroyer.png","images/DestroyerHorizontal.png"]),e.set("Submarine",["images/Submarine.png","images/SubmarineHorizontal.png"]),e.set("Patrol Boat",["images/Patrol.png","images/PatrolHorizontal.png"]),{loadStartScreen:function(){n(t);let e=document.createElement("h2");e.style.marginTop="30px";let a=document.createElement("input"),i=document.createElement("button");return e.textContent="Enter Player Name:",a.type="text",a.id="player-name-input",a.maxLength="20",i.id="start-game-button",i.textContent="Start Game",t.appendChild(e),t.appendChild(a),t.appendChild(i),i},fadeIn:async function(){let e=0;return t.style.opacity=e,new Promise((function(n){let a=setInterval((()=>{e>=1&&(clearInterval(a),n(!0)),e+=.05,t.style.opacity=e}),50)}))},fadeInLogo:function(){const t=document.querySelector(".logo-text");let e=0;t.style.opacity=e;let n=setInterval((()=>{e>=1&&clearInterval(n),e+=.05,t.style.opacity=e}),50)},fadeOut:function(e){let n=1;t.style.opacity=n;let a=setInterval((()=>{n<=0&&(clearInterval(a),e()),n-=.05,t.style.opacity=n}),50)},loadGameScreen:function(e,a){let i=document.querySelector("#player-name-input").value;n(t);let r=document.createElement("div");r.classList.add("game-container");let o=document.createElement("div");o.classList.add("info-container");let c=document.createElement("div");c.classList.add("grids-container");let s=l(a);s.classList.add("player-grid"),c.appendChild(s),r.appendChild(o),r.appendChild(c),t.appendChild(r),e(i)},loadShipSelect:function(t,a,i){const r=document.querySelector(".info-container");n(r);let l=document.createElement("h2");l.textContent=`Place your ${a} (drag and drop)`;let o=document.createElement("div");o.classList.add("ship-row");let c=document.createElement("button");c.textContent="Axis: Y",c.classList.add("axis-button");let s=document.createElement("img");s.src=e.get(a)[0],s.draggable="true",s.classList.add("ship-placing"),s.dataset.vertical="true",s.dataset.length=i,s.dataset.name=a,o.appendChild(s),o.appendChild(c),r.appendChild(l),r.appendChild(o),t(s,c)},getCurrentShip:a,placementIsVertical:i,getTile:o,placeShipOnGrid:function(t,e,n){let i=new Image;i.src=a().src;let r=o(t,e,!0);n?i.classList.add("centered-ship-vertical"):i.classList.add("centered-ship-horizontal"),r.appendChild(i)},changeAxis:function(){let t=a(),n=document.querySelector(".axis-button");i()?(t.dataset.vertical="false",t.src=e.get(t.dataset.name)[1],n.textContent="Axis: X"):(t.dataset.vertical="true",t.src=e.get(t.dataset.name)[0],n.textContent="Axis: Y")},setGameLoopScreen:function(t){let e=document.querySelector(".grids-container"),a=document.querySelector(".info-container");document.querySelector("header").style.paddingBottom="15px",n(e),n(a),a.style.height="50px",a.style.padding="0 20px";let i=l(),r=l(t),o=document.createElement("h3"),c=document.createElement("h3");o.textContent="Friendly Water",c.textContent="Enemy Water";let s=document.createElement("div"),d=document.createElement("div");s.classList.add("player-grid-container"),d.classList.add("computer-grid-container"),i.classList.add("player-grid"),s.appendChild(o),s.appendChild(i),r.classList.add("computer-grid"),d.appendChild(c),d.appendChild(r),e.appendChild(d),e.appendChild(s)},clearElement:n,placeShipOnGridGameLoop:function(t){let n=new Image,a=o(t.startPosX,t.startPosY);t.isVertical?(n.src=e.get(t.name)[0],n.classList.add("centered-ship-vertical")):(n.src=e.get(t.name)[1],n.classList.add("centered-ship-horizontal")),a.appendChild(n)},tileHit:function(t,n,a,i,l){let c=o(t,n,a),s=document.createElement("div");s.classList.add("tile-hit"),c.appendChild(s),l.isSunk()?a?r(`${i} fires at (${t},${n}) and sinks your ${l.name}!`):(r(`Direct hit! you sank the Computer's ${l.name}!`),function(t,n,a,i){let r=new Image,l=o(n,a,!1);i?(r.src=e.get(t)[0],r.classList.add("centered-ship-vertical")):(r.src=e.get(t)[1],r.classList.add("centered-ship-horizontal")),l.appendChild(r)}(l.name,l.startPosX,l.startPosY,l.isVertical)):r(`${i} fires at (${t},${n}) and scores a direct hit!`)},tileMiss:function(t,e,n,a){let i=o(t,e,n),l=document.createElement("div");l.classList.add("tile-miss"),i.appendChild(l),r(`${a} fires at (${t},${e}) and misses.`)},gameover:function(t,e){let a=document.querySelector(".info-container"),i=document.createElement("h2");n(a),a.style.flexDirection="row",i.textContent=`${t} has won!`,i.style.marginRight="15px";let r=document.createElement("button");r.textContent="Play Again",a.appendChild(i),a.appendChild(r),e(r)},aiming:function(t){r(`${t} is taking aim...`)}}}},843:t=>{t.exports=class{constructor(t,e,n){this.computer=t,this.player=e,this.ships=n,this.lastHit=null}attemptAttack(){let t=null;t=this.lastHit?this.findShipSinkTile():this.findAttackableTile();let e={x:t.x,y:t.y,ship:null};return e.ship=this.player.attemptReceiveAttack(t.x,t.y),e.ship&&(e.ship.isSunk()?this.lastHit=null:this.lastHit=e),e}findShipSinkTile(){let t=this.lastHit.ship.posArray;for(let e=0;e<t.length;e++){let n=t[e];if(!n.isHit)continue;let a=[{x:n.x+1,y:n.y},{x:n.x-1,y:n.y},{x:n.x,y:n.y+1},{x:n.x,y:n.y-1}];this.shuffleArray(a);for(let t=0;t<a.length;t++)if(a[t].x<11&&a[t].x>0&&a[t].y<11&&a[t].y>0&&this.player.checkIfAttackable(a[t].x,a[t].y))return{x:a[t].x,y:a[t].y}}}findAttackableTile(){let t,e;for(;;)if(t=this.getRandomInt(1,11),e=this.getRandomInt(1,11),this.player.checkIfAttackable(t,e))return{x:t,y:e}}shuffleArray(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}}getRandomInt(t,e){return Math.floor(Math.random()*(e-t)+t)}placeShips(){this.ships.forEach((t=>{let e,n,a;for(;;)if(e=this.getRandomInt(1,11),n=this.getRandomInt(1,11),a=this.getRandomInt(1,3)>1,this.computer.checkPlaceable(t.length,e,n,a)){this.computer.attemptPlaceShip(t.length,e,n,a,t.name);break}}))}}},529:(t,e,n)=>{const a=n(922);t.exports=function(){const t=[];function e(e,i,r,l,o){return!!n(e,i,r,l)&&(t.push(a(e,i,r,l,o)),!0)}function n(t,e,n,a){if(a){if(Number(t)+Number(n)>11)return!1;for(let a=n;a<t+n;a++)if(!i(e,a))return!1}else{if(Number(t)+Number(e)>11)return!1;for(let a=e;a<t+e;a++)if(!i(a,n))return!1}return!0}function i(e,n){for(let a=0;a<t.length;a++)if(!t[a].checkAvailable(e,n))return!1;return!0}return{placeShip:e,receiveAttack:function(e,n){let a=!1;for(let i=0;i<t.length;i++){let r=t[i].hit(e,n);if(r){a=r;break}}return a},allSunk:function(){for(let e=0;e<t.length;e++)if(!t[e].isSunk())return!1;return!0},checkAvailable:i,placeShip:e,checkPlaceable:n,getShips:function(){return t}}}},874:(t,e,n)=>{const a=n(529);t.exports=function(t){const e=a(),n=[];return{getName:function(){return t},attemptPlaceShip:function(t,n,a,i,r){return e.placeShip(t,n,a,i,r)},checkIfAttackable:function(t,e){return!n.find((n=>n[0]===t&&n[1]===e))},attemptReceiveAttack:function(t,a){return n.push([t,a]),e.receiveAttack(t,a)},checkPlaceable:function(t,n,a,i){return e.checkPlaceable(t,n,a,i)},getShips:function(){return e.getShips()},allSunk:function(){return e.allSunk()}}}},922:t=>{t.exports=function(t,e,n,a,i){const r=[];if(a)for(let a=n;a<n+t;a++)r.push({x:e,y:a,isHit:!1});else for(let a=e;a<e+t;a++)r.push({x:a,y:n,isHit:!1});return{hit:function(t,e){const n=r.find((n=>n.x==t&&n.y==e));return null!=n&&(n.isHit=!0,this)},isSunk:function(){let t=!0;return r.forEach((e=>{!1===e.isHit&&(t=!1)})),t},checkAvailable:function(t,e){return null==r.find((n=>n.x===t&&n.y===e))},startPosX:e,startPosY:n,isVertical:a,length:t,name:i,posArray:r}}}},e={};function n(a){var i=e[a];if(void 0!==i)return i.exports;var r=e[a]={exports:{}};return t[a](r,r.exports,n),r.exports}(()=>{const t=n(874),e=n(341),a=n(843);let i=e(),r=null,l=null,o=null,c=!0,s=[{name:"Carrier",length:5},{name:"Battleship",length:4},{name:"Destroyer",length:3},{name:"Submarine",length:3},{name:"Patrol Boat",length:2}],d=-1;async function u(){let t=i.loadStartScreen();await i.fadeIn(),function(t){t.addEventListener("click",S)}(t)}function p(){i.loadGameScreen(f,G),i.fadeIn()}function h(t,e,n,a){let s;s=a?"Computer":r.getName(),i.aiming(s),setTimeout((()=>{n?i.tileHit(t,e,a,s,n):i.tileMiss(t,e,a,s,n),m(),m()?function(){let t=r.allSunk(),e=l.allSunk();t?i.gameover("Computer",V):e&&i.gameover(r.getName(),V)}():a?c=!0:setTimeout((()=>{!function(){const t=o.attemptAttack();h(t.x,t.y,t.ship,!0)}()}),1500)}),1e3)}function m(){return r.allSunk()||l.allSunk()}function f(e){r=t(e),l=t("Computer"),y()}function g(){i.setGameLoopScreen(R);let t=r.getShips();t.forEach((t=>{i.placeShipOnGridGameLoop(t)})),o=new a(l,r,t),o.placeShips(),i.fadeIn()}function y(){d++,d>=s.length?(i.clearElement(document.querySelector(".info-container")),i.fadeOut(g)):i.loadShipSelect(D,s[d].name,s[d].length)}function v(t){let e=Number(t.dataset.x),n=Number(t.dataset.y);t.style.background="inherit";let a=Number(i.getCurrentShip().dataset.length),l=i.getCurrentShip().dataset.name;return!!r.checkPlaceable(a,e,n,i.placementIsVertical())&&(i.placeShipOnGrid(e,n,i.placementIsVertical()),r.attemptPlaceShip(a,e,n,i.placementIsVertical(),l),y(),!0)}function x(){r=null,l=null,o=null,d=-1,u()}function S(t){i.fadeOut(p),t.target.removeEventListener("click",S)}function C(t){}function k(t){t.target.style.opacity=0,t.dataTransfer.effectAllowed="move";let e=new Image;e.src=i.getCurrentShip().src,i.placementIsVertical()?t.dataTransfer.setDragImage(e,e.width/2,e.height-17.5):t.dataTransfer.setDragImage(e,17.5,e.height/2)}function E(t){t.target.style.opacity=1}function L(t){}function b(t){t.preventDefault(),t.dataTransfer.dropEffect="move"}function I(t){v(t.target)}function A(t){let e=Number(t.target.dataset.x),n=Number(t.target.dataset.y),a=Number(i.getCurrentShip().dataset.length);r.checkPlaceable(a,e,n,i.placementIsVertical())?t.target.style.background="green":t.target.style.background="red"}function P(t){t.target.style.background="inherit"}function T(){i.changeAxis()}function w(t){}function H(t){let e=t.targetTouches[0];t.target.style.position="absolute",i.placementIsVertical()?(t.target.style.left=e.pageX-t.target.width/2+"px",t.target.style.bottom=document.body.clientHeight-e.pageY-17.5+"px"):(t.target.style.top=e.pageY-t.target.height/2+"px",t.target.style.left=e.pageX-17.5+"px"),t.preventDefault()}function q(t){t.preventDefault();let e=t.changedTouches[0],n=i.getCurrentShip(),a=document.elementFromPoint(e.pageX,e.pageY);null!=a&&a.classList.contains("tile")&&v(a)||(n.style.position="relative",n.style.left="auto",n.style.bottom="auto",n.style.top="auto")}function $(t){let e=i.getCurrentShip();e.style.position="relative",e.style.left="auto",e.style.bottom="auto",e.style.top="auto"}function N(t){if(!c)return;let e=t.target.dataset.x,n=t.target.dataset.y;h(e,n,l.attemptReceiveAttack(e,n),!1),t.target.removeEventListener("click",N),c=!1}function D(t,e){"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?(t.addEventListener("touchstart",w),t.addEventListener("touchmove",H),t.addEventListener("touchend",q),t.addEventListener("touchcancel",$)):(t.addEventListener("dragstart",k),t.addEventListener("drag",C),t.addEventListener("dragend",E),t.addEventListener("dragover",L)),e.addEventListener("click",T)}function G(t){"ontouchstart"in window&&navigator.maxTouchPoints>0&&navigator.msMaxTouchPoints>0||(t.addEventListener("dragover",b),t.addEventListener("drop",I),t.addEventListener("dragenter",A),t.addEventListener("dragleave",P))}function R(t){t.addEventListener("click",N)}function V(t){t.addEventListener("click",x)}setTimeout(u,300),setTimeout(i.fadeInLogo,300)})()})();