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
exports.deleteUserCtlr = exports.updateUserCtlr = exports.getUserCtlr = exports.getUsersCtlr = exports.createUsersCtlr = exports.loginCtlr = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const users_1 = require("../services/users");
const loginCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, users_1.authenticateUser)(email, password);
    const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    if (!user) {
        return res.status(401).json({ message: 'email and password do not match please try again', code: 401, error: 'user not authenticated', data: null });
    }
    return res.status(200).json({ message: 'user successfully authenticated ', code: 200, error: null, data: Object.assign(Object.assign({}, user), { token }) });
});
exports.loginCtlr = loginCtlr;
const createUsersCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const createdUser = yield (0, users_1.createUser)(user);
    return res.status(201).json({ message: 'successfully created user ', code: 201, error: null, data: createdUser });
});
exports.createUsersCtlr = createUsersCtlr;
const getUsersCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, users_1.getAllUsers)();
    return res.status(200).json({ message: 'users successfully recovered ', code: 200, error: null, data: users });
});
exports.getUsersCtlr = getUsersCtlr;
const getUserCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const user = yield (0, users_1.getUser)(userId);
    if (!user) {
        return res.status(404).json({ message: 'user not found ', code: 404, error: 'user not found', data: null });
    }
    return res.status(200).json({ message: 'user successfully recovered ', code: 200, error: null, data: user });
});
exports.getUserCtlr = getUserCtlr;
const updateUserCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    const user = req.body;
    const updatedUser = yield (0, users_1.updateUser)(userId, user);
    return res.status(200).json({ message: 'user successfully updated ', code: 200, error: null, data: updatedUser });
});
exports.updateUserCtlr = updateUserCtlr;
const deleteUserCtlr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = +req.params.id;
    yield (0, users_1.deleteUser)(userId);
    return res.status(200).json({ message: 'user successfully deleted ', code: 200, error: null, data: null });
});
exports.deleteUserCtlr = deleteUserCtlr;
