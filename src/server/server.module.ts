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
import { TasksService } from './Services/reg.srv';

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions, Countries, Users]),
    MulterModule.register(ConfigMulter.UploadFiles()),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [UsersService, TasksService, LocalStrategy, JwtStrategy],
  controllers: [RegControll, UserController],
  exports: [UsersService],
})
export class ServerModule {}
