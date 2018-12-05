import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './admin/admin.guard';

export const guardsModules = [
  AuthGuard,
  AdminGuard
];