// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  env: '开发中......',
  urls: 'http://139.9.155.62:8080/highway-management', // 管理端
  urlc: 'http://139.9.153.27:8081/expressway-interactive', // 客户端
  urla: 'http://139.9.155.62:8081/expressway-authentication', // 独立认证端
  ips: ['117.187.60.146', '117.187.60.138']
};
