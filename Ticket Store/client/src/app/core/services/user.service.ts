import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { HttpClientService } from './http-client.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/view/user';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class UserService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    getAllUsers(): Observable<Array<User>> {

        // return this.httpClient
        //                       .get<Array<User>>('/api/allUsers', this.authUtil.headersBasic())
        //                       .map();
        return this.httpClient.get<Array<User>>('/api/allUsers', this.authUtil.headersBasic());
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

        return this.httpClientService.post('/api/searchUsers', JSON.stringify({ username: username }), this.authUtil.headersBasic());
    }
}
