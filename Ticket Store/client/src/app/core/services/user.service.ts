import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class UserService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    getAllUsers(): Observable<Object> {

        return this.httpClientService.get('/api/allUsers', this.authUtil.headersBasic());
    }

    getAllUsersByRole(role): Observable<Object> {

        return this.httpClientService.post('/api/allUsers', JSON.stringify({role: role}), this.authUtil.headersBasic());
    }

    getUserById(userId): Observable<Object> {

        return this.httpClientService.get('/api/edit/' + userId, this.authUtil.headersBasic());
    }

    updateUser(user): Observable<Object> {

        return this.httpClientService.post('/api/edit', user, this.authUtil.headersBasic());
    }

    disableEnableUser(userData): Observable<Object> {

        return this.httpClientService.post('/api/lockUnlock', JSON.stringify(userData), this.authUtil.headersBasic());
    }

    searchUsersWithUsernameLike(username): Observable<Object> {

        return this.httpClientService.post('/api/searchUsers', username, this.authUtil.headersBasic());
    }
}
