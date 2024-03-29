/*
 * @Descripttion : 网站请求头模板
 * @Author       : wuhaidong
 * @Date         : 2023-09-14 16:07:55
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2023-11-09 22:39:28
 */

// 雪球 headers
export const xueqiuHeaders = {
  Host: 'stock.xueqiu.com',
  Referer: 'https://xueqiu.com/',
  Accept: 'application/json',
  Cookie: 'xq_a_token=998177d88a109a253ea85e7a28754f1a793f3651;',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
};

export const eastmoneyHeaders = {
  Host: 'datacenter-web.eastmoney.com',
  Referer: 'https://data.eastmoney.com/hsgt/index.html',
  Accept: '/',
  Cookie: '',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
};
