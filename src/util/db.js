/**
 * 代码风格约定：除微信认证外的所有与数据库有关操作全部移到此处
 */

import { axios } from './axios';
import state from '../store/state';

/**
*   @database: { 微信开发 }
*   @desc:     { 月度先进评选投票 } 
    const { sid, dept, team_name, username, rec_month, headimgurl, nickname, openid, rec_time, _openid, _rec_month } = params;
*/
export const addCbpcPrintPartyKpi = async params =>
  await axios({
    url: '/102/cead14fbed.json',
    params
  }).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 当前小组用户得票排名 } 
    const { rec_month, sid } = params;
*/
export const getCbpcPrintPartyKpi = async params =>
  await axios({
    url: '/103/e55382eada.json',
    params
  }).then(res => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 已投票 } 
    const { rec_month, sid, openid } = params;
*/
export const getCbpcPrintPartyKpiVoted = async params =>
  await axios({
    url: '/104/8dc89dda94.json',
    params
  }).then(res => res);
