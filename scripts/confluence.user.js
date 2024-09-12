// ==UserScript==
// @name         Confluence 显示优化
// @namespace    mingming.wang
// @version      0.0.1
// @description  Confluence 显示优化。
// @author       mingming.wang
// @license      MIT
// @match        https://ushare.ucloudadmin.com/*
// ==/UserScript==

(function () {
  "use strict";
  let head = document.querySelector("html>head");
  let body = document.querySelector("html>body");

  let s = document.createElement("style");
  s.innerHTML = `
#content code.hljs{padding: 0 .2rem 0 .2rem !important;}
#content pre code[class^="language"] {
  border: solid 1px #b2b2b2 !important;
  width: 100% !important;
  padding: 1rem !important;
  overflow-x: auto !important;
  background: #fcfcfc;
};
    `
  head.appendChild(s);

  let highlight_js = document.createElement("script");
  highlight_js.src = "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/highlight.min.js";
  head.appendChild(highlight_js);
  let highlight_css = document.createElement("link");
  highlight_css.type = "text/css"
  highlight_css.rel = "stylesheet"
  highlight_css.href = "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/styles/default.min.css";
  head.appendChild(highlight_css);

  const re = /language-(\w+)/;
  let langs = [];
  let code_elements = document.querySelectorAll('code[class^="language"]');
  for (let e of code_elements) {
    let lang_parts = re.exec('language-go');
    if (lang_parts.length == 2) {
      langs.push(lang_parts[1]);
    }
  }

  if (langs.length > 0) {
    for (let l of langs) {
      let highlight_lang_js = document.createElement("script");
      highlight_lang_js.src = `https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/languages/${l}.min.js`;
      head.appendChild(highlight_lang_js);

      let highlight_css = document.createElement("link");
      highlight_css.type = "text/css"
      highlight_css.rel = "stylesheet"
      highlight_css.href = `https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/styles/${l}.min.css`;
      head.appendChild(highlight_css);
    }

    setTimeout(function () {
      let highlight_script = document.createElement("script");
      highlight_script.innerHTML = "hljs.highlightAll();";
      body.appendChild(highlight_script);
    }, 1000)
  }
})();
