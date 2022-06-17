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
exports.GetTextCompletion = void 0;
const get_textCompletion_1 = __importDefault(require("../domain/completion/get-textCompletion"));
const http_status_codes_1 = require("http-status-codes");
const GetTextCompletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body.input;
        if (!input) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        res.send(yield (0, get_textCompletion_1.default)(input));
    }
    catch (e) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.GetTextCompletion = GetTextCompletion;