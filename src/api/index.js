import { mergeApi } from 'utils'

const HOST = '';

const CLOUDMONITORUSER = '';

//登陆
const login = mergeApi({
  get: '/weatherApi?city=贵阳'
}, CLOUDMONITORUSER);

const API = mergeApi({
  login
}, HOST);

export default API;
