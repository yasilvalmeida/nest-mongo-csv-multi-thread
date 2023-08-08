import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IFlight } from './interface/fight.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { MessageDtoResponse } from 'src/shared/dto/message.dto';
import { ErrorDtoResponse } from 'src/shared/dto/error.dto';
import { CsvService } from 'src/csv/csv.service';
import * as fs from 'fs';
import { parse } from 'csv-parse';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel('Flight') private flightModel: Model<IFlight>,
    private csvService: CsvService,
  ) {}

  async createFlight(createFlightDto: CreateFlightDto): Promise<IFlight> {
    let existingFlight = await this.flightModel.findOneAndUpdate(
      {
        flight_number: {
          $eq: createFlightDto.flight_number,
        },
        departure_airport: {
          $eq: createFlightDto.departure_airport,
        },
        arrival_airport: {
          $eq: createFlightDto.arrival_airport,
        },
        departure_date: {
          $eq: createFlightDto.departure_date,
        },
        arrival_date: {
          $eq: createFlightDto.arrival_date,
        },
        departure_time: {
          $eq: createFlightDto.departure_time,
        },
        arrival_time: {
          $eq: createFlightDto.arrival_time,
        },
        airline: {
          $eq: createFlightDto.airline,
        },
        passenger_count: {
          $eq: createFlightDto.passenger_count,
        },
        flight_duration: {
          $eq: createFlightDto.flight_duration,
        },
      },
      createFlightDto,
    );
    if (!existingFlight) {
      existingFlight = await new this.flightModel(createFlightDto).save();
    }

    return existingFlight;
  }

  async updateFlight(
    FlightId: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<IFlight> {
    const existingFlight = await this.flightModel.findByIdAndUpdate(
      FlightId,
      updateFlightDto,
      { new: true },
    );
    if (!existingFlight) {
      throw new NotFoundException(`Flight #${FlightId} not found`);
    }
    return existingFlight;
  }

  async getAllFlights(): Promise<IFlight[]> {
    const FlightData = await this.flightModel.find({});
    if (!FlightData || FlightData.length == 0) {
      throw new NotFoundException('Flight data not found!');
    }
    return FlightData;
  }

  async getFlight(FlightId: string): Promise<IFlight> {
    const existingFlight = await this.flightModel.findById(FlightId).exec();
    if (!existingFlight) {
      throw new NotFoundException(`Flight #${FlightId} not found`);
    }
    return existingFlight;
  }

  async deleteFlight(FlightId: string): Promise<IFlight> {
    const deletedFlight = await this.flightModel.findByIdAndDelete(FlightId);
    if (!deletedFlight) {
      throw new NotFoundException(`Flight #${FlightId} not found`);
    }
    return deletedFlight;
  }

  async createJobs(): Promise<MessageDtoResponse | ErrorDtoResponse> {
    try {
      const filePath = 'src/assets/upload.csv';
      const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
      const headers = [
        'flight_number',
        'departure_airport',
        'arrival_airport',
        'departure_date',
        'arrival_date',
        'departure_time',
        'arrival_time',
        'airline',
        'passenger_count',
        'flight_duration',
      ];
      parse(
        fileContent,
        {
          delimiter: ',',
          columns: headers,
        },
        (error, results: IFlight[]) => {
          if (error) {
            console.error(error.message);
            return {
              statusCode: 500,
              payload: error.message,
              message: 'Upload file fails',
            };
          }
          results.shift();
          const chunkSize = 50;
          for (let i = 0; i < results.length; i += chunkSize) {
            const chunk = results.slice(i, i + chunkSize);
            this.csvService.addJob(chunk);
          }
        },
      );
    } catch (error) {
      return {
        statusCode: 500,
        payload: error,
        message: 'Upload file fails',
      };
    }
  }
}
