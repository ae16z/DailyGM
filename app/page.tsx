// app/page.tsx
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { base } from 'wagmi/chains';
import { useState } from 'react';

// Ganti dengan alamat kontrak GM kamu nanti (sementara kosong)
const GM_CONTRACT_ADDRESS = '0x...'; 
const GM_ABI = []; // isi ABI saat kontrak sudah ada

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const [isGMing, setIsGMing] = useState(false);

  const { data: hash, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleGM = () => {
    if (!isConnected) return;
    if (chain?.id !== base.id) {
      alert('Please switch to Base network');
      return;
    }

    // Nanti: panggil fungsi kontrak di sini
    // writeContract({ address: GM_CONTRACT_ADDRESS, abi: GM_ABI, functionName: 'sayGM' });
    
    setIsGMing(true);
    setTimeout(() => {
      alert('GM! 🌞 Your onchain greeting is noted.');
      setIsGMing(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Daily GM</h1>
        <p className="text-lg mb-8 opacity-90">
          Connect your wallet, say “GM”, and spread good vibes on Base.
        </p>

        <div className="mb-6">
          <ConnectButton />
        </div>

        {isConnected && (
          <button
            onClick={handleGM}
            disabled={isGMing || isConfirming}
            className={`px-6 py-3 font-semibold rounded-full shadow-lg transition ${
              isGMing || isConfirming
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-white text-indigo-900 hover:bg-gray-100'
            }`}
          >
            {isGMing || isConfirming ? 'GM-ing...' : 'GM!'}
          </button>
        )}

        {isConnected && chain?.id !== base.id && (
          <p className="mt-4 text-yellow-300 text-sm">
            ⚠️ Switch to Base network to say GM.
          </p>
        )}

        <p className="mt-8 text-sm opacity-70">
          A fundingless project. Built with ❤️, zero VC, and pure GM energy.
        </p>
      </div>
    </main>
  );
}
