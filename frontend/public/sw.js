if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,n,t)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return i;case"module":return a;default:return e(s)}}))).then((e=>{const s=t(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-4a677df8"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/middleware-manifest.json",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/122-d41a7f499b9bba33.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/129-7ef9d7b3105caf69.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/150-8b7eb31b52d0a673.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/177-5655bd997ced9357.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/196-0b243d17b981648b.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/425-e839715a09d6a087.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/75fc9c18-4d2f0a9f494a9dad.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/framework-0f8b31729833af61.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/main-5d26e52efca329e9.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/_app-ca791c9f71b35309.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/bus/add-12795c0466f33b43.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/bus/dashboard-311bb5396146429e.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/bus/login-839098941e1a279c.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/bus/register-2e4741c007bd2754.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/index-b065201f23dba3ce.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/pages/public-6686c42ca7512c12.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/chunks/webpack-378e68e29c265886.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/css/4b064dc3b8d6b868.css",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/css/999735718d407326.css",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/tvn0ii_bpNMQZMzEZfEl4/_buildManifest.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/tvn0ii_bpNMQZMzEZfEl4/_middlewareManifest.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/_next/static/tvn0ii_bpNMQZMzEZfEl4/_ssgManifest.js",revision:"tvn0ii_bpNMQZMzEZfEl4"},{url:"/favicon.ico",revision:"082480996ae1adce1ab8eda4c3871992"},{url:"/icons/android-chrome-192x192.png",revision:"86eb079902873ca64c236f0f3001af82"},{url:"/icons/android-chrome-512x512.png",revision:"4d321880274998db24ce59f9478332f5"},{url:"/icons/apple-touch-icon.png",revision:"4473c518f15878b2c68f4b12fa22e7b5"},{url:"/icons/bus.png",revision:"5351acf582adb7b44d57bbab3ae34685"},{url:"/icons/icon-72x72.png",revision:"4d8bc2de9b918c87b5e0e764c50fa750"},{url:"/icons/icon-96x96.png",revision:"9be684ccb1a9c918cf9408da0efdb4c5"},{url:"/icons/user.png",revision:"013d27321a0f3ad3859e1855638dc8be"},{url:"/manifest.json",revision:"1864e35024bd81559acb01db99790a67"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));