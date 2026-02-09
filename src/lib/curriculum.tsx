import { Shield, Cpu, Lock, Zap } from 'lucide-react';

export interface SlideContent {
  title: string;
  content: string | React.ReactNode;
  infographic?: string;
  image?: string;
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
    reward: "10 PRIVV",
    icon: Shield,
    slides: [
      {
        title: "The Illusion of Anonymity",
        type: "image",
        content: (
          <div className="space-y-4">
            <p>Most users believe blockchains are anonymous. In reality, they are <strong>pseudonymous</strong>. Every transaction is a permanent, public link in an immutable chain. If your identity is ever linked to your address (e.g., via a KYC exchange), your entire financial history becomes an open book.</p>
            <div className="p-3 bg-white/5 border-l-2 border-purple-500 rounded-r-lg">
              <p className="text-sm italic">&ldquo;On-chain data is the ultimate surveillance tool&mdash;it never forgets and it never sleeps.&rdquo;</p>
            </div>
            <p className="text-sm text-gray-400">Researchers use &lsquo;Clustering&rsquo; attacks to group all your addresses together based on how you move funds between them. One mistake is all it takes.</p>
          </div>
        ),
        image: "bitcoin-anonymity"
      },
      {
        title: "The Digital Airlock",
        type: "infographic",
        content: (
          <div className="space-y-4">
            <p>A <strong>Burner Wallet</strong> is a temporary, single-use identity designed to be discarded like a &lsquo;burner phone&rsquo;. It acts as a digital airlock between your secure main assets and the experimental wilderness of DeFi.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2"><Zap className="w-4 h-4 text-purple-500 shrink-0" /> <strong>Risk Isolation:</strong> If a dApp is malicious, only the burner is drained.</li>
              <li className="flex gap-2"><Zap className="w-4 h-4 text-purple-500 shrink-0" /> <strong>Unlinkability:</strong> It breaks the trail of your high-value holdings.</li>
              <li className="flex gap-2"><Zap className="w-4 h-4 text-purple-500 shrink-0" /> <strong>Micro-Funding:</strong> Only transfer the exact SOL needed for the interaction.</li>
            </ul>
          </div>
        ),
        infographic: "burner-concept"
      },
      {
        title: "Strategic Execution",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>Successful burner strategy requires a <strong>Layered Wallet System</strong>. You shouldn&rsquo;t just have one &lsquo;hot&rsquo; wallet; you need a hierarchy of safety.</p>
            <div className="grid grid-cols-1 gap-3">
              <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="font-bold text-green-400">1. The Vault (Offline)</p>
                <p className="text-xs text-gray-400">Hardware wallet, never connects to dApps. Holds 90% of assets.</p>
              </div>
              <div className="px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="font-bold text-blue-400">2. The Operating Hub (Hot)</p>
                <p className="text-xs text-gray-400">Daily management. Funds burners, collects rewards. Moderate balance.</p>
              </div>
              <div className="px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <p className="font-bold text-purple-400">3. The Burner (Disposable)</p>
                <p className="text-xs text-gray-400">Ephemeral instance for a single NFT mint or risky swap. Drained immediately.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "The Golden Rule",
        type: "image",
        content: (
          <div className="space-y-4">
            <p className="text-red-400 font-bold uppercase tracking-tighter">Never link your identities!</p>
            <p>The biggest mistake is transferring funds directly from your <strong>Vault</strong> to a <strong>Burner</strong>. This creates an on-chain parent-child relationship that is trivial to track.</p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs font-mono text-purple-400">Pro Tip:</p>
              <p className="text-sm">Use a centralized exchange or a privacy pool as an intermediary. By sending funds to an exchange and then withdrawing into a fresh burner, you break the direct on-chain link.</p>
            </div>
          </div>
        ),
        image: "bitcoin-anonymity"
      },
      {
        title: "Identity Isolation",
        type: "infographic",
        content: (
          <div className="space-y-4">
            <p>Privacy isn&rsquo;t just about addresses; it&rsquo;s about <strong>Metatada</strong>. When you use your main browser for your burner wallet, you leak cookies, local storage, and fingerprints.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">🛡️ Use different <strong>Browser Profiles</strong> for different identities.</li>
              <li className="flex gap-2">🛡️ Brave/Firefox support sandboxed profiles to prevent &lsquo;Cross-Site Tracking&rsquo;.</li>
              <li className="flex gap-2">🛡️ Digital fingerprinting (screen res, fonts) can link you even without cookies.</li>
            </ul>
          </div>
        ),
        infographic: "isolation-diagram"
      }
    ],
    quiz: [
      {
        question: "What is the primary purpose of a Hierarchical layered wallet strategy?",
        options: [
          "To make transactions faster.",
          "To isolate risk and prevent linking your main wealth to risky dApp interactions.",
          "To avoid paying transaction fees."
        ],
        correctAnswer: 1,
        explanation: "By isolating activities into different layers, a compromise in a high-risk layer (burner) doesn't expose your secure layer (vault)."
      },
      {
        question: "Why should you avoid direct transfers between your Vault and your Burner?",
        options: [
          "It's too expensive.",
          "It creates a permanent, traceable link on the public ledger.",
          "Solana doesn't allow it."
        ],
        correctAnswer: 1,
        explanation: "Direct transfers are 'hard links' that surveillance companies use to map your entire wallet ecosystem."
      }
    ]
  },
  {
    id: "shielded-ips",
    title: "Shielded IPs",
    description: "Stop leaking your physical location with every transaction.",
    reward: "20 PRIVV",
    icon: Shield,
    slides: [
      {
        title: "The Silent Leak",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>Every time your wallet fetches a balance or sends a transaction, it connects to a server. That server sees your <strong>IP Address</strong>&mdash;the unique signature of your physical location and Internet Provider.</p>
            <div className="p-3 bg-orange-500/10 border-l-2 border-orange-500 rounded-r-lg">
              <p className="text-xs font-bold text-orange-400 uppercase">Warning:</p>
              <p className="text-sm text-gray-400 italic">&ldquo;Your digital wealth shouldn&rsquo;t be stamped with your home address.&rdquo;</p>
            </div>
            <p className="text-sm">Surveillance firms use these logs to map &lsquo;Rich Wallets&rsquo; to real-world houses, creating a significant physical security risk.</p>
          </div>
        ),
      },
      {
        title: "Digital Fingerprinting",
        type: "infographic",
        content: (
          <div className="space-y-4">
            <p>Even if you hide your IP, websites use <strong>Browser Fingerprinting</strong> to track you. They collect invisible data points to build a unique profile of your device.</p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-500">
              <div className="p-2 border border-white/5 rounded">Screen Resolution</div>
              <div className="p-2 border border-white/5 rounded">Installed Fonts</div>
              <div className="p-2 border border-white/5 rounded">Browser Version</div>
              <div className="p-2 border border-white/5 rounded">GPU Rendering (Canvas)</div>
            </div>
            <p className="text-sm text-gray-400">Fingerprinting is often more accurate than cookies because users rarely think to disable the &lsquo;harmless&rsquo; hardware attributes of their browser.</p>
          </div>
        ),
        infographic: "mapping-ip"
      },
      {
        title: "Building the Shield",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>To disappear, you need a <strong>VPN (Virtual Private Network)</strong>. It encrypts your traffic and routes it through a remote server, masking your true IP from dApps and observers.</p>
            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl">
              <p className="text-xs font-mono text-blue-400">Pro Tip:</p>
              <p className="text-sm">A VPN is the foundation, but <strong>Tor (The Onion Router)</strong> is the fortress. Tor routes your data through 3 different global relays, making it near-impossible for even the ISP to know what you&rsquo;re doing.</p>
            </div>
          </div>
        ),
      },
      {
        title: "The Privacy Stack",
        type: "infographic",
        content: (
          <div className="space-y-4">
            <p>True privacy requires a multi-layered <strong>Privacy Stack</strong>. One tool is never enough; you must stack your defenses.</p>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm"><Lock className="w-4 h-4 text-green-500 shrink-0" /> <strong>Hardened Browser:</strong> Brave or Firefox with strict tracking protection.</li>
              <li className="flex gap-2 text-sm"><Lock className="w-4 h-4 text-green-500 shrink-0" /> <strong>Encrypted Tunnel:</strong> A high-quality VPN with a &lsquo;No-Logs&rsquo; policy.</li>
              <li className="flex gap-2 text-sm"><Lock className="w-4 h-4 text-green-500 shrink-0" /> <strong>Identity Separation:</strong> Never log into social accounts (Google/X) in your &lsquo;Sovereign&rsquo; browser.</li>
            </ul>
          </div>
        ),
        infographic: "privacy-stack"
      }
    ],
    quiz: [
      {
        question: "What is 'Browser Fingerprinting'?",
        options: [
          "Using your finger to unlock your phone.",
          "Collecting minor software/hardware attributes to create a unique identifier.",
          "Printing out your transaction history."
        ],
        correctAnswer: 1,
        explanation: "Fingerprinting uses 'harmless' data like your fonts and screen size to track you across the web without cookies."
      },
      {
        question: "Why is a VPN considered a 'foundation' for crypto privacy?",
        options: [
          "It makes your transactions free.",
          "It masks your physical location (IP address) from RPC providers and dApps.",
          "It automatically generates private keys."
        ],
        correctAnswer: 1,
        explanation: "Without a VPN, every click and balance check leaks your physical location to the server operator."
      }
    ]
  },
  {
    id: "rpc-privacy",
    title: "RPC Privacy",
    description: "Take control of the pipes that carry your data.",
    reward: "30 PRIVV",
    icon: Cpu,
    slides: [
      {
        title: "The Blockchain Gateway",
        type: "content",
        content: (
          <div className="space-y-4">
            <p><strong>Remote Procedure Call (RPC)</strong> nodes are the traffic controllers. Your wallet doesn&rsquo;t talk to the entire blockchain; it talks to <em>one</em> node that relays your messages. Whoever owns that node is the &lsquo;all-seeing eye&rsquo; of your crypto life.</p>
            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
              <p className="text-xs font-mono text-purple-400">Did You Know?</p>
              <p className="text-sm">When you use a default wallet RPC, the provider logs not just that you sent a transaction, but even when you just <em>look</em> at your balance or prices.</p>
            </div>
          </div>
        ),
      },
      {
        title: "Public Surveillance",
        type: "infographic",
        content: (
          <div className="space-y-4">
            <p>Public RPC nodes (like Solana&rsquo;s Mainnet-beta) are heavily monitored gateways. They act as <strong>centralized chokepoints</strong> in an otherwise decentralized network.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">⚠️ <strong>Logging:</strong> Storing IP, wallet address, and request frequency.</li>
              <li className="flex gap-2">⚠️ <strong>Front-running:</strong> Malicious RPCs can &lsquo;peek&rsquo; at your trades and front-run them.</li>
              <li className="flex gap-2">⚠️ <strong>Censorship:</strong> An RPC can selectively refuse to broadcast your transaction.</li>
            </ul>
          </div>
        ),
        infographic: "rpc-logging"
      },
      {
        title: "Sovereign Connections",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>To take back control, you should switch to <strong>Custom RPCs</strong>. Many premium providers offer specialized endpoints with &lsquo;IP Scrubbing&rsquo; and &lsquo;Zero-Log&rsquo; policies.</p>
            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl">
              <p className="text-xs font-mono text-green-400">The Ultimate Goal:</p>
              <p className="text-sm italic">&ldquo;The only way to be 100% sure your data isn&rsquo;t being logged is to <strong>host your own node</strong>. You become your own gateway, answering to nobody but the protocol.&rdquo;</p>
            </div>
          </div>
        ),
      },
      {
        title: "Speed vs. Stealth",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>Interestingly, private RPCs are often <strong>faster</strong> than public ones. Because they have fewer users and better infrastructure, your transactions hit the network milliseconds earlier.</p>
            <p className="text-gray-400 text-sm">On Solana, those milliseconds can be the difference between a successful trade and a failed transaction during high volatility.</p>
          </div>
        )
      }
    ],
    quiz: [
      {
        question: "Why is a custom RPC better for privacy?",
        options: [
          "It makes transactions cheaper.",
          "It can offer 'IP scrubbing' and avoid the centralized logging of public gateways.",
          "It automatically encrypts your private keys."
        ],
        correctAnswer: 1,
        explanation: "Custom RPCs allow you to choose who you trust with your connection data, often opting for 'No-Logs' providers."
      }
    ]
  },
  {
    id: "dark-pools",
    title: "Dark Pool Liquidity",
    description: "Understand confidential trading via Anoncoin protocols.",
    reward: "40 PRIVV",
    icon: Lock,
    slides: [
      {
        title: "The Glass House",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>On a standard DEX, your trades are broadcast to a public <strong>Mempool</strong>. Specialized <strong>MEV (Maximal Extractable Value)</strong> bots watch this mempool 24/7 like predators.</p>
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-2xl">
              <p className="text-xs font-mono text-red-400 italic">&ldquo;The bot sees you before you see the block.&rdquo;</p>
              <p className="text-sm mt-1">If you swap $10k, a bot will jump ahead of your trade (front-run) and force you to buy higher, stealing your slippage as profit.</p>
            </div>
          </div>
        ),
      },
      {
        title: "The Dark Pool concept",
        type: "infographic",
        content: (
          <div className="space-y-4">
            <p>A <strong>Dark Pool</strong> is a private trading venue where orders are hidden from the public eye. Trades are matched internally, and only the final result is settled on-chain.</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">🕶️ <strong>Invisible Intent:</strong> No public mempool, no bot front-running.</li>
              <li className="flex gap-2">🕶️ <strong>ZK-Verification:</strong> Prove you have the funds without revealing your balance.</li>
              <li className="flex gap-2">🕶️ <strong>Price Protection:</strong> Large trades don&rsquo;t alert the market until they are done.</li>
            </ul>
          </div>
        ),
        infographic: "dark-pool-viz"
      },
      {
        title: "Confidential Trading",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>Anoncoin leverages <strong>Zero-Knowledge Proofs (ZKPs)</strong> to enable dark pools on Solana. This allows for &lsquo;Trustless Confidentiality&rsquo;&mdash;you don&rsquo;t have to trust a middleman; you trust the math.</p>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-xs font-mono text-purple-400 uppercase">A Cypherpunk standard:</p>
              <p className="text-sm italic">&ldquo;Privacy is the power to selectively reveal oneself to the world.&rdquo;</p>
            </div>
          </div>
        ),
      },
      {
        title: "The MEV Shield",
        type: "content",
        content: (
          <div className="space-y-4">
            <p>By using a Dark Pool, you effectively &lsquo;exit the glass house&rsquo;. Because the bots can never see your encrypted intents, they have nothing to front-run or sandwich.</p>
            <p className="text-sm text-gray-400">Institutional traders use dark pools to move millions without moving the market price. Anoncoin brings this same protection to you.</p>
          </div>
        )
      }
    ],
    quiz: [
      {
        question: "How does a Dark Pool protect against MEV bots?",
        options: [
          "It bans bots from the platform.",
          "It keeps transaction intent encrypted and hidden from the public mempool.",
          "It uses faster servers than the bots."
        ],
        correctAnswer: 1,
        explanation: "Bots can only exploit what they can see. In a dark pool, your orders are invisible until settled."
      },
      {
        question: "What technology allows Anoncoin to verify trades without revealing balances?",
        options: [
          "Cloud Computing.",
          "Zero-Knowledge Proofs (ZKPs).",
          "Public API logs."
        ],
        correctAnswer: 1,
        explanation: "ZKPs allow a party to prove a statement is true without revealing any information beyond the statement's validity."
      }
    ]
  }
];
