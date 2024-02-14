// // auth/user.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { CreateUserDto } from '../dto/user.dto';

// @Injectable()
// export class UserService {
//     constructor(
//         @InjectRepository(User)
//         private readonly userRepository: Repository<User>,
//     ) {}

//     async registerUser(createUserDto: CreateUserDto): Promise<User> {
//         const { username, password, roleId } = createUserDto;

//         try {
//             // Explicitly define options for findOneOrFail
//             const user = await this.userRepository.findOneOrFail({
//                 where: { role: { roleid: roleId } } as any, // Use 'role' here if it's a relation in User entity
//             });

//             // Rest of your code...

//             return user; // Return the user or modify the return value as needed
//         } catch (error) {
//             console.error(error);
//             throw new Error('Error registering user');
//         }
//     }
// }

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //   async create(createUserDto: CreateUserDto) {
  //     const { username, password, roleId} = createUserDto;
  //     const user1 = await this.userRepository.findOneBy({ username });
  //     // const user2 = await this.userRepository.findOneBy({ password });
  //     if (user1) {
  //       return 'already exists !';
  //     } else {
  //       return this.userRepository.save(createUserDto);
  //     }
  //   }

  async create(createUserDto: CreateUserDto) {
    const { username, password, roleId } = createUserDto;

    // Check if the user with the given username already exists
    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      return 'User already exists!';
    }

    // Create a new user
    const newUser = this.userRepository.create({
      username,
      password,
      role: { roleid: roleId }, // Set the roleId for the new user
    });

    // Save the new user to the database
    this.userRepository.save(newUser);
    return createUserDto
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ userid: id });
  }

  //   update(id: number, updateUserDto: UpdateUserDto) {
  //     return this.userRepository.update(id, updateUserDto);
  //   }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
