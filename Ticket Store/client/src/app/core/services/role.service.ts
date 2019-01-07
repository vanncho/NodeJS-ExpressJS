import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from './http-client.service';
import { AuthenticationUtility } from '../utils/authentication.util';

import { Role } from '../models/view/role';

@Injectable()
export class RoleService {

    constructor(private authUtil: AuthenticationUtility,
                private httpClientService: HttpClientService) {
    }

    getAllRoles(): Observable<Array<Role>> {

        return this.httpClientService.get<Array<Role>>('/api/allRoles', this.authUtil.headersBasic());
    }
}
