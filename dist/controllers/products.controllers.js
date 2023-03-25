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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProductCtlr = exports.getAllProductsCtlr = exports.createProductCtlr = void 0;
const products_1 = require("../services/products");
const createProductCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const productCreated = yield (0, products_1.createdProduct)(product);
    return res.status(201).json({ message: 'successfully created product', code: 201, error: null, data: productCreated });
});
exports.createProductCtlr = createProductCtlr;
const getAllProductsCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, products_1.getAllProducts)();
    return res.status(200).json({ message: 'successfully get all products', code: 200, error: null, data: products });
});
exports.getAllProductsCtlr = getAllProductsCtlr;
const getOneProductCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, products_1.getOneProduct)(+req.params.id);
    return res.status(200).json({ message: 'successfully get product', code: 200, error: null, data: product });
});
exports.getOneProductCtlr = getOneProductCtlr;
