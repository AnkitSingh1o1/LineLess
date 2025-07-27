"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = require("./controllers/registerController");
const router = (0, express_1.Router)();
const registerController = new registerController_1.RegisterController();
//Register
router.post('/register', (req, res) => registerController.register(req, res));
//Health check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});
exports.default = router;
