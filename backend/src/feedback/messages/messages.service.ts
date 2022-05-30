import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: EntityRepository<Message>,
  ) {}

  async createMessage(dto) {
    const message = this.messageRepository.create(dto);
    await this.messageRepository.persistAndFlush(message);
    return message;
  }

  async getMessage(messageId: number) {
    return await this.messageRepository.findOne(messageId);
  }

  async getMessages() {
    return await this.messageRepository.findAll();
  }

  async updateMessage(messageId: number, dto) {
    const message = await this.messageRepository.findOne(messageId);
    message.assign(dto);
    await this.messageRepository.flush();
    return message;
  }

  async deleteMessage(messageId: number) {
    await this.messageRepository.nativeDelete(messageId);
  }
}
