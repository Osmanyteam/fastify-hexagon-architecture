import type UserRepository from '../domain/user.repository';
import type UserEntity from '../entity/user.entity';

export default class UserApplication {

    constructor (protected userRepository: UserRepository) { }

    public async createUser(user: UserEntity) {
        const exist = await this.userRepository.userExists(user.email);
        if (exist) {
            throw new Error('User is already exist');
        }
        await this.userRepository.createUser(user);
    }

    public login(email: string, password: string) {
        return this.userRepository.login(email, password);
    }

    public async updateUser(id:number, user: Omit<UserEntity, 'id' | 'email' | 'password'>): Promise<UserEntity> {
        return this.userRepository.updateUser(id, user);
    }
}