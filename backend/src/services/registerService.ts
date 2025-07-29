import jwt from 'jsonwebtoken';
import { User, RegisterRequest, LoginRequest } from '../types/authTypes';
import { UserRepository } from '../lib/userRepository';
import bcrypt from 'bcrypt';

export class RegisterService {
  private userRepository: UserRepository;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(data: RegisterRequest): Promise<{ token: string }> {
    const { username, email, password } = data;

    // Check if user already exists
    const existingUser = await this.userRepository.findByUsernameOrEmail(username, email);
    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    // Save user
    await this.userRepository.save(user);

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      this.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token };
  }

  async login(data: LoginRequest): Promise<{ token: string }> {
    const { email, password } = data;

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      this.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { token };
  }
}