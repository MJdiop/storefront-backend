"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Pool({
    host: process.env.HOST,
    database: process.env.NODE_ENV === 'dev' ? process.env.POSTGRES_DB : process.env.POSTGRES_DB_TEST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10),
});
client.on('error', (error) => {
    console.error('Unexpected error on idle client', error);
    process.exit(-1);
});
exports.default = client;
