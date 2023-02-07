import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: User[] = [];
    async create(user: User): User {
        this.users.push(user);
        return user;
    }
}
