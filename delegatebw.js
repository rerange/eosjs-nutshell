// 抵押CPU和NET资源
// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 和 yyyyyaccount 为你的账号，account 是抵押的账号，receiver 是接收账号
// stakeNET 是抵押 NET 的 EOS 数量，stakeCPU 是抵押 CPU 的 EOS 数量
const account = 'xxxxxaccount';
const receiver = 'yyyyyaccount';
const stakeNET = 0.1;
const stakeCPU = 0.1;

const eos = require('./eosClient.js');
const api = eos.api;

async function delegatebw(fromAccount, receiverAccount, stakeNET, stakeCPU){
  const resp = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'delegatebw',
      authorization: [{
        actor: fromAccount,
        permission: 'active',
      }],
      data: {
        from: fromAccount,
        receiver: receiverAccount,
        stake_net_quantity: stakeNET.toFixed(4) + ' EOS',
        stake_cpu_quantity: stakeCPU.toFixed(4) + ' EOS',
        transfer: false
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

delegatebw(account, receiver, stakeNET, stakeCPU).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});
