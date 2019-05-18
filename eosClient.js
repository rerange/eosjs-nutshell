// 在 key.json 文件里替换成你的公钥和私钥
const privateKeys = require("./keys.json");
const rpcList = require("./rpc.json");

const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');  // development only
const fetch = require('node-fetch');                                // node only
const { TextDecoder, TextEncoder } = require('util');               // node only

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc(rpcList[getRandomInt(0, rpcList.length - 1)], { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    api: api,
    rpc: rpc
};