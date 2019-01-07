import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { AuthenticationUtility } from '../utils/authentication.util';

import { Role } from '../models/view/role';

@Injectable()
export class RoleService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClient: HttpClient) {
    }

    getAllRoles(): Observable<Array<Role>> {

        return this.httpClient.get<Array<Role>>('/api/allRoles', this.authUtil.headersBasic());
    }
}
