// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  env: '模拟数据',
  urls: 'http://123.249.28.108:8082/highway-management', // 管理端
  urlc: 'http://123.249.28.108:8082/highway-interactive', // 客户端
  urla: 'http://123.249.28.108:8889/highway-authentication', // 独立认证端
};
