import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SynchronizationService } from './synchronization.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('synchronization')
export class SynchronizationController {
  constructor(private synchronizationService: SynchronizationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  synchronization(@UploadedFile() file: Express.Multer.File) {
    return this.synchronizationService.synchByFile(file);
  }
}
