import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      return 'User already exists!';
    }
    const newUser = this.userRepository.create({
      username,
      password,
    });
    this.userRepository.save(newUser);
    return createUserDto;
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.username) = LOWER(:username)', { username })
      .andWhere('user.password = :password', { password })
      .getOne();

    return user || null;
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.findByUsernameAndPassword(username, password);

    if (user) {
      const token = this.jwtService.sign({ sub: user.userid });
      return token;
    }

    return null;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(userName: string) {
    return this.userRepository.findOneBy({ username: userName });
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
