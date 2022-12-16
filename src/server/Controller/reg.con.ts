import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RegionService } from './../Services/reg.service';
@Controller('api/region')
export class RegControll {
  constructor(private regionService: RegionService) {}
  @Get()
  public async getAll() {
    return await this.regionService.findAll();
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return await this.regionService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async create(@UploadedFiles() file: any, @Body() fields: any) {
    return this.regionService.create(file, fields);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'foto' }, { name: 'file' }]))
  public async update(
    @Param('id') id: number,
    @UploadedFiles() file: any,
    @Body() fields: any,
  ) {
    return this.regionService.update(id, file, fields);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return this.regionService.delete(id);
  }
}
