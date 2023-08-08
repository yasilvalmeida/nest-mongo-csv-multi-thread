import { Global, Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightSchema } from './schema/flight.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:pass@localhost:27017/flight?serverSelectionTimeoutMS=2000&authSource=admin',
    ),
    MongooseModule.forFeature([{ name: 'Flight', schema: FlightSchema }]),
  ],
  providers: [FlightService],
  controllers: [FlightController],
  exports: [FlightService],
})
export class FlightModule {}
