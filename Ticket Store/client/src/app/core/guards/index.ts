import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './admin/admin.guard';

export const GuardsModules = [
  AuthGuard,
  AdminGuard
];
