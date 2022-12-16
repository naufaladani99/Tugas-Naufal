import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regions } from '../../entities/Regions';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Regions) private regionRepository: Repository<Regions>,
  ) {}
  public async findAll() {
    return await this.regionRepository.find();
  }

  public async findOne(id) {
    const findRegion = await this.regionRepository.findOne({
      where: { regionId: id },
    });
    if (!findRegion)
      throw new NotFoundException(`Region with id: '${id}' not found`);
    return findRegion;
  }
  public async create(file, fields) {
    try {
      if (file) {
        const region = await this.regionRepository.save({
          regionName: fields.regionName,
          regionPhoto: file.file ? file.file[0].originalname : null,
          regionFile: file.foto ? file.foto[0].originalname : null,
        });
        return region;
      } else {
        const region = await this.regionRepository.save({
          regionName: fields.regionName,
          regionPhoto: null,
          regionFile: null,
        });
        return region;
      }
    } catch (error) {
      return error.message;
    }
  }

  public async update(id, file, fields) {
    try {
      if (file) {
        await this.regionRepository.update(id, {
          regionName: fields.regionName,
          regionPhoto: file.foto ? file.foto[0].originalname : null,
          regionFile: file.file ? file.file[0].originalname : null,
        });
        return await this.regionRepository.findOne({ where: { regionId: id } });
      } else {
        await this.regionRepository.update(id, {
          regionName: fields.regionName,
        });
      }
      return await this.regionRepository.findOne({ where: { regionId: id } });
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    try {
      const region = await this.regionRepository.delete(id);
      return 'Delete' + region.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
