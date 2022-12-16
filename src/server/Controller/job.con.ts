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
import { jobService } from '../Services/job.service';

@Controller('api/job/')
@Injectable()
export class jobControll {
  constructor(private jobService: jobService) {}

  @Get()
  public async GetAll() {
    return this.jobService.findAll();
  }

  @Get(':id')
  public async GetOne(@Param('id') id: string) {
    return this.jobService.findOne(id);
  }

  @Post()
  public async Create(@Body() fields: any) {
    const jobId = fields.jobId;
    const jobTitle = fields.jobTitle;
    const minSalary = fields.minSalary;
    const maxSalary = fields.maxSalary;
    return this.jobService.create(jobId, jobTitle, minSalary, maxSalary);
  }

  @Put(':id')
  public async Updated(@Body() fields: any, @Param('id') jobId: string) {
    const jobTitle = fields.jobTitle;
    const minSalary = fields.minSalary;
    const maxSalary = fields.maxSalary;
    return this.jobService.update(jobId, jobTitle, minSalary, maxSalary);
  }

  @Delete(':id')
  public async Deleted(@Param('id') jobId: string) {
    return this.jobService.delete(jobId);
  }
}
