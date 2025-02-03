import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//? Entity
import { User } from 'src/db/entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    //? Technique: advanced
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ firstname: username });
  }
}
