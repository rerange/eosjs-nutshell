// 解除CPU和NET资源抵押
// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 和 yyyyyaccount 为你的账号，account 是解除抵押的账号，receiver 是接收账号
// unstakeNET 是解除抵押 NET 的 EOS 数量， unstakeCPU 是解除抵押 CPU 的 EOS 数量
const account = 'xxxxxaccount';
const receiver = 'yyyyyaccount';
const unstakeNET = 0.1000;
const unstakeCPU = 0.1000;

const eos = require('./eosClient.js');
const api = eos.api;

async function undelegatebw(fromAccount, receiverAccount, stakeNET, stakeCPU){
  const resp = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'undelegatebw',
      authorization: [{
        actor: fromAccount,
        permission: 'active',
      }],
      data: {
        from: fromAccount,
        receiver: receiverAccount,
        unstake_net_quantity: stakeNET.toFixed(4) + ' EOS',
        unstake_cpu_quantity: stakeCPU.toFixed(4) + ' EOS',
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

undelegatebw(account, receiver, unstakeNET, unstakeCPU).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});
