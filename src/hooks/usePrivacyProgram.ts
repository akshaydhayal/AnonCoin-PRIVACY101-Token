'use client';

import { useMemo } from 'react';
import { PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program, Idl, BN } from '@coral-xyz/anchor';
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import idlData from '@/lib/idl.json';
import { PrivacyProgram } from '@/lib/types/privacy_program';

// Use the address from the IDL or a hardcoded one if preferred
export const PROGRAM_ID = new PublicKey("GHTszogQs3yHDPU4L5wQDRgcnddQh2nkizuuXAoFTpqG");

export function usePrivacyProgram() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return new AnchorProvider(connection, wallet, {
      preflightCommitment: 'processed',
    });
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider) return null;
    return new Program(idlData as Idl, provider) as Program<PrivacyProgram>;
  }, [provider]);

  const getUserProgressPDA = (userPubkey: PublicKey) => {
    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user-progress"), userPubkey.toBuffer()],
      PROGRAM_ID
    );
    return pda;
  };

  return {
    program,
    provider,
    getUserProgressPDA,
    wallet,
    publicKey: wallet?.publicKey,
    BN,
  };
}
