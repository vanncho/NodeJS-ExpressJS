import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/view/user';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class UserService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    getAllUsers(): Observable<Array<User>> {

        return this.httpClient.get<Array<User>>('/api/allUsers');
    }

    getAllUsersByRole(role): Observable<Array<User>> {

        return this.httpClient.post<Array<User>>('/api/allUsers', JSON.stringify({role: role}), this.authUtil.headersBasic());
    }

    getUserById(userId): Observable<User> {

        return this.httpClient.get<User>('/api/edit/' + userId, this.authUtil.headersBasic());
    }

    updateUser(user): Observable<void> {

        return this.httpClient.post<void>('/api/edit', user, this.authUtil.headersBasic());
    }

    disableEnableUser(userData): Observable<string> {

        return this.httpClient.post<string>('/api/lockUnlock', JSON.stringify(userData), this.authUtil.headersBasic());
    }

    searchUsersWithUsernameLike(username): Observable<Array<User>> {

        return this.httpClient.post<Array<User>>('/api/searchUsers', JSON.stringify({ username: username }), this.authUtil.headersBasic());
    }
}
