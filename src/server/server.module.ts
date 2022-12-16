import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from '../entities/Regions';
import { Countries } from '../entities/Countries';
import { MulterModule } from '@nestjs/platform-express';
import { RegControll } from './Controller/reg.con';
import { ConfigMulter } from './Middleware/multer.conf';
import { Users } from '../entities/Users';
import { UsersService } from './Services/usr.srv';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './Auth/local.strategy';
import { JwtStrategy } from './Auth/jwt.strategy';
import { UserController } from './Controller/usr.con';
import { RegionService } from './Services/reg.service';
import { CountryService } from './Services/coun.service';
import { CounControll } from './Controller/coun.con';
import { departmentService } from './Services/dep.service';
import { DepControll } from './Controller/dep.con';
import { Departments } from '../entities/Departments';
import { empService } from './Services/emp.service';
import { Employees } from '../entities/Employees';
import { EmpControll } from './Controller/emp.con';
import { jobHistoryService } from './Services/jobHis.service';
import { jobHisControll } from './Controller/jobHis.con';
import { JobHistory } from '../entities/JobHistory';
import { Jobs } from '../entities/Jobs';
import { jobService } from './Services/job.service';
import { jobControll } from './Controller/job.con';
import { Locations } from '../entities/Locations';
import { locationService } from './Services/loc.service';
import { locControll } from './Controller/loc.con';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Regions,
      Countries,
      Departments,
      Employees,
      Users,
      JobHistory,
      Jobs,
      Locations
    ]),
    MulterModule.register(ConfigMulter.UploadFiles()),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [
    UsersService,
    RegionService,
    departmentService,
    empService,
    LocalStrategy,
    JwtStrategy,
    CountryService,
    jobHistoryService,
    jobService,
    locationService
  ],
  controllers: [
    RegControll,
    CounControll,
    DepControll,
    EmpControll,
    UserController,
    jobHisControll,
    jobControll,
    locControll
  ],
  exports: [UsersService],
})
export class ServerModule {}
