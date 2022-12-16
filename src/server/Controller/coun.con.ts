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
import { CountryService } from '../Services/coun.service';

@Controller('api/country/')
@Injectable()
export class CounControll {
  constructor(private CountryService: CountryService) {}

  @Get()
  public async GetAll() {
    return this.CountryService.getAll();
  }

  @Get(':id')
  public async GetOne(@Param('id') id: string) {
    id = id.toUpperCase();
    return this.CountryService.getById(id);
  }

  @Post()
  public async Create(@Body() fields: any) {
    const countryId = fields.countryId;
    const countryName = fields.countryName;
    const regionId = fields.regionId;
    return this.CountryService.createCountry(countryId, countryName, regionId);
  }

  @Put(':id')
  public async Updated(@Body() fields: any, @Param('id') countryId: string) {
    countryId = countryId.toUpperCase();
    const countryName = fields.countryName;
    const regionId = fields.regionId;
    return this.CountryService.updateCountry(countryId, countryName, regionId);
  }

  @Delete(':id')
  public async Deleted(@Param('id') countryId: string) {
    return this.CountryService.delete(countryId);
  }
}
