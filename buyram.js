// 购买RAM
// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 为你的账号，bytes 为购买内存的字节数量
const account = 'xxxxxaccount';
const receiver = 'yyyyyaccount';
const bytes = 4 * 1024;

const eos = require('./eosClient.js');
const api = eos.api;

async function buyram(account, receiver, bytes){
  const resp = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'buyrambytes',
      authorization: [{
        actor: account,
        permission: 'active',
      }],
      data: {
        payer: account,
        receiver: receiver,
        bytes: bytes
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

buyram(account, receiver, bytes).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});
