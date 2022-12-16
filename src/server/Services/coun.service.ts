import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from '../../entities/Countries';
import { Regions } from '../../entities/Regions';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Countries)
    private CountryRepository: Repository<Countries>,
    @InjectRepository(Regions) private regionRepository: Repository<Regions>,
  ) {}

  async getAll(): Promise<Countries[]> {
    const countries = await this.CountryRepository.find({
      relations: ['region'],
      select: { region: { regionId: true } },
    });
    return countries;
  }

  async getById(id: string): Promise<Countries> {
    try {
      return await this.CountryRepository.findOneOrFail({
        relations: ['region'],
        select: { region: { regionId: true } },
        where: { countryId: id },
      });
    } catch (error) {
      return error;
    }
  }

  async createCountry(
    countryId: string,
    countryName: string,
    regionId: number,
  ) {
    const create_country = await this.CountryRepository.create({
      countryId,
      countryName,
      region: { regionId },
    });
    return await this.CountryRepository.save(create_country);
  }

  async updateCountry(
    countryId: string,
    countryName: string,
    regionId: number,
  ) {
    return await this.CountryRepository.update(countryId, {
      countryName,
      region: { regionId },
    });
  }
  async delete(countryId: string) {
    const delete_country = await this.getById(countryId);
    return await this.CountryRepository.remove(delete_country);
  }
}
