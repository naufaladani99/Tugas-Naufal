import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcrypt';
import { Users } from '../../entities/Users';
import { Repository } from 'typeorm';

const saltOrRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: string, pass: string) {
    const user = await this.usersRepo.findOne({
      where: [{ userName: username }, { userEmail: username }],
    });
    const compare = await Bcrypt.compare(pass, user.userPassword);
    if (compare) {
      const { userPassword, ...result } = user;
      return result;
    }
  }

  public async login(user: any) {
    const payload = {
      username: user.userName,
      sub: user.userId,
      email: user.userEmail,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async signup(fields) {
    try {
      let hashpassword = fields.password;
      hashpassword = await Bcrypt.hash(hashpassword, saltOrRounds);
      const user = await this.usersRepo.save({
        userName: fields.username,
        userPassword: hashpassword,
        userEmail: fields.email,
      });
      const { userPassword, ...result } = user;
      return result;
    } catch (error) {
      return error.message;
    }
  }
}
