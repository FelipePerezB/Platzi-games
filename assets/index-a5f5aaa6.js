var T=Object.defineProperty;var M=(n,X,t)=>X in n?T(n,X,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[X]=t;var h=(n,X,t)=>(M(n,typeof X!="symbol"?X+"":X,t),t);(function(){const X=document.createElement("link").relList;if(X&&X.supports&&X.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const g=[];var u=(n=>(n["-"]=" ",n.O="🚪",n.X="💣",n.I="🎁",n.PLAYER="💀",n.BOMB_COLLISION="🔥",n.GAME_OVER="👎",n.WIN="🏆",n))(u||{});g.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);g.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);g.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);const d=document.querySelector("canvas"),a=document.querySelector(".lives"),r=document.querySelector(".time"),v=document.querySelector(".record"),p=d==null?void 0:d.getContext("2d"),i=class{};let c=i;h(c,"playerPosition",{x:0,y:0}),h(c,"map",[]),h(c,"elementSize"),h(c,"level"),h(c,"lives",5),h(c,"timer"),h(c,"renderlives",X=>{X&&(i.lives=5);let t="";for(let l=0;l<i.lives;l++)t+="🤍";a&&(a.innerHTML=t)}),h(c,"clearTimer",X=>{if(clearInterval(i.timer),r&&v&&X){const t=r.innerHTML,l=Number(localStorage.getItem("timeRecord"));(!l||l>Number(t))&&localStorage.setItem("timeRecord",t),v.innerHTML=`Record: ${localStorage.getItem("timeRecord")??""}ds`}}),h(c,"setTimer",()=>{let X=1;r&&(i.timer=setInterval(()=>{r.innerHTML=String(X),X++},100))}),h(c,"getMap",X=>{i.level=X;const t=g[X-1];return t?t.trim().split(`
`).map(s=>s.trim().split("")):(i.clearTimer(!0),i.map=i.getMap(1),i.setTimer(),i.renderlives(!0),i.map)}),h(c,"deleteMap",()=>{p==null||p.clearRect(0,0,Number(d==null?void 0:d.width),Number(d==null?void 0:d.width))}),h(c,"startGame",()=>{const X=localStorage.getItem("timeRecord");if(v&&X&&(v.innerHTML=`Record: ${X??""}ds`),i.setTimer(),i.renderlives(),i.map=i.getMap(1),d&&p){d.width=d.clientHeight,d.height=d.clientHeight;const t=d.clientHeight/i.map.length-2;i.elementSize=t,p.font=`${t}px Verdana`,i.renderElements(!0),i.renderBtns()}}),h(c,"win",()=>{const X=i.level+1;i.map=i.getMap(X),setTimeout(()=>{i.renderElements(!0)},100)}),h(c,"levelFail",()=>{i.lives>1?i.lives-=1:(i.clearTimer(),i.setTimer(),i.renderlives(!0),i.map=i.getMap(1)),i.renderlives(),setTimeout(()=>{i.renderElements(!0)})}),h(c,"renderElements",X=>{console.log("render"),i.deleteMap(),i.map.forEach((t,l)=>{t.forEach((e,s)=>{const f=Math.trunc(i.elementSize*s),L=Math.trunc(i.elementSize*(l+1)),P=Math.trunc(i.playerPosition.y),R=Math.trunc(i.playerPosition.x),y=u[e],w=Math.abs(R-f),o=Math.abs(P-L);w<2&&o<2&&!X&&(y===u.I?i.win():y===u.X&&i.levelFail()),p==null||p.fillText(y,f,L),y===u.O&&X&&(i.playerPosition={x:f,y:L},p==null||p.fillText(u.PLAYER,i.playerPosition.x,i.playerPosition.y))})})}),h(c,"renderBtns",()=>{document.querySelectorAll(".btns button").forEach(t=>{t.id==="up"?t.addEventListener("click",()=>i.move("Up")):t.id==="left"?t.addEventListener("click",()=>i.move("Left")):t.id==="down"?t.addEventListener("click",()=>i.move("Down")):t.id==="right"&&t.addEventListener("click",()=>i.move("Right"))}),document.addEventListener("keydown",t=>{t.key==="ArrowUp"?i.move("Up"):t.key==="ArrowLeft"?i.move("Left"):t.key==="ArrowDown"?i.move("Down"):t.key==="ArrowRight"&&i.move("Right")})}),h(c,"move",X=>{const t=Number(d==null?void 0:d.height),l=i.playerPosition.y,e=i.playerPosition.x,s=i.elementSize;X==="Up"&&l>s?i.playerPosition.y-=s:X==="Left"&&e>0?i.playerPosition.x-=s:X==="Down"&&l<t-s?i.playerPosition.y+=s:X==="Right"&&e<t-s*2&&(i.playerPosition.x+=s),i.renderElements(),p==null||p.fillText(u.PLAYER,i.playerPosition.x,i.playerPosition.y)});const x=c.startGame;x();
