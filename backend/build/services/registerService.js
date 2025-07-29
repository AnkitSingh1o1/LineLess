"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../lib/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        this.userRepository = new userRepository_1.UserRepository();
    }
    async register(data) {
        const { username, email, password } = data;
        // Check if user already exists
        const existingUser = await this.userRepository.findByUsernameOrEmail(username, email);
        if (existingUser) {
            throw new Error('Username or email already exists');
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // Create new user
        const user = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword,
            createdAt: new Date()
        };
        // Save user
        await this.userRepository.save(user);
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, this.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
    async login(data) {
        const { email, password } = data;
        // Find user by email
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        // Verify password
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, this.JWT_SECRET, { expiresIn: '1h' });
        return { token };
    }
}
exports.RegisterService = RegisterService;
