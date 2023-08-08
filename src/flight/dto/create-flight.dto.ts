import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFlightDto {
  @ApiProperty({
    description: 'Flight Number',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly flight_number: number;

  @ApiProperty({
    description: 'Departure Airport',
  })
  @IsString()
  @IsNotEmpty()
  readonly departure_airport: string;

  @ApiProperty({
    description: 'Arrival Airport',
  })
  @IsString()
  @IsNotEmpty()
  arrival_airport: string;

  @ApiProperty({
    description: 'Departure Date',
  })
  @IsString()
  @IsNotEmpty()
  departure_date: string;

  @ApiProperty({
    description: 'Arrival Date',
  })
  @IsString()
  @IsNotEmpty()
  arrival_date: string;

  @ApiProperty({
    description: 'Departure Time',
  })
  @IsString()
  @IsNotEmpty()
  departure_time: string;

  @ApiProperty({
    description: 'Arrival Time',
  })
  @IsString()
  @IsNotEmpty()
  arrival_time: string;

  @ApiProperty({
    description: 'Airline',
  })
  @IsString()
  @IsNotEmpty()
  airline: string;

  @ApiProperty({
    description: 'Passanger Count',
  })
  @IsNumber()
  @IsNotEmpty()
  passenger_count: number;

  @ApiProperty({
    description: 'Flight Duration',
  })
  @IsNumber()
  @IsNotEmpty()
  flight_duration: number;
}
