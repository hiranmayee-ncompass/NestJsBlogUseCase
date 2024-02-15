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

    // Create a new user
    const newUser = this.userRepository.create({
      username,
      password,
    });

    // Save the new user to the database
    this.userRepository.save(newUser);
    return createUserDto;
  }

  async findByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    // Using a case-insensitive query for the username
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
      // Generate a JWT token

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

  //   update(id: number, updateUserDto: UpdateUserDto) {
  //     return this.userRepository.update(id, updateUserDto);
  //   }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
