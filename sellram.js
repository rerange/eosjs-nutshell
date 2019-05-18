// 出售RAM
// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 为你的账号，bytes 为出售内存的字节数量
const account = 'xxxxxaccount';
const bytes = 4 * 1024;

const eos = require('./eosClient.js');
const api = eos.api;

async function sellram(account, bytes){
  const resp = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'sellram',
      authorization: [{
        actor: account,
        permission: 'active',
      }],
      data: {
        account: account,
        bytes: bytes
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

sellram(account, bytes).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});



