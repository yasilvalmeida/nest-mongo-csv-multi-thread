import { Global, Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { BullModule } from '@nestjs/bull';
import { CsvProcessor } from './csv.processor';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'csv-queue',
    }),
  ],
  providers: [CsvService, CsvProcessor],
  exports: [CsvService],
})
export class CsvModule {}
