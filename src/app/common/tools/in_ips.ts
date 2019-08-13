import {environment} from '../../../environments/environment';
export function in_ips(ip) {
  return environment.ips.includes(ip);
}
