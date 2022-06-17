"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletion = void 0;
const openai_api_1 = __importDefault(require("openai-api"));
const utils_1 = require("../utils/utils");
const apiKey = process.env.OPENAI_API_KEY;
const openai = new openai_api_1.default(apiKey);
const createCompletion = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openai.complete({
        engine: "curie",
        prompt: (0, utils_1.generatePrompt)(input),
        maxTokens: 500,
        temperature: 0.3,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["\n", "testing"],
    });
    if (response) {
        return { response: response.data.choices[0].text };
    }
    return {
        response: utils_1.dealioErrorMessages[Math.random() * utils_1.dealioErrorMessages.length + 1],
    };
});
exports.createCompletion = createCompletion;
