## eosjs-nutshell

### 简介

[eosjs nutshell](https://github.com/rerange/eosjs-nutshell) 整理了eosjs常用代码，包括创建、查询EOS账号，EOS转账，购买RAM，出售RAM，抵押资源，取消抵押资源，生成密钥对等。

### 前提

1. node > v12.1.0
2. 安装了[eosjs](https://github.com/EOSIO/eosjs)：
   
在此工程目录下，安装依赖

```bash
    npm i
```

### 使用方法

首先，在 `keys.json` 中添加私钥，在`rpc.json`设置节点API。然后对相应程序的参数进行修改。

js代码运行方式为：

```bash
    node query-account.js
```