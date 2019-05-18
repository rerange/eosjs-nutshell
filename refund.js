// 领回解除抵押的EOS
// 在 keys.json 文件里放入你的私钥

// 解除抵押三天后可以手动领回EOS，替换 xxxxxaccount 为你的账号
const account = 'xxxxxaccount';

const eos = require('./eosClient.js');
const api = eos.api;

async function refund(account){
  const resp = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'refund',
      authorization: [{
        actor: account,
        permission: 'active',
      }],
      data: {
        account: account
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

refund(account).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});