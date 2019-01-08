import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/view/user.model';
import { AuthenticationUtility } from '../utils/authentication.util';
import { UserEditView } from '../models/view/user-edit-view.model';

@Injectable()
export class UserService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    getAllUsers(): Observable<User[]> {

        return this.httpClient.get<User[]>('/api/allUsers');
    }

    getAllUsersByRole(role): Observable<User[]> {

        return this.httpClient.post<User[]>('/api/allUsers', JSON.stringify({role: role}));
    }

    getUserById(userId): Observable<UserEditView> {

        return this.httpClient.get<UserEditView>('/api/edit/' + userId, this.authUtil.headersBasic());
    }

    updateUser(user): Observable<Object> {

        return this.httpClient.post<Object>('/api/edit', user, this.authUtil.headersBasic());
    }

    disableEnableUser(userData): Observable<string> {

        return this.httpClient.post<string>('/api/lockUnlock', JSON.stringify(userData), this.authUtil.headersBasic());
    }

    searchUsersWithUsernameLike(username): Observable<User[]> {

        return this.httpClient.post<User[]>('/api/searchUsers', JSON.stringify({ username: username }), this.authUtil.headersBasic());
    }
}
