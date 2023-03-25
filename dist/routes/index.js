"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./api/users.routes"));
const orders_routes_1 = __importDefault(require("./api/orders.routes"));
const products_routes_1 = __importDefault(require("./api/products.routes"));
const router = (0, express_1.Router)();
router.use('/users', users_routes_1.default);
router.use('/orders', orders_routes_1.default);
router.use('/products', products_routes_1.default);
exports.default = router;
