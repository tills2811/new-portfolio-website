/** Runs in <head> before paint so the page never flashes the wrong theme. */
export const themeScript = `(function(){try{var t=null;try{t=localStorage.getItem("theme")}catch(e){}
var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;
if(d)document.documentElement.classList.add("dark")}catch(e){}})();`;
