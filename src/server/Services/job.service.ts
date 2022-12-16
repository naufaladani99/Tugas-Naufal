import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jobs } from '../../entities/Jobs';

@Injectable()
export class jobService {
  constructor(
    @InjectRepository(Jobs)
    private jobRepository: Repository<Jobs>,
  ) {}
  public async findAll() {
    return await this.jobRepository.find();
  }

  public async findOne(id) {
    const job = await this.jobRepository.findOne({
      where: { jobId: id },
    });
    if (!job) throw new NotFoundException(`Job with id: '${id}' not found`);
    return job;
  }

  public async create(
    jobId: string,
    jobTitle: string,
    minSalary: string,
    maxSalary: string,
  ) {
    const create_job = await this.jobRepository.create({
      jobId,
      jobTitle,
      minSalary,
      maxSalary,
    });
    return await this.jobRepository.save(create_job);
  }

  public async update(
    jobId: string,
    jobTitle: string,
    minSalary: string,
    maxSalary: string,
  ) {
    return await this.jobRepository.update(jobId, {
      jobId,
      jobTitle,
      minSalary,
      maxSalary,
    });
  }

  async delete(id: string) {
    try {
      const job = await this.jobRepository.delete(id);
      return 'Delete ' + job.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
