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
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../index"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("../services/users");
dotenv_1.default.config();
const request = (0, supertest_1.default)(index_1.default);
describe('Test', () => {
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, users_1.authenticateUser)('diopmbayejacques@gmail.com', 'passer123');
        token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    }));
    // Test Users
    describe('get All Users', () => {
        it('should be returned all users with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('GET User', () => {
        it('should be returned user with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/api/users/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('POST Create User', () => {
        it('should be created if user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield request
                .post('/api/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                email: 'mbaye212@test.com',
                userName: 'mbaye baba',
                firstName: 'baba',
                lastName: 'test test',
                password: 'paseer123',
            });
            if (user.body.status !== 409) {
                expect(user.status).toBe(201);
            }
        }));
    });
    describe('patch Update User', () => {
        it('should be updated if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .patch('/api/users/1')
                .set('Authorization', `Bearer ${token}`)
                .send({
                email: 'mbaye2132@test.com',
                userName: 'mbaye baba',
                firstName: 'baba',
                lastName: 'test test',
                password: 'passer1234'
            });
            if (res.body.status !== 409) {
                expect(res.status).toBe(200);
            }
        }));
    });
    describe('delete User', () => {
        it('should be deleted if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .delete('/api/users/12')
                .set('Authorization', `Bearer ${token}`);
            if (res.body.status !== 409) {
                expect(res.status).toBe(200);
            }
        }));
    });
    // Test Products
    describe('get All Products', () => {
        it('should be returned all products with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/api/products')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('GET Product', () => {
        it('should be returned product with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/api/products/1')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('POST Create Product', () => {
        it('should be created if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield request
                .post('/api/products')
                .set('Authorization', `Bearer ${token}`)
                .send({
                name: 'test',
                price: 1000,
                description: 'test',
                quantity: 10,
                category: 'test',
            });
            if (product.body.status !== 409) {
                expect(product.status).toBe(201);
            }
        }));
    });
    // Test Orders
    describe('get All Orders', () => {
        it('should be returned all orders with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/api/orders/1/find')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('GET Order by status', () => {
        it('should be returned order with a status 200 if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            yield request
                .get('/api/orders/1/find-by-status?status=active')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        }));
    });
    describe('POST Create Order', () => {
        it('should be created if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield request
                .post('/api/orders/1/create')
                .set('Authorization', `Bearer ${token}`);
            if (order.body.status !== 409) {
                expect(order.status).toBe(201);
            }
        }));
    });
    describe('POST Create Order product', () => {
        it('should be created if user is authenticated with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield request
                .post('/api/orders/1/create-product')
                .set('Authorization', `Bearer ${token}`)
                .send({
                id: 2,
                productId: 1,
                quantity: 20,
            });
            if (order.body.status !== 409) {
                expect(order.status).toBe(201);
            }
        }));
    });
});
