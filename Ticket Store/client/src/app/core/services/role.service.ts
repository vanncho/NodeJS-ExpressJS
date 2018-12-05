import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

@Injectable()
export class RoleService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    getAllRoles(): Observable<Object> {

        return this.httpClientService.get('/api/allRoles', this.authUtil.headersBasic());
    }
}
