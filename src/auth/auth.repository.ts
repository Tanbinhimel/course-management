import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';

export class AuthRepository {
  constructor(private dataSource: DataSource) {}

  async findUserWhere(where: object): Promise<User> {
    return await this.dataSource.getRepository(User).findOneBy(where);
  }

  async createNewUser(user: User): Promise<User> {
    return await this.dataSource.getRepository(User).save(user);
  }
}
