import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateFlightDto extends OmitType(CreateFlightDto, []) {}
