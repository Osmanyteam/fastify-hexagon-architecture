import 'reflect-metadata';
import type UserEntity from '../entity/user.entity';

interface User {
    userExists(email: string): Promise<boolean>;
    createUser(user: UserEntity): Promise<UserEntity>;
    login(email: string, password: string): Promise<{accessToken:string, refreshToken: string}>
    updateUser(id:number, user: Omit<UserEntity, 'id' | 'email' | 'password'>): Promise<UserEntity>
}

type UserRepository = User;

export default UserRepository;