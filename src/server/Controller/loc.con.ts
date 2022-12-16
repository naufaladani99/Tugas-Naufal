import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { locationService } from '../Services/loc.service';

@Controller('api/location/')
@Injectable()
export class locControll {
  constructor(private locationService: locationService) {}

  @Get()
  public async GetAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  public async GetOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Post()
  public async Create(@Body() fields: any) {
    const streetAddress = fields.streetAddress;
    const postalCode = fields.postalCode;
    const city = fields.city;
    const stateProvince = fields.stateProvince;
    const country = fields.country;
    return this.locationService.create(
      streetAddress,
      postalCode,
      city,
      stateProvince,
      country,
    );
  }

  @Put(':id')
  public async Updated(@Body() fields: any, @Param('id') locationId: string) {
    const streetAddress = fields.streetAddress;
    const postalCode = fields.postalCode;
    const city = fields.city;
    const stateProvince = fields.stateProvince;
    const country = fields.country;
    return this.locationService.update(
      locationId,
      streetAddress,
      postalCode,
      city,
      stateProvince,
      country,
    );
  }

  @Delete(':id')
  public async Deleted(@Param('id') locationId: string) {
    return this.locationService.delete(locationId);
  }
}
