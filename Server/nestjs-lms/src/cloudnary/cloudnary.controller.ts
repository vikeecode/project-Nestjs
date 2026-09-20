import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudnaryService } from './cloudnary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudnary')
export class CloudnaryController {
    constructor(
        readonly cloudnaryService: CloudnaryService) {}
        //Small size file upload through that api is used for upload file in cloudnary
          @Post('upload-small')
          @UseInterceptors( FileInterceptor('file',{
            limits: {
                fileSize :20 * 1024 *1024
            },
          }))
        async uploadSmallFile(@Body("title") title: string,
         @UploadedFile() file: Express.Multer.File) {
            if(!file) {
                throw new Error('No file provided for upload');
            }
            const result = await this.cloudnaryService.uploadBufferFile(file);
            return {
                url: result.secure_url,
                title: title,
                message: 'File uploaded successfully',
            };
        }

        //Big File Like videos and any thing that higher then 20mb file upload through that api is used for upload file in cloudnary
}
