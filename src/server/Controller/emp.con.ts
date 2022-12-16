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
import { empService } from '../Services/emp.service';

@Controller('api/employee/')
@Injectable()
export class EmpControll {
  constructor(private empService: empService) {}

  @Get()
  public async GetAll() {
    return this.empService.findAll();
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    return this.empService.findOne(id);
  }

  // @Post()
  // public async Create(@Body() fields: any) {
  //   const firstName = fields.firstName;
  //   const lastName = fields.lastName;
  //   const email = fields.email;
  //   const phoneNumber = fields.phoneNumber;
  //   const hireDate = fields.hireDate;
  //   const jobId = fields.jobId;
  //   const salary = fields.salary;
  //   const commissionPct = fields.commissionPct;
  //   const managerId = fields.managerId;
  //   const departmentId = fields.departmentId;
  //   const xempId = fields.xempId;
  //   return this.empService.create(
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //     hireDate,
  //     jobId,
  //     salary,
  //     commissionPct,
  //     managerId,
  //     departmentId,
  //     xempId,
  //   );
  // }
  @Post()
  public async create(@Body() fields: any) {
    return this.empService.create(fields);
  }

  // @Put(':id')
  // public async Updated(@Body() fields: any, @Param('id') id: number) {
  //   const firstName = fields.firstName;
  //   const lastName = fields.lastName;
  //   const email = fields.email;
  //   const phoneNumber = fields.phoneNumber;
  //   const hireDate = fields.hireDate;
  //   const jobId = fields.jobId;
  //   const salary = fields.salary;
  //   const commissionPct = fields.commissionPct;
  //   const managerId = fields.managerId;
  //   const departmentId = fields.departmentId;
  //   return this.empService.update(
  //     id,
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //     hireDate,
  //     jobId,
  //     salary,
  //     commissionPct,
  //     managerId,
  //     departmentId,
  //   );
  // }
  @Put(':id')
  public async update(@Param('id') id: string, @Body() fields: any) {
    return this.empService.update(id, fields);
  }

  @Delete(':id')
  public async Deleted(@Param('id') id: number) {
    return this.empService.delete(id);
  }
}
