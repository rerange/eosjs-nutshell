// 创建新账号，购买抵押资源
// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 为你的账号，替换 newaccount 为你准备创建的账号
// ** 替换 owner 和 active 两个地方的公钥为 newaccount 的公钥
// bytes 为购买内存的字节数量
// stakeNET 是抵押 NET 的 EOS 数量，stakeCPU 是抵押 CPU 的 EOS 数量

const creator = 'xxxxxaccount';
const name = 'newaccount';
const owner = 'EOS8YBjMEoD5vcqz8pmqTzvDtWKQCjcDzJB1ac3TTJSvZ8SCQfur6';
const active = 'EOS8YBjMEoD5vcqz8pmqTzvDtWKQCjcDzJB1ac3TTJSvZ8SCQfur6';
const bytes = 4 * 1024;
const stakeNET = 0.1;
const stakeCPU = 1;

const eos = require('./eosClient.js');
const api = eos.api;

async function createAccount(creator, name, owner, active, bytes, stakeNET, stakeCPU){
  const resp = await api.transact({
    actions: [
      {
        account: 'eosio',
        name: 'newaccount',
        authorization: [{
          actor: creator,
          permission: 'active',
        }],
        data: {
          creator: creator,
          name: name,
          owner: {
            threshold: 1,
            keys: [{
              key: owner,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
          active: {
            threshold: 1,
            keys: [{
              key: active,
              weight: 1
            }],
            accounts: [],
            waits: []
            }
        }
      },
      {
        account: 'eosio',
        name: 'buyrambytes',
        authorization: [{
          actor: creator,
          permission: 'active',
        }],
        data: {
          payer: creator,
          receiver: name,
          bytes: bytes
        }
      },
      {
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
          actor: creator,
          permission: 'active',
        }],
        data: {
          from: creator,
          receiver: name,
          stake_net_quantity: stakeNET.toFixed(4) + ' EOS',
          stake_cpu_quantity: stakeCPU.toFixed(4) + ' EOS',
          transfer: false
        }
      }
  ]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

createAccount(creator, name, owner, active, bytes, stakeNET, stakeCPU).then((result) => {
      console.log(result);
  }).catch((err) => {
    console.log(err);
  });
