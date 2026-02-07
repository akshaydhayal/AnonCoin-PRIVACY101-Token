import { Shield, Cpu, Lock, Zap } from 'lucide-react';

export interface SlideContent {
  title: string;
  content: string | React.ReactNode;
  infographic?: string; // This will be used to render an SVG or a custom component
  type: 'content' | 'infographic' | 'image';
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonData {
  id: string;
  title: string;
  description: string;
  reward: string;
  icon: React.ElementType;
  slides: SlideContent[];
  quiz: Question[];
}

export const CURRICULUM: LessonData[] = [
  {
    id: "burner-strategy",
    title: "Burner Strategy",
    description: "Learn to separate your digital identities using temporary wallets.",
    reward: "10 PRIV",
    icon: Shield,
    slides: [
      {
        title: "The Illusion of Anonymity",
        type: "content",
        content: "Most users mistakenly believe that blockchains like Bitcoin and Solana are anonymous by design. In reality, they are pseudonymous. While your real-world name isn't directly attached to your transactions, every move you've ever made is permanently recorded and linked to your public address. This creates a transparent, immutable web of your entire financial life that anyone with an explorer can analyze."
      },
      {
        title: "What is a Burner Wallet?",
        type: "infographic",
        content: "A burner wallet is a temporary, disposable wallet generated for a single high-risk interaction or a limited window of time. Think of it as a 'digital airlock'—it sits between your main assets and the experimental wilderness of DeFi, ensuring that even if the burner is compromised, your core holdings remain untouched and unlinked.",
        infographic: "burner-concept"
      },
      {
        title: "When to Use a Burner",
        type: "content",
        content: (
          <ul className="space-y-4">
            <li className="flex gap-3"><Zap className="text-yellow-400 shrink-0" /> Interacting with experimental DeFi protocols.</li>
            <li className="flex gap-3"><Zap className="text-yellow-400 shrink-0" /> Minting high-risk NFTs from unknown creators.</li>
            <li className="flex gap-3"><Zap className="text-yellow-400 shrink-0" /> Testing new dApps before committing your main funds.</li>
          </ul>
        )
      },
      {
        title: "The Golden Rule",
        type: "content",
        content: "Never, ever link your burner wallet to your 'main' wallet via a direct on-chain transfer. Doing so creates a permanent link that investigators or bots can follow effortlessly."
      },
      {
        title: "Isolation is Key",
        type: "infographic",
        content: "Use different browser profiles or even different browsers for each wallet identity to prevent cross-site tracking and cookie leakage.",
        infographic: "isolation-diagram"
      }
    ],
    quiz: [
      {
        question: "Why are Solana transactions considered pseudonymous rather than anonymous?",
        options: [
          "Transactions are private by default.",
          "Every transaction is fixed to a public address that can be tracked.",
          "Nobody can see the transactions."
        ],
        correctAnswer: 1,
        explanation: "Solana is a public ledger. While your name isn't attached, your public key (pseudonym) is."
      },
      {
        question: "Should you transfer funds directly from your main wallet to your burner wallet?",
        options: [
          "Yes, it's the fastest way.",
          "No, it creates a traceable link on-chain.",
          "Only if the amount is small."
        ],
        correctAnswer: 1,
        explanation: "A direct transfer creates a link that makes the 'burner' easy to trace back to your main stash."
      }
    ]
  },
  {
    id: "shielded-ips",
    title: "Shielded IPs",
    description: "Stop leaking your physical location with every transaction.",
    reward: "20 PRIV",
    icon: Shield,
    slides: [
      {
        title: "The Silent Leak",
        type: "content",
        content: "Every time your wallet app fetches your balance, updates a price, or sends a transaction, it communicates with a remote server. By default, that server sees your unique IP address—the digital equivalent of your physical home address. Without protection, your every financial inquiry is stamped with your location, allowing observers to map your virtual wealth to your physical identity."
      },
      {
        title: "IP to Identity",
        type: "infographic",
        content: "RPC providers and dApp backends can link your IP to your Wallet Address. Over time, they can geolocate you with startling accuracy.",
        infographic: "mapping-ip"
      },
      {
        title: "Enter the VPN",
        type: "content",
        content: "A Virtual Private Network (VPN) creates an encrypted tunnel for your data. It hides your real IP and makes it appear as if you are connecting from a different location."
      },
      {
        title: "Browser Fingerprinting",
        type: "content",
        content: "Anonymity isn't just about IP. Websites can see your screen resolution, installed fonts, and browser version to create a unique 'fingerprint' of your device."
      },
      {
        title: "The Privacy Stack",
        type: "infographic",
        content: "Combine a VPN with a privacy-focused browser (like Brave or LibreWolf) to maximize your shield.",
        infographic: "privacy-stack"
      }
    ],
    quiz: [
      {
        question: "Who can see your IP address when you use a dApp without a VPN?",
        options: [
          "Only your ISP.",
          "The RPC provider and the dApp backend.",
          "Nobody."
        ],
        correctAnswer: 1,
        explanation: "Any server you connect to (RPC, API, Websocket) can see your public IP."
      }
    ]
  },
  {
    id: "rpc-privacy",
    title: "RPC Privacy",
    description: "Take control of the pipes that carry your data.",
    reward: "30 PRIV",
    icon: Cpu,
    slides: [
      {
        title: "What is an RPC?",
        type: "content",
        content: "Remote Procedure Call (RPC) nodes are the essential traffic controllers of the blockchain world. When your wallet displays 'Sending...', it isn't talking directly to the entire network; it's pushing your transaction data to an RPC node, which then validates and broadcasts it. Whoever controls that node controls the lens through which you see the blockchain—and the lens through which the blockchain sees you."
      },
      {
        title: "The Problem with Public RPCs",
        type: "infographic",
        content: "Default wallet RPCs (like Mainnet-beta) are often high-volume and monitored. They log every request made by every user.",
        infographic: "rpc-logging"
      },
      {
        title: "Custom RPCs",
        type: "content",
        content: "Switching to a private or custom RPC provider allows you to bypass the public 'log-heavy' gateways. Some providers offer specific privacy features like IP scrubbing."
      },
      {
        title: "Self-Hosting",
        type: "content",
        content: "The ultimate privacy move is running your own Solana RPC node. You become your own gateway, meaning zero third-party logging of your transaction requests."
      },
      {
        title: "Speed vs. Privacy",
        type: "content",
        content: "Private RPCs are often faster because they have less traffic. You get both better performance and better confidentiality."
      }
    ],
    quiz: [
      {
        question: "What is the primary function of an RPC node for a wallet user?",
        options: [
          "To store private keys.",
          "To act as a bridge between the wallet and the blockchain network.",
          "To generate airdrop tokens."
        ],
        correctAnswer: 1,
        explanation: "RPCs are the 'translators' and 'messengers' that connect your wallet to the actual Solana ledger."
      }
    ]
  },
  {
    id: "dark-pools",
    title: "Dark Pool Liquidity",
    description: "Understand confidential trading via Anoncoin protocols.",
    reward: "40 PRIV",
    icon: Lock,
    slides: [
      {
        title: "The Glass House",
        type: "content",
        content: "On a standard decentralized exchange (DEX), every limit order and swap intent is broadcast to a public 'mempool' or order book. This transparency is a double-edged sword: specialized MEV bots monitor these public signals in real-time, effectively 'front-running' your trades by jumping ahead of you in the block, forcing you to execute at a worse price while they pocket the difference."
      },
      {
        title: "What is a Dark Pool?",
        type: "infographic",
        content: "A Dark Pool is a private exchange where orders are hidden from the public book. Only the final settlement is visible once the trade is finished.",
        infographic: "dark-pool-viz"
      },
      {
        title: "Confidentiality = Security",
        type: "content",
        content: "By keeping your intent private, you protect yourself from Maximum Extractable Value (MEV) bots that drain millions from retail users every day."
      },
      {
        title: "Anoncoin's Innovation",
        type: "content",
        content: "Anoncoin brings institutional-grade Dark Pools to Solana, allowing anyone to trade with the same privacy as a multi-million dollar hedge fund."
      },
      {
        title: "Zero-Knowledge Trading",
        type: "content",
        content: "Using ZK-proofs, Anoncoin can prove a trade is valid without revealing the size, price, or participants until it's too late for bots to react."
      }
    ],
    quiz: [
      {
        question: "How does a Dark Pool protect a trader from front-running?",
        options: [
          "By making the transaction fee higher.",
          "By hiding the order from the public book until it is settled.",
          "By blocking all bots from the network."
        ],
        correctAnswer: 1,
        explanation: "If a bot can't see your order in the book, it can't jump ahead of you to manipulate the price."
      }
    ]
  }
];
