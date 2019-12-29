const { email } = require('./nodemail');

// .ENV
const {
    WEB3_PROVIDER,
    CONTRACT_ADDRESS,
    GANACHE_TEST_ADDRESS
} = process.env;

// Creating contract instance
const Web3 = require('web3');
const web3 = new Web3(WEB3_PROVIDER);
const contractABI = require('./abis/Counter.json').abi;  
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);


const fireEvent = async (req, res) => {
    await contract.methods.increase().send({ from: GANACHE_TEST_ADDRESS });
    const count = await contract.methods.count().call();
    res.status(200).send(count);
}

const subscribedEvents = {}; 

const contractEventListener = (eventName) => {
    // const eventJsonInterface = web3.utils._.find(contract._jsonInterface,
    //     o => o.name === eventName && o.type === 'event'    
    // )

    // const subscription = web3.eth.subscribe('logs', {
    //     address: contract.options.address,
    //     topics: [eventJsonInterface.signature]
    // }, (error, result) => {
    //     if(!error) {
    //         const eventObj = web3.eth.abi.decodeLog(
    //             eventJsonInterface.inputs,
    //             result.data,
    //             result.topics.slice(1)
    //         )
    //         console.log(`New ${eventName}!`, eventObj)
    //     }

    //     else {
    //         console.log(error)
    //     }
    // })
    // subscribedEvents[eventName] = subscription
    contract.events.Increased()
    .on('data', (evt) => {
        const count = evt.returnValues.currentCount;
        const address = evt.returnValues.incrementor;
        email(count, address);
        console.log(address);
        console.log(count);
    });
}

module.exports = {
    contractEventListener,
    fireEvent
}