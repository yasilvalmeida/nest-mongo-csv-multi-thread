import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Flight {
  @Prop()
  flight_number: number;
  @Prop()
  departure_airport: string;
  @Prop()
  arrival_airport: string;
  @Prop()
  departure_date: string;
  @Prop()
  arrival_date: string;
  @Prop()
  departure_time: string;
  @Prop()
  arrival_time: string;
  @Prop()
  airline: string;
  @Prop()
  passenger_count: number;
  @Prop()
  flight_duration: number;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
