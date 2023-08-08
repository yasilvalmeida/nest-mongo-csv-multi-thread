import { Document } from 'mongoose';

export interface IFlight extends Document {
  readonly flight_number: number;
  readonly departure_airport: string;
  readonly arrival_airport: string;
  readonly departure_date: string;
  readonly arrival_date: string;
  readonly departure_time: string;
  readonly arrival_time: string;
  readonly airline: string;
  readonly passenger_count: number;
  readonly flight_duration: number;
}
