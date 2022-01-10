Dashcore Node
============

A HTH full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [HTH Core (helpthehomelessd) v0.13.0](https://github.com/dashpay/dash/tree/v0.13.0.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/dashevo/hthcore-node
cd hthcore-node
npm install
./bin/hthcore-node start
```

When running the start command, it will seek for a .hthcore folder with a hthcore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to helpthehomelessd.

Some plugins are available :

- Insight-API : `./bin/hthcore-node addservice @dashevo/insight-api`
- Insight-UI : `./bin/hthcore-node addservice @dashevo/insight-ui`

You also might want to add these index to your dash.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @dashevo/hthcore-node
```

```javascript
const hthcore = require('@dashevo/hthcore-node');
const config = require('./hthcore-node.json');

let node = hthcore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //HTH core started
    helpthehomelessd.on('tx', function(txData) {
        let tx = new hthcore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- HTH Core (helpthehomelessd) (v0.13.0) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Dashcore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Dashcore Node.

```bash
hthcore-node create -d <dash-data-dir> mynode
cd mynode
hthcore-node install <service>
hthcore-node install https://github.com/yourname/helloworld
hthcore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [HTH Core](https://github.com/dashpay/dash/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/dashevo/insight-api/tree/master)
- [Insight UI](https://github.com/dashevo/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/dashevo/hthcore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Dashd](docs/services/helpthehomelessd.md) - Interface to HTH Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a helpthehomelessd node already runing `helpthehomelessd --daemon`.

Dashcore-node : `git clone https://github.com/dashevo/hthcore-node -b develop`
Insight-api (optional) : `git clone https://github.com/dashevo/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/dashevo/insight-ui -b develop`

Install them :
```
cd hthcore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/hthcore-node start` to first generate a ~/.hthcore/hthcore-node.json file.
Append this file with `"@dashevo/insight-ui"` and `"@dashevo/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/dashevo/hthcore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/dashevo/hthcore-node/blob/master/LICENSE).

Copyright 2016-2018 HTH Core Group, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
