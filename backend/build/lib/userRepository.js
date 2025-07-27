"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class UserRepository {
    constructor() {
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
            password: process.env.REDIS_PASSWORD,
        });
    }
    async findByUsernameOrEmail(username, email) {
        const userByUsername = await this.redis.get(`user:username:${username}`);
        if (userByUsername) {
            return JSON.parse(userByUsername);
        }
        //Check by email
        const userByEmail = await this.redis.get(`user:email:${email}`);
        if (userByEmail) {
            return JSON.parse(userByEmail);
        }
        return null;
    }
    async save(user) {
        const userData = JSON.stringify(user);
        await Promise.all([
            this.redis.set(`user:username:${user.username}`, userData),
            this.redis.set(`user:email:${user.email}`, userData),
            this.redis.set(`user:id:${user.id}`, userData)
        ]);
    }
    async disconnect() {
        await this.redis.quit();
    }
}
exports.UserRepository = UserRepository;
