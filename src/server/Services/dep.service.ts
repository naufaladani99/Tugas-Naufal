import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departments } from '../../entities/Departments';

@Injectable()
export class departmentService {
  constructor(
    @InjectRepository(Departments)
    private departmentRepository: Repository<Departments>,
  ) {}
  public async findAll() {
    return await this.departmentRepository.find({
      relations: ['manager', 'location'],
      select: { manager: { employeeId: true }, location: { locationId: true } },
    });
  }

  public async findOne(id: number): Promise<Departments> {
    try {
      return await this.departmentRepository.findOne({
        relations: ['manager', 'location'],
        select: {
          manager: { employeeId: true },
          location: { locationId: true },
        },
        where: { departmentId: id },
      });
    } catch (error) {
      return error;
    }
  }

  // public async findOne(id: number): Promise<Departments> {
  //   try {
  //     return await this.departmentRepository.findOne({
  //       relations: ['manager', 'location'],
  //       select: {
  //         manager: { employeeId: true },
  //         location: { locationId: true },
  //       },
  //       where: { departmentId: id },
  //     });
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public async create(
    departmentName: string,
    employeeId: number,
    locationId: number,
  ) {
    const create_department = await this.departmentRepository.create({
      departmentName,
      manager: { employeeId },
      location: { locationId },
    });
    return await this.departmentRepository.save(create_department);
  }

  public async update(
    id: number,
    departmentName: string,
    employeeId: number,
    locationId: number,
  ) {
    return await this.departmentRepository.update(id, {
      departmentName,
      manager: { employeeId },
      location: { locationId },
    });
  }

  async delete(departmentId: number) {
    try {
      // const department = await this.delete(departmentId);
      return await this.departmentRepository.delete(departmentId);
    } catch (error) {
      return error.message;
    }
  }
}
