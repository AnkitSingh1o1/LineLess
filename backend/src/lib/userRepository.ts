import { User } from '../types/authTypes';
import Redis from 'ioredis';

export class UserRepository {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    });
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    const userByUsername = await this.redis.get(`user:username:${username}`);
    if(userByUsername){
      return JSON.parse(userByUsername);
    }

    //Check by email
    const userByEmail = await this.redis.get(`user:email:${email}`);
    if(userByEmail){
      return JSON.parse(userByEmail);
    }

    return null;
  }

  async save(user: User): Promise<void> {
    const userData = JSON.stringify(user);
    await Promise.all([
      this.redis.set(`user:username:${user.username}`, userData),
      this.redis.set(`user:email:${user.email}`, userData),
      this.redis.set(`user:id:${user.id}`, userData)
    ]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.redis.get(`user:email:${email}`);
    return userData ? JSON.parse(userData) : null;
  }

  async disconnect(): Promise<void>{
    await this.redis.quit();
  }
}