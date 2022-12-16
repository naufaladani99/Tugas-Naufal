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
import { jobHistoryService } from '../Services/jobHis.service';

@Controller('api/jobHistory/')
@Injectable()
export class jobHisControll {
  constructor(private jobHistoryService: jobHistoryService) {}

  @Get()
  public async GetAll() {
    return this.jobHistoryService.findAll();
  }

  @Get(':id')
  public async GetOne(@Param('id') id: number) {
    return this.jobHistoryService.findOne(id);
  }

  @Post()
  public async Create(@Body() fields: any) {
    const employeeId = fields.employeeId;
    const startDate = fields.startDate;
    const endDate = fields.endDate;
    const jobId = fields.jobId;
    const departmentId = fields.departmentId;
    return this.jobHistoryService.create(
      employeeId,
      startDate,
      endDate,
      jobId,
      departmentId,
    );
  }

  // @Put(':employeeId/:startDate')
  // public async Updated(
  //   @Body() fields: any,
  //   @Param('employeeId') employeeId: number,
  //   @Param('startDate') startDate: any,
  // ) {
  //   startDate = fields.startDate;
  //   const endDate = fields.endDate;
  //   const jobId = fields.jobId;
  //   const departmentId = fields.departmentId;
  //   return this.jobHistoryService.update(
  //     employeeId,
  //     startDate,
  //     endDate,
  //     jobId,
  //     departmentId,
  //   );
  // }
  @Put(':employeeId/:startDate')
  public async Updated(
    @Body() fields: any,
    @Param('employeeId') employeeId: number,
    @Param('startDate') startDate: any,
  ) {
    const newEmployeeId = fields.employeeId;
    const newStartDate = fields.startDate;
    const endDate = fields.endDate;
    const jobId = fields.jobId;
    const departmentId = fields.departmentId;
    return this.jobHistoryService.update(
      employeeId,
      startDate,
      newEmployeeId,
      newStartDate,
      endDate,
      jobId,
      departmentId,
    );
  }

  @Delete('deleteJohis')
  public async Deleted(@Body() fields: any) {
    return this.jobHistoryService.delete(fields.employeeId, fields.startDate);
  }
}
