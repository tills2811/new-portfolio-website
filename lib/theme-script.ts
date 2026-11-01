/**
 * Runs in <head> before paint so the page never flashes the wrong theme.
 * Also adds "js" so styles that hide content until it animates in only apply
 * when JavaScript is running.
 */
export const themeScript = `(function(){var h=document.documentElement;h.classList.add("js");try{var t=null;try{t=localStorage.getItem("theme")}catch(e){}
var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;
if(d)h.classList.add("dark")}catch(e){}})();`;
