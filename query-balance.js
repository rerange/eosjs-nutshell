// 在 keys.json 文件里放入你的私钥
const eos = require('./eosClient.js');
const rpc = eos.rpc;

// 替换 xxxxxaccount 为你的账号
const account = 'xxxxxaccount';

// 查询账号余额
async function queryBalance(){
    const resp = await rpc.get_table_rows({
        json: true,              // Get the response as json
        code: 'eosio.token',     // Contract that we target
        scope: account,         // Account that owns the data
        table: 'accounts',       // Table name
        limit: 10,               // Maximum number of rows that we want to get
        reverse: false,          // Optional: Get reversed data
        show_payer: false,       // Optional: Show ram payer
    });
    return resp.rows; 
}

queryBalance().then((balance)=>{
    console.log(balance);
}).catch((err)=>{
    console.log(err);
});


