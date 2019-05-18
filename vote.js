// 给BP节点投票
// 在 keys.json 文件里放入你的私钥

const eos = require('./eosClient.js');
const api = eos.api;

async function vote(account, proxy, producers){
  const resp = await api.transact({
    actions: [{
      account: 'eosio',
      name: 'voteproducer',
      authorization: [{
        actor: account,
        permission: 'active',
      }],
      data: {
        owner: account,
        proxy: proxy,
        producers: producers.sort()
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  return resp;
}

// 替换 xxxxxaccount 为你的账号名
// 第三个参数是您投票的节点，如果是多个节点，需要按照字母排序，如果字母一样，比较后一位，以此类推
vote('xxxxxaccount', '', ['zbeosbp11111', 'eoslaomaocom']).then((resp)=>{
  console.log(resp);
}).catch((err)=>{
  console.log(err);
});

