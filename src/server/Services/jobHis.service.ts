import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobHistory } from '../../entities/JobHistory';

@Injectable()
export class jobHistoryService {
  constructor(
    @InjectRepository(JobHistory)
    private jobHistoryRepository: Repository<JobHistory>,
  ) {}
  public async findAll() {
    return await this.jobHistoryRepository.find({
      relations: ['job', 'department'],
      select: { job: { jobId: true }, department: { departmentId: true } },
    });
  }

  public async findOne(id: number): Promise<JobHistory> {
    try {
      const jobhisFind = await this.jobHistoryRepository.findOne({
        relations: ['job', 'department'],
        select: { job: { jobId: true }, department: { departmentId: true } },
        where: { employeeId: id },
      });
      if (!jobhisFind)
        throw new NotFoundException(`Job History with id: '${id}' not found`);
      return jobhisFind;
    } catch (error) {
      return error;
    }
  }

  public async create(
    employeeId: number,
    startDate: string,
    endDate: string,
    jobId: string,
    departmentId: number,
  ) {
    const create_jobHistory = await this.jobHistoryRepository.create({
      employeeId,
      startDate,
      endDate,
      job: { jobId },
      department: { departmentId },
    });
    return await this.jobHistoryRepository.save(create_jobHistory);
  }

  // public async update(
  //   employeeId: number,
  //   startDate: string,
  //   endDate: string,
  //   jobId: string,
  //   departmentId: number,
  // ) {
  //   return await this.jobHistoryRepository.update(
  //     { employeeId, startDate },
  //     {
  //       employeeId,
  //       startDate,
  //       endDate,
  //       job: { jobId },
  //       department: { departmentId },
  //     },
  //   );
  // }

  async update(
    employeeId: number,
    startDate: string,
    newEmployeeId: string,
    newStartDate: any,
    endDate: string,
    jobId: string,
    departmentId: number,
  ) {
    return await this.jobHistoryRepository
      .createQueryBuilder()
      .update()
      .set({
        employeeId: employeeId,
        startDate: newStartDate,
        endDate: endDate,
        job: { jobId },
        department: { departmentId },
      })
      .where('employeeId = :id', { id: employeeId })
      .andWhere('startDate = :idd', { idd: startDate })
      .execute();
  }

  // public async delete(id: number) {
  //   try {
  //     const jobHistory = await this.jobHistoryRepository.delete(id);
  //     return 'Delete' + jobHistory.affected + 'rows';
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
  async delete(employeeId, startDate) {
    return await this.jobHistoryRepository
      .createQueryBuilder()
      .delete()
      .where('employeeId = :id', { id: employeeId })
      .andWhere('startDate = :idd', { idd: startDate })
      .execute();
  }
}
