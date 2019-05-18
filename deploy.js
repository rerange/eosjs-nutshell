// 部署合约
// 在 keys.json 文件里放入你的私钥

// 替换 xxxxxaccount 为合约账号
const account = 'xxxxxaccount';

var wasm = fs.readFileSync('contracts/eosio.token/eosio.token.wasm');
var abi = fs.readFileSync('contracts/eosio.token/eosio.token.abi');

// Publish contract to the blockchain

const eos = require('./eosClient.js');
const api = eos.api;

async function deploy(account, wasm, abi){
  const resp = await api.transact({
    actions: [{
        account: 'eosio',
        name: 'setcode',
        authorization: [{
            actor: account,
            permission: 'active',
        }],
        data: {
            account: account,
            vmtype: 0,
            vmversion: 0,
            code: wasm
        },
    },
    {
        account: 'eosio',
        name: 'setabi',
        authorization: [{
            actor: account,
            permission: 'active',
        }],
        data: {
            account: account,
            abi: abi
        },
      }
]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

// wasm = new Uint8Array();  // to clear contract

deploy(account, wasm, JSON.parse(abi)).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});
