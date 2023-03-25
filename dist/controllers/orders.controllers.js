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
exports.createOrderProductCtlr = exports.getOrdersByUserAndStatusCtlr = exports.getOrdersByUserCtlr = exports.createOrderCtlr = void 0;
const orders_1 = require("../services/orders");
const createOrderCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const createdOrder = yield (0, orders_1.createOrder)(userId, 'active');
    return res.status(201).json({ message: 'successfully created order ', code: 201, error: null, data: createdOrder });
});
exports.createOrderCtlr = createOrderCtlr;
const getOrdersByUserCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const orders = yield (0, orders_1.getOrdersByUser)(userId);
    return res.status(200).json({ message: 'successfully fetched orders', code: 200, error: null, data: orders });
});
exports.getOrdersByUserCtlr = getOrdersByUserCtlr;
const getOrdersByUserAndStatusCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const status = req.query.status;
    const orders = yield (0, orders_1.getOrdersByUserAndStatus)(userId, status);
    return res.status(200).json({ message: 'successfully fetched orders', code: 200, error: null, data: orders });
});
exports.getOrdersByUserAndStatusCtlr = getOrdersByUserAndStatusCtlr;
const createOrderProductCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderProduct = req.body;
    const createdOrderProduct = yield (0, orders_1.createOrderProduct)(orderProduct);
    return res.status(201).json({ message: 'successfully created order product', code: 201, error: null, data: createdOrderProduct });
});
exports.createOrderProductCtlr = createOrderProductCtlr;
