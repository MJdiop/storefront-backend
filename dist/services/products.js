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
exports.getOneProduct = exports.getAllProducts = exports.createdProduct = void 0;
const database_1 = __importDefault(require("../database"));
const createdProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'INSERT INTO products (name, price,description, category) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = yield connection.query(sql, [product.name, product.price, product.description, product.category]);
        connection.release();
        return yield result.rows[0];
    }
    catch (error) {
        throw new Error(`Error when creating product: ${error.message}`);
    }
});
exports.createdProduct = createdProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT * FROM products';
        const result = yield connection.query(sql);
        connection.release();
        return yield result.rows;
    }
    catch (error) {
        throw new Error(`Error when getting all products error: ${error.message}`);
    }
});
exports.getAllProducts = getAllProducts;
const getOneProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT * FROM products WHERE id=($1)';
        const result = yield connection.query(sql, [id]);
        connection.release();
        return yield result.rows[0];
    }
    catch (error) {
        throw new Error(`Error when getting one product ${error.message}`);
    }
});
exports.getOneProduct = getOneProduct;
