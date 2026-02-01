import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private db: DatabaseService) {}

  async getAll(userId: number) {
    return await this.db.bookmark.findMany({
      where: { userId },
    });
  }

  async getById(userId: number, bookmarkId: number) {
    return await this.db.bookmark.findUnique({
      where: { id: bookmarkId, userId },
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

  async update(userId: number, bookmarkId: number, body: UpdateBookmarkDto) {
    return await this.db.bookmark.update({
      where: { id: bookmarkId, userId },
      data: body,
    });
  }

  async delete(userId: number, bookmarkId: number) {
    return await this.db.bookmark.delete({
      where: { id: bookmarkId, userId },
    });
  }
}
