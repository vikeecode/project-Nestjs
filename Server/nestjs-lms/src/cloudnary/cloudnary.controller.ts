import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { CloudnaryService } from './cloudnary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudnary')
export class CloudnaryController {
    constructor(
        readonly cloudnaryService: CloudnaryService) {}

          @Post('upload-small')
          @UseInterceptors( FileInterceptor('file',{
            limits: {
                fileSize :20 * 1024 *1024
            },
          }))
        async uploadSmallFile(){
            const result = await this.cloudnaryService.uploadSmallFile();
            return result;
        }
}
