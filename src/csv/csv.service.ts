import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IFlight } from 'src/flight/interface/fight.interface';

@Injectable()
export class CsvService {
  constructor(@InjectQueue('csv-queue') private csvQueue: Queue) {}

  async addJob(chunk: IFlight[]) {
    const job = await this.csvQueue.add('csv-job', { chunk });
    console.log(`created job ${job.id}`);
  }
}
