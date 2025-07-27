"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const registerService_1 = require("../services/registerService");
class RegisterController {
    constructor() {
        this.registerService = new registerService_1.RegisterService();
    }
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }
            const result = await this.registerService.register({ username, email, password });
            res.status(201).json({
                message: 'User registered successfully',
                token: result.token
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.RegisterController = RegisterController;
