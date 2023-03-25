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
exports.getOrdersByUserAndStatus = exports.getOrdersByUser = exports.createOrderProduct = exports.createOrder = void 0;
const database_1 = __importDefault(require("../database"));
const createOrder = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
        const result = yield connection.query(sql, [id, status]);
        connection.release();
        return yield result.rows[0];
    }
    catch (error) {
        throw new Error(`Error when creating order: ${error.message}`);
    }
});
exports.createOrder = createOrder;
const createOrderProduct = (orderProduct) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        let sql = 'SELECT * FROM orders WHERE id=($1)';
        let result = yield connection.query(sql, [orderProduct.id]);
        if (result.rows.length && result.rows[0].status === 'active') {
            sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            result = yield connection.query(sql, [
                orderProduct.id,
                orderProduct.productId,
                orderProduct.quantity
            ]);
            connection.release();
            return result.rows[0];
        }
        else {
            connection.release();
            throw new Error('Faild to add product to the order, order is not found or maybe completed');
        }
    }
    catch (error) {
        throw new Error(`Error when creating order product: ${error.message}`);
    }
});
exports.createOrderProduct = createOrderProduct;
const getOrdersByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1)';
        const result = yield connection.query(sql, [userId]);
        connection.release();
        return result.rows;
    }
    catch (error) {
        throw new Error(`Error when getting orders by user: ${error.message}`);
    }
});
exports.getOrdersByUser = getOrdersByUser;
const getOrdersByUserAndStatus = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
        const result = yield connection.query(sql, [userId, status]);
        connection.release();
        return result.rows;
    }
    catch (error) {
        throw new Error('Error when getting orders by user and status: ' + error.message);
    }
});
exports.getOrdersByUserAndStatus = getOrdersByUserAndStatus;
