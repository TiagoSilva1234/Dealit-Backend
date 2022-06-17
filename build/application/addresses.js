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
exports.setFavoriteAddress = exports.postAddress = void 0;
const http_status_codes_1 = require("http-status-codes");
const post_address_1 = __importDefault(require("../domain/addresses/post-address"));
const patch_adressIsFavorite_1 = __importDefault(require("../domain/addresses/patch-adressIsFavorite"));
const postAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (!(data.country &&
            data.city &&
            data.houseNumber &&
            data.street &&
            data.zipCode)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "Address successfully saved to database",
            order: yield (0, post_address_1.default)(data),
        });
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
exports.postAddress = postAddress;
const setFavoriteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (isNaN(Number(id))) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            error: {
                message: "Invalid id format",
                cause: "Bad Request",
                date: new Date().toLocaleString(),
            },
        });
    }
    return res.send({
        message: "Favorite address successfully updated",
        address: yield (0, patch_adressIsFavorite_1.default)(id),
    });
});
exports.setFavoriteAddress = setFavoriteAddress;
