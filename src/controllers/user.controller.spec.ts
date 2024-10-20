import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let userController: UserController;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const result: User[] = [{ id: 1, name: 'John', password: 'pass' }];
      jest.spyOn(userRepository, 'find').mockResolvedValue(result);

      expect(await userController.findAllUsers()).toBe(result);
    });
  });

  describe('findUserById', () => {
    it('should return a single user', async () => {
      const result: User = { id: 1, name: 'John', password: 'pass' };
      jest.spyOn(userRepository, 'findOneById').mockResolvedValue(result);

      expect(await userController.findUserById(1)).toBe(result);
    });
  });

  describe('createUser', () => {
    it('should create and return the user', async () => {
      const newUser: User = { id: 1, name: 'Jane', password: 'secret' };
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      expect(await userController.createUser(newUser)).toBe(newUser);
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated user', async () => {
      const updatedUser: User = { id: 1, name: 'Jane', password: 'newpass' };
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findOneById').mockResolvedValue(updatedUser);

      expect(await userController.updateUser(1, updatedUser)).toBe(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return void', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

      expect(await userController.deleteUser(1)).toBeUndefined();
    });
  });
});
