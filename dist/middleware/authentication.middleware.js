"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !token) {
                return res.status(401).json({ message: 'token is missing', code: 401, error: 'user not authenticated', data: null });
            }
            if (bearer === 'Bearer' && token) {
                jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (error) => {
                    if (error)
                        return res.status(403).json({ message: 'token is invalid', code: 403, error: 'user not authenticated', data: null });
                    next();
                });
            }
        }
    }
    catch (error) {
        throw new Error('Error when authenticating user error: ' + error.message);
    }
};
exports.authenticateToken = authenticateToken;
