if(!self.define){let e,c={};const i=(i,r)=>(i=new URL(i+".js",r).href,c[i]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=c,document.head.appendChild(e)}else e=i,importScripts(i),c()})).then((()=>{let e=c[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,a)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(c[d])return;let f={};const s=e=>i(e,d),l={module:{uri:d},exports:f,require:s};c[d]=Promise.all(r.map((e=>l[e]||s(e)))).then((e=>(a(...e),f)))}}define(["./workbox-d37740a6"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"addmember.html",revision:"272248f9477d6c6e35de9178ad2d3cf0"},{url:"addpost.html",revision:"48a803306504c2fe40a9197b1340b5ec"},{url:"admin.css",revision:"3e040f647012055fa96c086ccb5a2de3"},{url:"admin0.html",revision:"7c50796bd30a882a0fe42f31bc2be985"},{url:"admin1.html",revision:"1c34b3924521dc7fa482988cef5fa303"},{url:"admin2.html",revision:"79dbca3e5c8acdddcfe61635c6d997c2"},{url:"admin3.html",revision:"e688d401bbed3196ef830af8c613c9a4"},{url:"anik.ttf",revision:"aef71d632dc238bdd99373edb3304bb9"},{url:"backgroundchangebutton.html",revision:"3417fdbb60fa2fbe12a237f68d634fbf"},{url:"blooddonartemplte.html",revision:"4b7bff67c37ae04e7a4d392784dd534c"},{url:"blooddonation.html",revision:"35d627e9d4a3bfa1884dac4036990ae8"},{url:"card.html",revision:"494ae1b0168ce1e6a93d4b9439e5d97c"},{url:"change_color.html",revision:"9126241097e16e33f9cc5e5885379282"},{url:"changepassword.html",revision:"a71f90dde5f0424c16838e097304b085"},{url:"changephoto.html",revision:"791164f6dc0c3f0ef37ee4af6ce1cd0b"},{url:"donation.html",revision:"504d4ac705a5cf2ede7ea8c0169fd286"},{url:"editprofiles.html",revision:"075712be0e4e0618f686070d3f1d227f"},{url:"eventsattend.html",revision:"5fc82c46f9920d0c857bfc87a7b0d7e1"},{url:"font1.ttf",revision:"c492d0add10a0d0d42d5c003f6e832ea"},{url:"font2.ttf",revision:"97b80fc5b116123c6c3a864fe3f3649b"},{url:"font3.ttf",revision:"79ae84208f6880be4313ae0ab8abeefe"},{url:"font4.ttf",revision:"0eb077a13ec99b1faddca4fd2410a725"},{url:"history.html",revision:"99b2fb004b377f7e0892be6b08cc328e"},{url:"inbox.html",revision:"142c21df4988985c3735f509e7d046b9"},{url:"index.css",revision:"f52078730598c0a8af3e4163ae945f10"},{url:"index.html",revision:"3a49ca72e7325c851bb7c54395c4c3d4"},{url:"index.js",revision:"5da1b4579c02e5748b9989975a9f8ef7"},{url:"inspect.html",revision:"618984f73f3e0c9cc201f393e24e1ed3"},{url:"login.html",revision:"0eacb54f66df8221ec6f59583b611602"},{url:"main.html",revision:"e523013fa3c92ace76164f7dca032e5a"},{url:"main.js",revision:"36ddfce554f23a02419c70b9f44c34b8"},{url:"mainoption.html",revision:"c017f5fdafbd5620521d22471ab4ee24"},{url:"navbar.css",revision:"29e7ca0d610fde841f88e2ddae8dd5db"},{url:"navbar.html",revision:"a2ac2b222957e87f3847b2ce993f4e92"},{url:"navbar.js",revision:"7cea2aa35a80bcbedd0c29d8609501cb"},{url:"persons.html",revision:"cb35d1bc1467efe24226e1cf21e67f0b"},{url:"persons2.html",revision:"0ea20691c95a401e7b0f35bc3eb3a3ff"},{url:"place.html",revision:"637fe99587c0d7579024447f862082fc"},{url:"places.html",revision:"dd04c523b251ae0f54a9e69b85225f5c"},{url:"post.html",revision:"b6d661ba44c92b3418cb68780bc27d36"},{url:"profession.html",revision:"8a89371c914e49916b3708648665ac45"},{url:"profiles.html",revision:"7adbb459b699aff29320f82a09777327"},{url:"puzzle.html",revision:"d32edaa4585de90c1cdffc4235f3e859"},{url:"referenceadd.html",revision:"2215d0cb9a1c296b6a2342f0e4042edf"},{url:"search.html",revision:"494b6ae7c1876f7ddb51eb3bee566d64"},{url:"SendMessegetoInbox.html",revision:"6da388eacb24e90c1f53a1f1df6bedde"},{url:"settings.html",revision:"5315c1f4ba58a2af42fcd4a4d50481cc"},{url:"signlepost.html",revision:"a21cd39ff31ce22d3db792b561fdc721"},{url:"storedand check CSV.html",revision:"a860ec3c20977069ec48ec6700393537"},{url:"test.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"test.html",revision:"e4af4af6f475968f2fcffa8e7a64df56"},{url:"test.js",revision:"aa82d4796a58c3e38004a43e831868c1"},{url:"test2.html",revision:"fad413a7eb8a220727dd0ffc0b6d454a"},{url:"test2.js",revision:"36ddfce554f23a02419c70b9f44c34b8"},{url:"test3.html",revision:"2879d86c454d95d5b0f4ed196cb34e83"},{url:"tictactoegame.html",revision:"ca732c153bb9923fbc623e7df44a8b47"},{url:"transport.html",revision:"a1803c1c439fce7e527ca553f7ab5704"},{url:"universal.css",revision:"5b83a7c2ffa948ded06a3e40e3ba8835"},{url:"universal.js",revision:"af9af1e97edb8ee8acc1f1845bf9f2bc"},{url:"userAge.html",revision:"3b49b89109c5a487b7debb92717ca4ae"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map