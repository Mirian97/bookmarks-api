import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private db: DatabaseService) {}

  async getAll() {
    return await this.db.bookmark.findMany();
  }

  async getById(id: number) {
    return await this.db.bookmark.findUnique({
      where: { id },
    });
  }

  async create(userId: number, body: CreateBookmarkDto) {
    return await this.db.bookmark.create({
      data: {
        ...body,
        userId,
      },
    });
  }

  async update(id: number, body: UpdateBookmarkDto) {
    return await this.db.bookmark.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: number) {
    return await this.db.bookmark.delete({
      where: { id },
    });
  }
}
