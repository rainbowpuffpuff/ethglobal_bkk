# 🧠 d/acc homomorphic ♦ 

Our project is a decentralized platform that makes sharing and training on sensitive data safe and secure. It’s built to help data owners and researchers work together without sacrificing privacy. Using TenSEAL CKKS homomorphic encryption, we can train models on encrypted data directly—meaning the raw data never gets exposed.
What’s in it for Data Buyers?

Data buyers (like researchers, startups, or AI enthusiasts) can create bounties for specific kinds of data they need. Think images, text, or even datasets for machine learning models. Participants collect data and encrypt it before offering it for training, so buyers can train models without actually seeing the data. This could be game-changing for fields like healthcare or finance where privacy is non-negotiable.

What’s in it for Data Owners?

If you’ve got valuable data, you can monetize it on your own terms. Just encrypt it with tools we’ve integrated (like TenSEAL) and submit it to bounties that catch your eye. Your data stays private the whole time, and if it helps improve the buyer’s model, you get paid in crypto. No middlemen, no sketchy data selling—just fair rewards for your contributions.
How It Works:

    Create a Bounty:
        Buyers post a bounty on-chain specifying what data they need and how it will be used.
        They also define encryption requirements (e.g., CKKS scheme with certain parameters).

    Participate in a Bounty:
        Data owners browse bounties, encrypt their data using the specified homomorphic encryption standard, and upload it securely.
        Submissions are tied to the bounty and stored safely.

    Evaluate Submissions:
        Buyers train or test their models on the encrypted data directly.
        
Why It’s Secure:

    Encryption First: Data stays encrypted throughout the process using TenSEAL—no leaks, no breaches.
    Smart Contracts: Everything’s handled on-chain, so payments are trustless and automatic.
Real-World Impact:

This platform is perfect for decentralized AI projects where data privacy is a must. Imagine training medical AI models on sensitive health data without ever seeing the patient info. Or improving financial fraud detection models without exposing user transactions. The context consists in keeping data owners in control while still pushing the boundaries of what AI can do.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)



* Subraph commands:
```
yarn deploy --reset
yarn clean-node
yarn run-node
yarn local-create
yarn abi-copy && yarn codegen
yarn local-ship
```

* Optimism Sepolia Graph deployment steps:
```
# ! Skip the graph init step, it's already the 'packages/subgraph' folder
cp packages/subgraph
graph auth --studio KEY_FROM_GRAPH_STUDIO_PAGE
graph codegen && graph build
graph deploy --studio name_of_your_subgraph
```

* Vercel deployment:
```
yarn vercel --build-env NEXT_PUBLIC_IGNORE_BUILD_ERROR=true
```

Polygon deployment address:
https://polygon.blockscout.com/address/0x5B6260d9dB1e105c829704FcDC2b65E1399807Ee?tab=txs

Linea deployment address:
https://sepolia.lineascan.build/address/0x5b6260d9db1e105c829704fcdc2b65e1399807ee
