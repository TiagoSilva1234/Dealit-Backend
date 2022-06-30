"use strict";
const users = [
    {
        "id": 0,
        "username": "Dealit",
        "email": "dealit@dealit.com",
        "phone": "910000000"
    },
    {
        "id": 1,
        "username": "Claudio",
        "email": "julioclaudiodaquintadocudatuamae@hothothothotmail.com",
        "phone": "910123223"
    },
    {
        "id": 3,
        "username": "Júlio Augosto",
        "email": "julio@email.com",
        "phone": "927777222"
    },
    {
        "id": 4,
        "username": "Manuel Escobar",
        "email": "escoba@email.com",
        "phone": "968754321"
    },
    {
        "id": 5,
        "username": "Jacques Tronault",
        "email": "jacq@email.com",
        "phone": "923456789"
    },
    {
        "id": 6,
        "username": "Francois Tronault",
        "email": "frac@email.com",
        "phone": "923456784"
    },
    {
        "id": 8,
        "username": "The Nice Store",
        "email": "thenicestore@email.com",
        "phone": "934567643"
    },
    {
        "id": 43,
        "username": "rmzaoo",
        "email": "rmpt2002@gmail.com",
        "phone": "934139797"
    },
    {
        "id": 44,
        "username": "sfwfr",
        "email": "weq@gmail.com",
        "phone": "932343243"
    },
    {
        "id": 45,
        "username": "Rafael",
        "email": "qwe@gmail.com",
        "phone": "934123234"
    },
    {
        "id": 46,
        "username": "teste 123",
        "email": "ewrwwrwe@gmail.com",
        "phone": "932321234"
    },
    {
        "id": 47,
        "username": "André",
        "email": "andre.filipe.parra@gmail.com",
        "phone": "910168153"
    },
    {
        "id": 48,
        "username": "Teste123",
        "email": "fwfw@gmail.com",
        "phone": "931243123"
    },
    {
        "id": 49,
        "username": "Aninha Cueene",
        "email": "aninhacuenne@gmail.com",
        "phone": "966696696"
    },
    {
        "id": 50,
        "username": "claudio",
        "email": "cao@gmail.com",
        "phone": "911147842"
    },
    {
        "id": 51,
        "username": "Konamista",
        "email": "konamista@gmail.com",
        "phone": "964964964"
    },
    {
        "id": 52,
        "username": "sfsfs f",
        "email": "wrwefw@gmail.com",
        "phone": "934139712"
    }
];
const products = [
    {
        "id": 1,
        "name": "Roku TV",
        "userId": 3,
        "description": "Smart Functionality offers access to over 5,000 streaming channels featuring more than 500,000 movies and TV episodes via Roku TV. \\n Specs: 1080p Full HD Resolution excellent detail, color, and contrast. \\n Wireless Connection: 802.11 2x2 Dual Band Direct-lit LED produces great picture quality with 60Hz refresh rate for fast moving action scenes with virtually no motion blur.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/71wYJc19PiL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71cpX-cXJKL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71BKXlC429L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61L4dogSYSL._AC_SL1500_.jpg"
        ],
        "price": "168",
        "uploadDate": "2022-06-15T15:18:48.214Z"
    },
    {
        "id": 2,
        "name": "Acer Nitro 5 AN517-54-79L1 Gaming Laptop",
        "userId": 1,
        "description": "Great performance meets long battery life with the Intel Core i7-11800H Processor - up to 4.6GHz, 8 cores, 16 threads, 24MB Intel Smart Cache. \\n The latest NVIDIA GeForce RTX 3050 Ti is powered by award-winning architecture with new Ray Tracing Cores, Tensor Cores, and streaming multiprocessors support DirectX 12 Ultimate for the ultimate gaming performance.",
        "categoryName": "Laptops",
        "photos": [
            "https://m.media-amazon.com/images/I/81Ivn5DIxhL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71dAj0u85hL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81d7Vxh4cKL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/817Ka8WcSGL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61m9IXFAlSL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71SHOW+YaVL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71BZRH9lK8L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71so+iSehKL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81YwsBsVo3L._AC_SL1500_.jpg"
        ],
        "price": "1199.99",
        "uploadDate": "2022-06-15T15:23:47.173Z"
    },
    {
        "id": 3,
        "name": "AuKing Mini Projector 2022",
        "userId": 3,
        "description": "2022 Upgraded mini projector equipped with 2000:1 contrast ratio, supported 1080p resolution, brings you a 35% brighter images than similar projectors in market. \\n It provides you with a premium home cinema experience with the bigger screen and clearer image. \\n The mini projector has a 32~170 inches projection display size with 1m to 5m projection distance. \\n Built-in speakers offer excellent loud sound quality, you can also connect it to external speakers to meet your higher quality sound needs.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/61+CDKTXYgL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71dn+By7hnL._AC_SL1000_.jpg",
            "https://m.media-amazon.com/images/I/61uQo-VNiUL._AC_SL1000_.jpg",
            "https://m.media-amazon.com/images/I/71wl0tQgKdS._AC_SL1200_.jpg",
            "https://m.media-amazon.com/images/I/61k+zyWoayL._AC_SL1000_.jpg"
        ],
        "price": "89.8",
        "uploadDate": "2022-06-15T15:29:27.252Z"
    },
    {
        "id": 4,
        "name": "LOUTOC Universal TV Remote",
        "userId": 3,
        "description": "The remote ONLY suitable for all Roku TVs. \\n It is NOT compatible with any Roku Stick,Roku Streaming Stick,Roku Box 1/2/3/4(HD/LT/XS/XD),Roku Ultra,Roku Express,Roku Premiere or Roku Player. \\n Our remote has been upgraded to give you a greater transmitting distance (over25 ft) and has a quick response time of 0.3 seconds,and the buttons have been tested to support over 120000 click.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/71k82MNsIQL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71ylwzoTl+L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71IYegUQvuL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71gVF11aFOL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71t+BtmTSjL._AC_SL1500_.jpg"
        ],
        "price": "10.99",
        "uploadDate": "2022-06-15T15:33:22.193Z"
    },
    {
        "id": 5,
        "name": "SteelSeries Arctis 3",
        "userId": 1,
        "description": "Designed for everywhere you game, with superior sound, comfort and style on all gaming platforms, including pc, PlayStation, Xbox one, Nintendo switch, VR and mobile via detachable 3.5 millimeter cables. \\n Widely recognized as the best mic in gaming, the discord certified clear cast microphone delivers studio quality voice clarity and background noise cancellation.",
        "categoryName": "Headsets",
        "photos": [
            "https://m.media-amazon.com/images/I/81FpaX4SvWL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71w94cw6ttL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71h+3hExloL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81yo0QhfH7L._AC_SL1500_.jpg"
        ],
        "price": "49.99",
        "uploadDate": "2022-06-15T20:42:42.236Z"
    },
    {
        "id": 6,
        "name": "Audio Extractor Audio Converter 4K@120Hz HDMI 2.1",
        "userId": 3,
        "description": "HDMI to HDMI 1 in 1 out audio extractor converter can extract audio from a digital HDMI signal to your Amplifier, Soundbar, Speaker, etc. converts it to Optical S/PDIF or high-quality stereo 3.5 mm audio output. Supports VRR, CEC bypass, audio DE-embed,optical audio out without TV connected.\nVideo Format - HDMI 2.1 Audio Converter supports multiple resolution up to 4K@120Hz 1080P@240Hz 4:4:4 8bit. Also supports VRR, HDCP 2.2 & HDCP 2.3 bypass, HDR 10, Dolby vision, 3D effect. Audio Format - Supports EDID Management, LPCM 7.1, Dolby Atmos, DTS X,Dolby True HD, DTS-HD Master Audio.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/61JGzKKkhXL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71VLPiZVeQL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71Y0kWZ+WAL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/713VtXXODZL._SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71lT72ovKVL._SL1500_.jpg"
        ],
        "price": "119",
        "uploadDate": "2022-06-16T14:40:54.076Z"
    },
    {
        "id": 7,
        "name": "Mounting Dream UL Listed TV Mount",
        "userId": 3,
        "description": "Patented Design TV Mount: TV wall mounts fit most 37' - 70' TVS up to 132 lbs, with MAX VESA 600 x 400mm, supporting up to 24’’ wood stud spacing. Please check VESA, TV weight, wood studs spacing and possible blocked input. TV size is just for reference. Patent no. 29/639, 502\nSave Space: Low profile wall mount TV bracket place your TV close to wall 1. 5” flush profile, saving space greatly with stylish appearance\nReduce Glare: Tilt your TV forward up to 8 degrees to reduce glare for better viewing\nEasy to Install: 3-step easy installation TV mount with decent instruction and level. All our TV mounts are not for dry wall alone! Additional concrete anchors are available through Mounting Dream team(Concrete Anchor Size: φ10x50mm). Please refer to MD2268-XL if prefer one-piece wall mount.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/61kW1CrcOfS._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61BtM-zv6EL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/712obBdUl2L._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71uYVdyGQKL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/615D0s+7PBL._AC_SL1500_.jpg"
        ],
        "price": "29.99",
        "uploadDate": "2022-06-16T14:46:06.919Z"
    },
    {
        "id": 8,
        "name": "NVIDIA SHIELD Android TV Pro Streaming Media Player",
        "userId": 3,
        "description": "The Best of the Best. The world’s most powerful Android TV streaming media player upgraded to Android TV version 11. Enhance HD video in real-time to 4K for clearer, crisper visuals using next-generation AI upscaling. 2x USB 3.0 ports for storage expansion, USB cameras, keyboards, controllers, and more. Plex Media Server built-in, 3 GB RAM, and 16 GB storage.\nDolby Vision - Atmos. Bring your home theater to life with Dolby Vision HDR, and surround sound with Dolby Atmos and Dolby Digital Plus—delivering ultra-vivid picture quality and immersive audio.\n4K HDR Content. Get the most 4K content of any streaming media player. Watch Netflix, Amazon Video, Apple TV+, Disney+ and Google Play Movies & TV in crisp 4K HDR, and YouTube, Hulu, and more in 4K. Stream from your phone with built-in Chromecast 4K.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/61rowppY2TL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61JAZ+f8dcL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/81Yib0qyCfL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/619flqzMjDL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71uS0wG910L._AC_SL1500_.jpg"
        ],
        "price": "199.99",
        "uploadDate": "2022-06-16T14:54:15.071Z"
    },
    {
        "id": 9,
        "name": "NEWCARE HDMI to RCA Converter for Old TV, 1080P HDMI",
        "userId": 3,
        "description": "HDMI to RCA Converter- NEWCARE HDMI to RCA can convert HDMI video signal to normal CVBS(RCA) signal, freely connect your TV Stick, Roku, Chromecast, Apple TV, PC, Laptop, Xbox, HDTV to your older TV, projector or monitor with RCA port. Perfect solution for old TV without HDMI port.(NOT SUPPORTS RCA TO HDMI)\nPlug and Play- This mini HDMI to RCA converter is easy to set up and operate, simply connect all ports and you can use it, no need to install drivers, portable, flexible, plug and play. Please connect the USB power cable in the package to the 5V power source during use to ensure stable signal transmission.\nWide Compatibility- Supports HDMI 1.3 input, and the input resolution supports from 480i to 1080P. CVBS output supports PAL, NTSC_M and NTSC_J. Please kindly note this converter does not support 4k and 3D. And this does not support with mobile phones and iPad series.",
        "categoryName": "TV & Video",
        "photos": [
            "https://m.media-amazon.com/images/I/615Qb1Hc6vL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61w2JjKPgqL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71yzs4CEToL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/61hGwnnllnL._AC_SL1500_.jpg",
            "https://m.media-amazon.com/images/I/71z03t3O5vL._AC_SL1500_.jpg"
        ],
        "price": "14.99",
        "uploadDate": "2022-06-16T15:04:01.693Z"
    },
    {
        "id": 10,
        "name": "Cool Wool Sweater",
        "userId": 0,
        "description": "Nice sweater for the cold weather!",
        "categoryName": "Men's Fashion",
        "photos": [
            "https://m.media-amazon.com/images/I/71XQOJZApgL._AC_UL640_QL65_.jpg",
            "https://m.media-amazon.com/images/I/71XQOJZApgL._AC_UL640_QL65_.jpg",
            "https://m.media-amazon.com/images/I/91BFgYA-MyL._AC_UL640_QL65_.jpg"
        ],
        "price": "15.5",
        "uploadDate": "2022-06-16T15:21:03.160Z"
    },
    {
        "id": 11,
        "name": "Car Phone Holder",
        "userId": 8,
        "description": "Holds your phone nicely! cheapest price garanteed!!!",
        "categoryName": "Interior Accessories",
        "photos": [
            "https://m.media-amazon.com/images/I/81iReadMegL._AC_UY436_QL65_.jpg",
            "https://m.media-amazon.com/images/I/51qTyNg26tL._AC_UY436_QL65_.jpg",
            "https://m.media-amazon.com/images/I/41wpCxVFDoL._AC_UY436_QL65_.jpg"
        ],
        "price": "10",
        "uploadDate": "2022-06-20T15:26:03.036Z"
    },
    {
        "id": 47,
        "name": "teste",
        "userId": 43,
        "description": "wer",
        "categoryName": "Car Care",
        "photos": [
            "a"
        ],
        "price": "8.43",
        "uploadDate": "2022-06-29T09:40:50.717Z"
    },
    {
        "id": 48,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:08:56.416Z"
    },
    {
        "id": 49,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:09:32.484Z"
    },
    {
        "id": 50,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:11:02.499Z"
    },
    {
        "id": 51,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:11:24.000Z"
    },
    {
        "id": 52,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:11:40.155Z"
    },
    {
        "id": 53,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:15:55.447Z"
    },
    {
        "id": 54,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:16:37.368Z"
    },
    {
        "id": 55,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:18:42.184Z"
    },
    {
        "id": 56,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:21:45.286Z"
    },
    {
        "id": 57,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:36:41.937Z"
    },
    {
        "id": 58,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:40:39.886Z"
    },
    {
        "id": 59,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:41:30.684Z"
    },
    {
        "id": 60,
        "name": "pao",
        "userId": 0,
        "description": "pao",
        "categoryName": "Mice",
        "photos": [],
        "price": "20",
        "uploadDate": "2022-06-30T09:44:29.887Z"
    }
];
const categories = [
    {
        "id": 2,
        "name": "Clothing",
        "level": 1,
        "upperLevel": null,
        "image": "https://www.macleans.ca/wp-content/uploads/2014/09/MAC36_WOMENS_CLOTHES_POST.jpg",
        "subcategories": [
            {
                "id": 18,
                "name": "Women's Fashion",
                "level": 2,
                "upperLevel": "Clothing",
                "image": "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?cs=srgb&dl=pexels-spencer-selover-428338.jpg&fm=jpg"
            },
            {
                "id": 20,
                "name": "Men's Fashion",
                "level": 2,
                "upperLevel": "Clothing",
                "image": "https://i.pinimg.com/originals/8d/bb/1e/8dbb1e179e04e7ab8a66e419609599fa.jpg"
            },
            {
                "id": 21,
                "name": "Girl's Fashion",
                "level": 2,
                "upperLevel": "Clothing",
                "image": "https://oldnavy.gap.com/Asset_Archive/ONWeb/content/0028/755/195/assets/220316_51-M6637_G_DP_Sale.jpg"
            },
            {
                "id": 23,
                "name": "Boy's Fashion",
                "level": 2,
                "upperLevel": "Clothing",
                "image": "https://dress-trends.com/wp-content/uploads/2018/11/boys-fashion-2019-boys-clothes-2019-boys-summer-clothes-2019-boys-fashion-2019-bloys-clothes-2019-boys-summer-clothes-2019.jpg"
            },
            {
                "id": 24,
                "name": "Baby Clothes",
                "level": 2,
                "upperLevel": "Clothing",
                "image": "https://res.cloudinary.com/babylist/image/upload/f_auto,q_auto:best,c_scale,w_768/v1602199710/hello-baby/best-winter-baby-clothes-header.jpg"
            }
        ]
    },
    {
        "id": 3,
        "name": "Automotive",
        "level": 1,
        "upperLevel": null,
        "image": "https://www.hotrodmalta.com/dynimage/galleria/1017/image.jpg",
        "subcategories": [
            {
                "id": 25,
                "name": "Car Care",
                "level": 2,
                "upperLevel": "Automotive",
                "image": "https://www.liqui-moly.com/fileadmin/user_upload/Unternehmen/Aktuelles/2019/04/R8_012_1140x770px_pflege-neu.jpg.png"
            },
            {
                "id": 27,
                "name": "Exterior Accessories",
                "level": 2,
                "upperLevel": "Automotive",
                "image": "https://cdn.openpr.com/S/7/S702690549_g.jpg"
            },
            {
                "id": 28,
                "name": "Interior Accessories",
                "level": 2,
                "upperLevel": "Automotive",
                "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/accessories-1600717450.jpg"
            },
            {
                "id": 29,
                "name": "Tires & Wheels",
                "level": 2,
                "upperLevel": "Automotive",
                "image": "https://www.wheel-size.com/static/img/misc/wheel-size-main.jpg"
            },
            {
                "id": 31,
                "name": "RV Parts & Accessories",
                "level": 2,
                "upperLevel": "Automotive",
                "image": "https://www.i49rv.com/fckimages/pages/parts/rv_parts.jpg"
            },
            {
                "id": 33,
                "name": "Lights & Lighting",
                "level": 2,
                "upperLevel": "Automotive",
                "image": "https://www.al.world/fileadmin/user_upload/2018_3.jpg"
            }
        ]
    },
    {
        "id": 4,
        "name": "Kitchen",
        "level": 1,
        "upperLevel": null,
        "image": "https://www.ikea.com/images/a-kitchen-with-colour-coordinated-storage-lots-of-worktops-a-711e46725eca6a662cd1f672f6e24e0b.jpg",
        "subcategories": [
            {
                "id": 8,
                "name": "Cookware",
                "level": 2,
                "upperLevel": "Kitchen",
                "image": "https://m.media-amazon.com/images/I/715qOOqdKNL._AC_SL1500_.jpg"
            },
            {
                "id": 9,
                "name": "Bakeware",
                "level": 2,
                "upperLevel": "Kitchen",
                "image": "https://m.media-amazon.com/images/I/91hBA6hLfuL._AC_SL1500_.jpg"
            },
            {
                "id": 11,
                "name": "Storage & Organization",
                "level": 2,
                "upperLevel": "Kitchen",
                "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2015%2F06%2F19011609%2Fthd-busymom-pantry-0315_vert.jpg"
            },
            {
                "id": 12,
                "name": "Kitchen Utensils & Gadgets",
                "level": 2,
                "upperLevel": "Kitchen",
                "image": "https://m.media-amazon.com/images/I/71yv70+DHtL._AC_SL1500_.jpg"
            }
        ]
    },
    {
        "id": 5,
        "name": "Outdoor",
        "level": 1,
        "upperLevel": null,
        "image": "https://cdn.mos.cms.futurecdn.net/UCcULcMaCiaPVBLy7Qve4j.jpg",
        "subcategories": [
            {
                "id": 17,
                "name": "Décor",
                "level": 2,
                "upperLevel": "Outdoor",
                "image": "https://www.homestoriesatoz.com/wp-content/uploads/2019/04/At-Home-Patio-Furniture-9.jpg"
            },
            {
                "id": 15,
                "name": "Gardening & Lawn Care",
                "level": 2,
                "upperLevel": "Outdoor",
                "image": "https://i.guim.co.uk/img/media/ef96c1f2495b60ec83379962d4aec38bfb1ce039/0_187_5600_3363/master/5600.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=a96e7cb435ac3a89558b8315d39c068d"
            },
            {
                "id": 19,
                "name": "Cooking",
                "level": 2,
                "upperLevel": "Outdoor",
                "image": "https://johnlewis.scene7.com/is/image/johnlewis/outdoor-kitchen-lead"
            },
            {
                "id": 22,
                "name": "Outdoor Storage & Housing",
                "level": 2,
                "upperLevel": "Outdoor",
                "image": "https://static.onecms.io/wp-content/uploads/sites/37/2022/02/25/keter-premier-tall-resin-outdoor-storage-shed-with-shelving-brackets-for-patio-furniture-tout.jpg"
            }
        ]
    },
    {
        "id": 6,
        "name": "Gaming",
        "level": 1,
        "upperLevel": null,
        "image": "https://www.imcgrupo.com/wp-content/uploads/2021/01/Best-Gadgets-for-Gamers-Gaming-Accessories-.png",
        "subcategories": [
            {
                "id": 26,
                "name": "Headsets",
                "level": 2,
                "upperLevel": "Gaming",
                "image": "https://s2.glbimg.com/hVXV6CKNLzOy6zzKp1LjnlFCb6A=/0x0:768x460/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/J/R/IYdsOsTM2b2mVcHO3n3g/kraken-razer.jpeg"
            },
            {
                "id": 30,
                "name": "Keyboards",
                "level": 2,
                "upperLevel": "Gaming",
                "image": "https://www.techfans.net/wp-content/uploads/2020/03/maxresdefault-15.jpg"
            },
            {
                "id": 32,
                "name": "Chairs",
                "level": 2,
                "upperLevel": "Gaming",
                "image": "https://hips.hearstapps.com/amv-prod-gp.s3.amazonaws.com/gearpatrol/wp-content/uploads/2020/05/Gaming-Chair-Gear-Patrol-Lead-Full.jpg?crop=0.6706185567010309xw:1xh;center,top&resize=640:*"
            },
            {
                "id": 34,
                "name": "Mice",
                "level": 2,
                "upperLevel": "Gaming",
                "image": "https://www.cnet.com/a/img/resize/bf12c4ebbade3267bd6fa5e40415ad891fbad759/2021/03/12/b3f1bae0-a41e-474e-af92-0c6be9a4db94/glorious-model-o-wired-gaming-mouse.jpg?auto=webp&fit=crop&height=630&width=1200"
            },
            {
                "id": 35,
                "name": "Laptops",
                "level": 2,
                "upperLevel": "Gaming",
                "image": "https://assets-prd.ignimgs.com/2022/04/25/acernitrolaptop-1650914214505.jpg"
            }
        ]
    },
    {
        "id": 1,
        "name": "Electronics",
        "level": 1,
        "upperLevel": null,
        "image": "https://s3-ap-southeast-1.amazonaws.com/p2swebsite/images/smeKhabar/news/Electronic_1570608013383_93.jpg",
        "subcategories": [
            {
                "id": 7,
                "name": "Camera & Photo",
                "level": 2,
                "upperLevel": "Electronics",
                "image": "https://media.istockphoto.com/photos/set-of-the-camera-and-photography-equipment-on-wood-desk-professional-picture-id925168094?k=20&m=925168094&s=170667a&w=0&h=YDbmG3QEAJFgaR273SrYVNcyKS8hUKp0LInLy8L-LUo="
            },
            {
                "id": 10,
                "name": "Cell Phones & Accessories",
                "level": 2,
                "upperLevel": "Electronics",
                "image": "https://image.made-in-china.com/202f0j00tKCYsFiRnEkJ/Hot-Selling-Phone-Accessories-Charging-Station-Earphone-Smartwatch-for-iPhone-Android-Samsung-Huawei.jpg"
            },
            {
                "id": 13,
                "name": "Computer & Accessories",
                "level": 2,
                "upperLevel": "Electronics",
                "image": "https://thetechrim.com/wp-content/uploads/2022/03/photo-1587831990711-23ca6441447b.jpeg"
            },
            {
                "id": 14,
                "name": "GPS & Navigation",
                "level": 2,
                "upperLevel": "Electronics",
                "image": "https://www-sygic.akamaized.net/content/1-press/23-sygic-gps-navigation-soon-to-be-available-via-android-auto/aa_sygic_cardisplay.png"
            },
            {
                "id": 16,
                "name": "TV & Video",
                "level": 2,
                "upperLevel": "Electronics",
                "image": "https://searchengineland.com/wp-content/seloads/2014/08/tv-video-ss-1920-800x450.jpg"
            }
        ]
    }
];
