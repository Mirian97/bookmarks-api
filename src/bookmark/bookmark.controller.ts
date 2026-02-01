import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get()
  getAll(@GetUser('id') userId: number) {
    return this.bookmarkService.getAll(userId);
  }

  @Get(':id')
  getById(@GetUser('id') userId: number, @Param('id') bookmarkId: string) {
    return this.bookmarkService.getById(userId, +bookmarkId);
  }

  @Post()
  create(@GetUser('id') userId: number, @Body() body: CreateBookmarkDto) {
    return this.bookmarkService.create(userId, body);
  }

  @Patch(':id')
  update(
    @GetUser('id') userId: number,
    @Param('id') bookmarkId: string,
    @Body() body: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(userId, +bookmarkId, body);
  }

  @Delete(':id')
  delete(@GetUser('id') userId: number, @Param('id') bookmarkId: string) {
    return this.bookmarkService.delete(userId, +bookmarkId);
  }
}
