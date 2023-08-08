import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { FlightService } from 'src/flight/flight.service';
import { IFlight } from 'src/flight/interface/fight.interface';

@Processor('csv-queue')
export class CsvProcessor {
  constructor(private readonly flightService: FlightService) {}

  private readonly logger = new Logger(CsvProcessor.name);

  @Process('csv-job')
  async process(job: Job): Promise<void> {
    this.logger.debug('Start Saving...');
    const chunk: IFlight[] = job.data.chunk;
    chunk?.map((flight: IFlight) => {
      this.flightService.createFlight(flight);
      this.logger.debug('Store', flight);
    });
    this.logger.debug('Saving completed');
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
