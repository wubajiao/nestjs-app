// finance
export const finance_cash_flow_url =
  'https://stock.xueqiu.com/v5/stock/finance/cn/cash_flow.json?symbol=';
export const finance_indicator_url =
  'https://stock.xueqiu.com/v5/stock/finance/cn/indicator.json?symbol=';
export const finance_balance_url =
  'https://stock.xueqiu.com/v5/stock/finance/cn/balance.json?symbol=';
export const finance_income_url =
  'https://stock.xueqiu.com/v5/stock/finance/cn/income.json?symbol=';
export const finance_business_url =
  'https://stock.xueqiu.com/v5/stock/finance/cn/business.json?symbol=';

// report
export const report_latest_url =
  'https://stock.xueqiu.com/stock/report/latest.json?symbol=';
export const report_earningforecast_url =
  'https://stock.xueqiu.com/stock/report/earningforecast.json?symbol=';

// capital
export const capital_margin_url =
  'https://stock.xueqiu.com/v5/stock/capital/margin.json?symbol=';
export const capital_blocktrans_url =
  'https://stock.xueqiu.com/v5/stock/capital/blocktrans.json?symbol=';
export const capital_assort_url =
  'https://stock.xueqiu.com/v5/stock/capital/assort.json?symbol=';
export const capital_history_url =
  'https://stock.xueqiu.com/v5/stock/capital/history.json?symbol=';
export const capital_flow_url =
  'https://stock.xueqiu.com/v5/stock/capital/flow.json?symbol=';

// f10
export const f10_skholderchg =
  'https://stock.xueqiu.com/v5/stock/f10/cn/skholderchg.json?symbol=';
export const f10_skholder =
  'https://stock.xueqiu.com/v5/stock/f10/cn/skholder.json?symbol=';
export const f10_industry =
  'https://stock.xueqiu.com/v5/stock/f10/cn/industry.json?symbol=';
export const f10_holders =
  'https://stock.xueqiu.com/v5/stock/f10/cn/holders.json?&symbol=';
export const f10_bonus =
  'https://stock.xueqiu.com/v5/stock/f10/cn/bonus.json?&symbol=';
export const f10_org_holding_change =
  'https://stock.xueqiu.com/v5/stock/f10/cn/org_holding/change.json?symbol=';
export const f10_industry_compare =
  'https://stock.xueqiu.com/v5/stock/f10/cn/industry/compare.json?type=single&symbol=';
export const f10_business_analysis =
  'https://stock.xueqiu.com/v5/stock/f10/cn/business_analysis.json?symbol=';
export const f10_shareschg =
  'https://stock.xueqiu.com/v5/stock/f10/cn/business_analysis.json?symbol=';
export const f10_top_holders =
  'https://stock.xueqiu.com/v5/stock/f10/cn/top_holders.json?&symbol=';
export const f10_indicator =
  'https://stock.xueqiu.com/v5/stock/f10/cn/indicator.json?symbol=';

// real time
export const realtime_quote =
  'https://stock.xueqiu.com/v5/stock/realtime/quotec.json?symbol=';
export const realtime_pankou =
  'https://stock.xueqiu.com/v5/stock/realtime/pankou.json?symbol=';
export const realtime_quote_detail =
  'https://stock.xueqiu.com/v5/stock/quote.json?extend=detail&symbol=';

// kline
export const kline =
  'https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol={}&begin={}&period=day&type=before&count=-{}&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance';

// user
export const watch_list =
  'https://stock.xueqiu.com/v5/stock/portfolio/list.json?system=true';
export const watch_stock =
  'https://stock.xueqiu.com/v5/stock/portfolio/stock/list.json?size=1000&category=1&pid=';

// cube
export const nav_daily =
  'https://xueqiu.com/cubes/nav_daily/all.json?cube_symbol=';
export const rebalancing_history =
  'https://xueqiu.com/cubes/rebalancing/history.json?cube_symbol=';

// eastmoney
export const convertible_bond =
  'https://datacenter-web.eastmoney.com/api/data/v1/get?pageSize={}&pageNumber={}&sortColumns=PUBLIC_START_DATE&sortTypes=-1&reportName=RPT_BOND_CB_LIST&columns=ALL&quoteColumns=f2~01~CONVERT_STOCK_CODE~CONVERT_STOCK_PRICE%2Cf235~10~SECURITY_CODE~TRANSFER_PRICE%2Cf236~10~SECURITY_CODE~TRANSFER_VALUE%2Cf2~10~SECURITY_CODE~CURRENT_BOND_PRICE%2Cf237~10~SECURITY_CODE~TRANSFER_PREMIUM_RATIO%2Cf239~10~SECURITY_CODE~RESALE_TRIG_PRICE%2Cf240~10~SECURITY_CODE~REDEEM_TRIG_PRICE%2Cf23~01~CONVERT_STOCK_CODE~PBV_RATIO&source=WEB&client=WEB';

// csindex
export const index_basic_info =
  'https://www.csindex.com.cn/csindex-home/indexInfo/index-basic-info/{}';
export const index_details_data =
  'https://www.csindex.com.cn/csindex-home/indexInfo/index-details-data?fileLang=1&indexCode={}';
export const index_weight_top10 =
  'https://www.csindex.com.cn/csindex-home/index/weight/top10/{}';
export const index_perf =
  'https://www.csindex.com.cn/csindex-home/perf/index-perf?indexCode={}&startDate={}&endDate={}';

// hkex
export const hkex_connect =
  'http://www.hkexnews.hk/sdw/search/mutualmarket.aspx?t=';

//fund
// param is fund code
export const fund_detail = 'https://danjuanapp.com/djapi/fund/detail/%s';
// param is fund code
export const fund_info = 'https://danjuanapp.com/djapi/fund/%s';
// first param is fund code, second is 'ty'
export const fund_growth = 'https://danjuanapp.com/djapi/fund/growth/%s?day=%s';
// first param is fund code
export const fund_nav_history =
  'https://danjuanapp.com/djapi/fund/nav/history/%s?page=%s&size=%s';
// param is fund code
export const fund_achievement =
  'https://danjuanapp.com/djapi/fundx/base/fund/achievement/%s';
// 基金持仓：param is fund code
export const fund_asset =
  'https://danjuanapp.com/djapi/fundx/base/fund/record/asset/percent?fund_code=%s';
// 基金管理人: param is fund code
export const fund_manager =
  'https://danjuanapp.com/djapi/fundx/base/fund/record/manager/list?fund_code=%s&post_status=%s';
// https://danjuanapp.com/djapi/fund/base/quote/data/index/analysis/008975
// param is fund code
export const fund_trade_date =
  'https://danjuanapp.com/djapi/fund/order/v2/trade_date?fd_code=%s';
// param is fund code
export const fund_derived = 'https://danjuanapp.com/djapi/fund/derived/%s';
