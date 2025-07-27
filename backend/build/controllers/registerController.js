"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const registerService_1 = require("../services/registerService");
class RegisterController {
    constructor() {
        this.registerService = new registerService_1.RegisterService();
    }
    async register(req, res) {
        console.log(req.body);
        try {
            const { username, email, password } = req.body;
            console.log('Registering user:', { username, email, password });
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
