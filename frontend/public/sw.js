if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,i,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const t={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return n;case"module":return t;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-4a677df8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/middleware-manifest.json",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/8aqVYtPn6K8EezuUbjKJi/_buildManifest.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/8aqVYtPn6K8EezuUbjKJi/_middlewareManifest.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/8aqVYtPn6K8EezuUbjKJi/_ssgManifest.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/122-5824a053a627edac.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/129-7ef9d7b3105caf69.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/177-5655bd997ced9357.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/196-0b243d17b981648b.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/369-e267f853882c1622.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/75fc9c18-4d2f0a9f494a9dad.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/framework-0f8b31729833af61.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/main-5d26e52efca329e9.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/_app-b139dacaad256c18.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/bus/add-2fdda2ea6ccec539.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/bus/dashboard-7f6000ad14f3a700.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/bus/login-8b104a864ec7c8d4.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/bus/register-f258addd0a36ccf0.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/index-d227795125fcd4cf.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/pages/public-2469e20d0e6f7cf2.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/chunks/webpack-378e68e29c265886.js",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/_next/static/css/999735718d407326.css",revision:"8aqVYtPn6K8EezuUbjKJi"},{url:"/favicon.ico",revision:"082480996ae1adce1ab8eda4c3871992"},{url:"/icons/android-chrome-192x192.png",revision:"86eb079902873ca64c236f0f3001af82"},{url:"/icons/android-chrome-512x512.png",revision:"4d321880274998db24ce59f9478332f5"},{url:"/icons/apple-touch-icon.png",revision:"4473c518f15878b2c68f4b12fa22e7b5"},{url:"/icons/bus.png",revision:"5351acf582adb7b44d57bbab3ae34685"},{url:"/icons/icon-72x72.png",revision:"4d8bc2de9b918c87b5e0e764c50fa750"},{url:"/icons/icon-96x96.png",revision:"9be684ccb1a9c918cf9408da0efdb4c5"},{url:"/icons/user.png",revision:"013d27321a0f3ad3859e1855638dc8be"},{url:"/manifest.json",revision:"1864e35024bd81559acb01db99790a67"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
