import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller';

import { User } from './entities/user.entity';

@Module({

imports: [

TypeOrmModule.forRoot({

type: 'postgres',

host: 'localhost',

port: 5432,

username: 'postgres',

password: 'admin',

database: 'crud',

entities: [User],

synchronize: true,

}),

TypeOrmModule.forFeature ([User]),

],

controllers: [UserController],

})

export class AppModule {}