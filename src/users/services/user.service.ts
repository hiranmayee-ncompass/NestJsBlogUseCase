import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

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
    const hashedPassword = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');

    const newUser = this.userRepository.create({
      username,

      password: hashedPassword,
    });

    this.userRepository.save(newUser);
    return createUserDto;
  }


  private getUserWithRelations(userId: number): SelectQueryBuilder<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.userid = :userId', { userId });
  }

  async changeUserRole(
    req,
    userIdToChange: number,
    newRoleId: number,
  ): Promise<string> {
    try {
      const loggedInUserId = req.user.userid
      const loggedInUser =
        await this.getUserWithRelations(loggedInUserId).getOne();

      if (loggedInUser && loggedInUser.role && loggedInUser.role.roleid === 1) {
        const userToChange =
          await this.getUserWithRelations(userIdToChange).getOne();

        if (userToChange) {          
          userToChange.role.roleid = newRoleId;
          userToChange.roleid = newRoleId;

          await this.userRepository.save(userToChange);
          return 'Role changed successfully';
        } else {
          throw new NotFoundException('User to change not found');
        }
      } else {
        throw new UnauthorizedException('Not authorized to change roles');
      }
    } catch (error) {
      throw error; // Rethrow the error for NestJS to handle
    }
  }

  async createSuperAdmin() {
    const existingSuperAdmin = await this.userRepository.findOne({
      where: { username: 'superadmin' },
    });

    if (!existingSuperAdmin) {
      const hashedPassword = crypto
        .createHash('md5')
        .update('superadmin_password')
        .digest('hex');
      const newSuperAdmin = this.userRepository.create({
        username: 'superadmin',
        password: hashedPassword,
        roleid: 1,
      });

      await this.userRepository.save(newSuperAdmin);
      return 'Superadmin created successfully';
    } else {
      return 'Superadmin already exists';
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(userName: string) {
    return this.userRepository.findOneBy({ username: userName });
  }
}
