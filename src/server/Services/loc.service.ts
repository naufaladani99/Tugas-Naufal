import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locations } from '../../entities/Locations';

@Injectable()
export class locationService {
  constructor(
    @InjectRepository(Locations)
    private locationRepository: Repository<Locations>,
  ) {}
  public async findAll() {
    return await this.locationRepository.find({
      relations: ['country'],
      select: { country: { countryId: true } },
    });
  }

  public async findOne(id: any) {
    return await this.locationRepository.findOne({
      relations: ['country'],
      select: { country: { countryId: true } },
      where: { locationId: id },
    });
  }

  public async create(
    streetAddress: string,
    postalCode: string,
    city: string,
    stateProvince: string,
    countryId: string,
  ) {
    const createLocations = await this.locationRepository.create({
      streetAddress,
      postalCode,
      city,
      stateProvince,
      country: { countryId },
    });
    return await this.locationRepository.save(createLocations);
  }

  public async update(
    locationId: string,
    streetAddress: string,
    postalCode: string,
    city: string,
    stateProvince: string,
    countryId: string,
  ) {
    return await this.locationRepository.update(locationId, {
      streetAddress,
      postalCode,
      city,
      stateProvince,
      country: { countryId },
    });
  }

  async delete(id: string) {
    try {
      const location = await this.locationRepository.delete(id);
      return 'Delete' + location.affected + 'rows';
    } catch (error) {
      return error.message;
    }
  }
}
