import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { RequestFileDto } from 'src/shared/dto/file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MessageDtoResponse } from 'src/shared/dto/message.dto';
import { ErrorDtoResponse } from 'src/shared/dto/error.dto';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { diskStorage } from 'multer';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post('/upload')
  @ApiBody({
    type: RequestFileDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: './src/assets',
        filename: (req, file, cb) => cb(null, `upload.csv`),
      }),
    }),
  )
  async uploadCsvFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    attachment,
  ): Promise<MessageDtoResponse | ErrorDtoResponse> {
    return this.flightService.createJobs();
  }

  @Post()
  async createFlight(
    @Res() response,
    @Body() createFlightDto: CreateFlightDto,
  ) {
    try {
      const newFlight = await this.flightService.createFlight(createFlightDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Flight has been created successfully',
        newFlight,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Flight not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateFlight(
    @Res() response,
    @Param('id') flightId: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    try {
      const existingFlight = await this.flightService.updateFlight(
        flightId,
        updateFlightDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Flight has been successfully updated',
        existingFlight,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getFlights(@Res() response) {
    try {
      const flightData = await this.flightService.getAllFlights();
      return response.status(HttpStatus.OK).json({
        message: 'All flights data found successfully',
        flightData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getFlight(@Res() response, @Param('id') flightId: string) {
    try {
      const existingFlight = await this.flightService.getFlight(flightId);
      return response.status(HttpStatus.OK).json({
        message: 'Flight found successfully',
        existingFlight,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteFlight(@Res() response, @Param('id') flightId: string) {
    try {
      const deletedFlight = await this.flightService.deleteFlight(flightId);
      return response.status(HttpStatus.OK).json({
        message: 'Flight deleted successfully',
        deletedFlight,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
