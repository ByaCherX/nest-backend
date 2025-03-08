import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/db/entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(getAll: boolean): Promise<User[]> {
    if (getAll) {
      return this.usersRepository.find();
    }
    // Implement other logic if needed when getAll is false
    return Promise.resolve([]);
  }

  getUser(email: string, uuid: string): Promise<User> {
    return this.usersRepository.findOneBy({ email: email, uuid: uuid });
  }
}
