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
import { departmentService } from '../Services/dep.service';

@Controller('api/department/')
@Injectable()
export class DepControll {
  constructor(private departmentService: departmentService) {}

  @Get()
  public async GetAll() {
    return this.departmentService.findAll();
  }

  @Get(':departmentId')
  public async GetOne(@Param('departmentId') id: number) {
    return this.departmentService.findOne(id);
  }

  @Post()
  public async Create(@Body() fields: any) {
    const departmentName = fields.departmentName;
    const managerId = fields.managerId;
    const locationId = fields.locationId;
    return this.departmentService.create(departmentName, managerId, locationId);
  }

  @Put(':id')
  public async Updated(@Body() fields: any, @Param('id') id: number) {
    const departmentName = fields.departmentName;
    const managerId = fields.managerId;
    const locationId = fields.locationId;
    return this.departmentService.update(
      id,
      departmentName,
      managerId,
      locationId,
    );
  }

  @Delete(':departmentId')
  public async Deleted(@Param('departmentId') departmentId: number) {
    return this.departmentService.delete(departmentId);
  }
}
