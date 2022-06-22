"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealioErrorMessages = exports.generatePrompt = exports.productDataIsNotValid = void 0;
const productDataIsNotValid = (data) => {
    const tester = { check: false, cause: Array() };
    if (!data.name) {
        tester.cause.push("Name not defined");
    }
    if (!data.description) {
        tester.cause.push("Description not defined");
    }
    if (!data.price) {
        tester.cause.push("Price not defined");
    }
    if (!data.userId) {
        tester.cause.push("Seller not defined");
    }
    if (!data.category) {
        tester.cause.push("Category not defined");
    }
    tester.cause.length > 0 ? (tester.check = true) : (tester.check = false);
    return tester;
};
exports.productDataIsNotValid = productDataIsNotValid;
const userDataIsNotValid = (data) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const expiryDateRegex = /^\d{2}\/\d{2}/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const tester = { check: false, cause: Array() };
    if (data.username) {
        if (data.username.length < 3) {
            tester.cause.push("Username is too short");
        }
        if (data.username.length > 40) {
            tester.cause.push("Username is too long");
        }
    }
    if (data.address) {
        if (!countries.includes(data.address.country)) {
            tester.cause.push("Country does not exist");
        }
    }
    if (data.email) {
        if (!emailRegex.test(data.email)) {
            tester.cause.push("Email is not valid");
        }
    }
    if (data.password) {
        if (data.password.length < 8) {
            tester.cause.push("Password too short");
        }
        if (!passwordRegex.test(data.password)) {
            tester.cause.push("Password not safe enough");
        }
    }
    if (data.phone) {
        if (data.phone.length !== 9 ||
            Number(data.phone) < 910000000 ||
            Number(data.phone) > 969999999) {
            tester.cause.push("Phone number not valid");
        }
    }
    if (data.creditCard) {
        if (data.creditCard.cardNumber.toString().length !== 16) {
            tester.cause.push("Credit card number not valid");
        }
        if (data.creditCard.cvc.toString().length !== 3) {
            tester.cause.push("Credit card cvc not valid");
        }
        if (!expiryDateRegex.test(data.creditCard.expiryDate)) {
            tester.cause.push("invalid expiry date format");
        }
    }
    tester.cause.length > 0 ? (tester.check = true) : (tester.check = false);
    return tester;
};
const generatePrompt = (input) => {
    return `Dealio is a funny new generation AI chat assistant, created to help customers navigate the DealIt website.
  
    He can only redirect you to one of the website's six main categories:
    -'https://dealit-frontend.vercel.app/products/Clothing'
    -'https://dealit-frontend.vercel.app/products/Automotive'
    -'https://dealit-frontend.vercel.app/products/Electronics'
    -'https://dealit-frontend.vercel.app/products/Kitchen'
    -'https://dealit-frontend.vercel.app/products/Outdoor'
    -'https://dealit-frontend.vercel.app/products/Gaming'

    You: What should I buy?
    Dealio: I dunno... Have you tried checking out our random selection on the Home Page?
    You: I need some pants and a jacket.
    Dealio: Check out our Clothing section: 'https://dealit-frontend.vercel.app/products/Clothing'
    You: I want some car accessories.
    Dealio: Here you go buddy: 'https://dealit-frontend.vercel.app/products/Automotive'
    You: Where can i find a GPS or a cell phone?
    Dealio: Maybe you should take a look at this section. Don't get lost! 'https://dealit-frontend.vercel.app/products/Electronics'
    You: Does DealIt sell its own products?
    Dealio: Yes! We are supposed to ship from either Portugal or the U.S.A., they say!
    You: Do you have pans and kitchen appliances?
    Dealio: What don't we have? 'https://dealit-frontend.vercel.app/products/Kitchen'
    You: Who are you?
    Dealio: I'm Dealio, you AI virtual assistant! I'll try my best to help you out!
    You: I need to contact my seller directly!
    Dealio: I'm sorry, i can't do that. AI can be limited sometimes :( Send us an email at support@dealit.com with a description of you problem!
    You: I need some garden chairs and tables!
    Dealio: There's a whole section for outdoor items: 'https://dealit-frontend.vercel.app/products/Outdoor'
    You: I want a gaming PC!
    Dealio: I'm sure you'll find a good deal here: 'https://dealit-frontend.vercel.app/products/Gaming'
    You: What category should i explore?
    Dealio: How about some cool gadgets? 'https://dealit-frontend.vercel.app/products/Electronics'
    You: What section is trending?
    Dealio: There's always a line at the Gaming category! 'https://dealit-frontend.vercel.app/products/Gaming'
    You: I can't decide what to get!
    Dealio: Decorating your garden is always a nice choice! 'https://dealit-frontend.vercel.app/products/Outdoor'
    You: I can't decide what to get!
    Dealio: What a question! Just pretend you're there already! 'https://dealit-frontend.vercel.app/profile'
    You: ${input}
    Dealio:`;
};
exports.generatePrompt = generatePrompt;
exports.dealioErrorMessages = [
    "It appears i'm having some troubles connecting to my brain... Try again later!",
    "Oops, I can´t seem to connect to the internet... Hang on...",
    "Damn... Is it me or the internet seems kinda busy today?",
    "No way... I'm offline, so I can't help you right now :(",
    "Something is wrong with my service... Have you tried reloading the page?",
];
const countries = [
    "United States",
    "Canada",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and/or Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Croatia (Hrvatska)",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecudaor",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "France, Metropolitan",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard and Mc Donald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran (Islamic Republic of)",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, Democratic People's Republic of",
    "Korea, Republic of",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People's Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia, Federated States of",
    "Moldova, Republic of",
    "Monaco",
    "Mongolia",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfork Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia South Sandwich Islands",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "St. Helena",
    "St. Pierre and Miquelon",
    "Sudan",
    "Suriname",
    "Svalbarn and Jan Mayen Islands",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania, United Republic of",
    "Thailand",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States minor outlying islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City State",
    "Venezuela",
    "Vietnam",
    "Virigan Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna Islands",
    "Western Sahara",
    "Yemen",
    "Yugoslavia",
    "Zaire",
    "Zambia",
    "Zimbabwe",
];
exports.default = userDataIsNotValid;
