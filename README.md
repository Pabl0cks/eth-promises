# Promise on ETH :handshake:	:large_blue_diamond:	

<kbd>![promise-on-eth](https://user-images.githubusercontent.com/55535804/230684185-dfb2fcaa-fd13-4819-9311-7894bc27a27a.png)</kbd>


Promise on ETH is a decentralized application built with Scaffold-ETH 2 for its Hackathon.
This DApp allows users to set up goals and motivate themselves to complete them by setting up a failing fee in ETH. Users have to assign a supervisor who will confirm if the goal is completed or failed by the deadline. If the creator of the goal fails, loses the ETH.

## Demo Video

You can watch a demo video of the DApp:
https://www.loom.com/share/a1e91056beab4b2c807197b51f8ee741

## Features

- Users can create goals with deadlines and failing fees in ETH (promise on ETH).
- Supervisors can confirm if a goal is completed or failed.
- If the goal is failed, the user loses their failing fee.
- If the goal is completed, the user gets back their ETH.
- Users can browse other users' goals for inspiration.
- Users can check the goals they currently have.
- Supervisors can view the goals they got assigned to supervise and mark them as complete or failed.
- A security withdrawal feature allows the contract owner to withdraw the failing fee if the supervisor's account is lost (2 years after deadline, could maybe lower it to a few months).

## Potential Future Developments

Some potential future developments for Promises on ETH could include:

- Implement an optional staking feature, allowing users to earn rewards for completing their goals.
- Allow users to create group goals with multiple participants, increasing collaboration and motivation.
- Introduce an NFT-based achievement system to gamify the goal-setting process and encourage user engagement.
- Adding a reward system for supervisors.
- Implementing a voting mechanism for supervisors.
- Enhancing the user interface for better user experience.
- Adding notifications and reminders for upcoming deadlines.

## Quickstart

To get started with Scaffold-Eth 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/tokodev/eth-promises.git
cd eth-promises
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`
