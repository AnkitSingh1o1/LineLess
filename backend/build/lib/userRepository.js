"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor() {
        this.users = [];
    }
    async findByUsernameOrEmail(username, email) {
        return this.users.find(user => user.username === username || user.email === email) || null;
    }
    async save(user) {
        this.users.push(user);
    }
}
exports.UserRepository = UserRepository;
