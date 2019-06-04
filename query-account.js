// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 为你的账号
const account = 'xxxxxaccount';

const eos = require('./eosClient.js');
const rpc = eos.rpc;

// 查询账号权限、资源等信息
async function queryAccount(account){
    const resp = await rpc.get_account(account);
    return resp; 
};

queryAccount(account).then((resp)=>{
    console.log(resp);
  }).catch((err)=>{
    console.log(err);
  });

