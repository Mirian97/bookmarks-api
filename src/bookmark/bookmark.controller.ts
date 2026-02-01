import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  getAll() {
    return this.bookmarkService.getAll();
  }

  getById(@Param('id') id: string) {
    return this.bookmarkService.getById(+id);
  }

  create(@GetUser('id') userId: number, @Body() body: CreateBookmarkDto) {
    return this.bookmarkService.create(userId, body);
  }

  update(@Param('id') id: string, @Body() body: UpdateBookmarkDto) {
    return this.bookmarkService.update(+id, body);
  }

  delete(@Param('id') id: string) {
    return this.bookmarkService.delete(+id);
  }
}
