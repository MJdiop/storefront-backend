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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = exports.authenticateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("../database"));
const hashPassword = (password) => {
    const salt = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = bcrypt_1.default.hashSync(`${password} ${process.env.BCRYPT_PASSWORD}`, salt);
    return hashedPassword;
};
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE email=($1)';
        const result = yield connection.query(sql, [email]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(`${password} ${process.env.BCRYPT_PASSWORD}`, user.password)) {
                const userInfo = yield connection.query('SELECT id, email, username, firstname, lastname FROM users WHERE email=($1)', [email]);
                return userInfo.rows[0];
            }
        }
        connection.release();
        return null;
    }
    catch (error) {
        throw new Error(`Error when authenticating user error: ${error.message}`);
    }
});
exports.authenticateUser = authenticateUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'INSERT INTO users (email, username, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = yield connection.query(sql, [
            user.email,
            user.userName,
            user.firstName,
            user.lastName,
            hashPassword(user.password)
        ]);
        connection.release();
        return yield result.rows[0];
    }
    catch (error) {
        throw new Error(`Faild to insert user data with the following error: ${error.message}`);
    }
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT * FROM users';
        const result = yield connection.query(sql);
        connection.release();
        return yield result.rows;
    }
    catch (error) {
        throw new Error(`Error when retrieving users, error: ${error.message}`);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE id=($1)';
        const result = yield connection.query(sql, [id]);
        connection.release();
        return (yield result).rows[0];
    }
    catch (error) {
        throw new Error(`Error when retrieving user, error: ${error.message}`);
    }
});
exports.getUser = getUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'UPDATE users SET email=($1), username=($2), firstname=($3), lastname=($4), password=($5) WHERE id=($6) RETURNING *';
        const result = yield connection.query(sql, [
            user.email,
            user.userName,
            user.firstName,
            user.lastName,
            hashPassword(user.password),
            id,
        ]);
        connection.release();
        return yield result.rows[0];
    }
    catch (error) {
        throw new Error(`Error when updating user: ${error.message}`);
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield database_1.default.connect();
        const sql = 'DELETE FROM users WHERE id=($1)';
        const result = connection.query(sql, [id]);
        connection.release();
        return (yield result).rows[0];
    }
    catch (error) {
        throw new Error(`Error when deleting user, error: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
