import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from '../../entities/Employees';

@Injectable()
export class empService {
  constructor(
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}
  public async findAll() {
    return await this.employeeRepository.find({
      relations: ['manager', 'department', 'job'],
      select: {
        manager: { employeeId: true },
        department: { departmentId: true },
        job: { jobId: true },
      },
    });
  }

  public async findOne(id: number) {
    const employeeOne = await this.employeeRepository.findOne({
      where: { employeeId: id },
    });
    if (!employeeOne)
      throw new NotFoundException(`Employee with id: '${id}' not found`);
  }

  // public async create(
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   phoneNumber: string,
  //   hireDate: string,
  //   jobId: string,
  //   salary: string,
  //   commissionPct: string,
  //   employeeId: number,
  //   departmentId: number,
  //   xempId: number,
  // ) {
  //   try {
  //     const create_department = await this.employeeRepository.save({
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNumber,
  //       hireDate,
  //       job: { jobId },
  //       salary,
  //       commissionPct,
  //       manager: { employeeId },
  //       department: { departmentId },
  //       xempId,
  //     });
  //     return await this.employeeRepository.save(create_department);
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  public async create(fields) {
    try {
      const createEmployee = await this.employeeRepository.save({
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        hireDate: fields.hireDate,
        jobId: fields.jobId,
        salary: fields.salary,
        commissionPct: fields.commissionPct,
        managerId: fields.managerId,
        departmentId: fields.departmentId,
        xempId: fields.xempId,
      });
      return createEmployee;
    } catch (error) {
      return error.message;
    }
  }

  // public async update(
  //   id: number,
  //   firstName: string,
  //   lastName: string,
  //   email: string,
  //   phoneNumber: string,
  //   hireDate: string,
  //   salary: string,
  //   commissionPct: string,
  //   employeeId: number,
  //   departmentId: number,
  //   xempId: number,
  // ) {
  //   return await this.employeeRepository.update(id, {
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //     hireDate,
  //     salary,
  //     commissionPct,
  //     manager: { employeeId },
  //     department: { departmentId },
  //     xempId,
  //   });
  // }

  public async update(id, fields) {
    try {
      const result = await this.employeeRepository.update(id, {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        phoneNumber: fields.phoneNumber,
        hireDate: fields.hireDate,
        salary: fields.salary,
      });
      if (result.affected === 0)
        throw new NotFoundException(`Employee with id: '${id}' not found`);
      const employee = this.findOne(id);
      return employee;
    } catch (error) {
      return error.message;
    }
  }

  async delete(id) {
    try {
      const result = await this.employeeRepository.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Employee with id: '${id}' not found`);
      return 'Delete ' + result.affected + ' rows';
    } catch (error) {
      return error.message;
    }
  }
}
