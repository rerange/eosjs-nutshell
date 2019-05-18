// 转账
// 在 keys.json 文件里放入你的私钥

const eos = require('./eosClient.js');
const api = eos.api;

const from = 'fromaccount';
const to = 'toaccount';
const quant = 0.0001;
const memo = '';

const contract = 'eosio.token';
const symbol = 'EOS';

async function transfer(fromAccount, toAccount, quant, memo, tokenContract){
    const resp = await api.transact({
      actions: [{
        account: tokenContract,
        name: 'transfer',
        authorization: [{
          actor: fromAccount,
          permission: 'active',
        }],
        data: {
          from: fromAccount,
          to: toAccount,
          quantity: quant.toFixed(4) + ' ' + symbol,
          memo: memo,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    return resp;
}

transfer(from, to, quant, memo, contract).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});
