import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(@Body() dto) {
    return this.messagesService.createMessage(dto);
  }

  @Get(':id')
  getOne(@Param() id: number) {
    return this.messagesService.getMessage(id);
  }

  @Get()
  getAll() {
    return this.messagesService.getMessages();
  }

  @Patch(':id')
  update(@Param() id: number, @Body() dto) {
    return this.messagesService.updateMessage(id, dto);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.messagesService.deleteMessage(id);
  }
}
