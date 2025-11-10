import { getDevices } from './api';

export type Device = Awaited<ReturnType<typeof getDevices>>[number];
