import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async updateUser(userId: number, body: UpdateUserDto) {
    const updateUser = await this.db.user.update({
      where: {
        id: userId,
      },
      data: { ...body },
      omit: {
        hash: true,
      },
    });
    return updateUser;
  }
}
