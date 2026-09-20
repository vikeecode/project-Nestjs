import { Module } from '@nestjs/common';
import { CloudnaryService } from './cloudnary.service';
import { CloudnaryController } from './cloudnary.controller';

@Module({
    providers: [CloudnaryService],
    exports: [CloudnaryService],
    controllers: [CloudnaryController],
})
export class CloudnaryModule {}
