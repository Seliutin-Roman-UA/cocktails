!function(){var e,t="light-theme",r="dark-theme",o="theme",c=document.querySelector(".theme-switch__toggle"),a=document.querySelector(".theme-switch__text-white"),l=document.querySelector(".theme-switch__text-black");e=function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}(o),c.checked=e,document.body.className=e?r:t;c.addEventListener("change",(function(e){var c=e.target.checked;c?(a.style.color="#FCFCFC",l.style.color="#FD5103"):(a.style.color="#FD5103",l.style.color="#5F6775"),document.body.className=c?r:t,function(e,t){try{var r=JSON.stringify(t);localStorage.setItem(e,r)}catch(e){console.error("Set state error: ",e.message)}}(o,c)}))}();
//# sourceMappingURL=index.3fd27487.js.map