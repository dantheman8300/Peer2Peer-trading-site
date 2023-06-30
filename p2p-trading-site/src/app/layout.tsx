'use client'

import './globals.css'
import { Inter } from 'next/font/google'

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { MSafeWalletAdapter } from 'msafe-plugin-wallet-adapter';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const wallets = [
    new PetraWallet(), 
    new MartianWallet(), 
    new RiseWallet(),
    new PontemWallet(),
    new FewchaWallet(),
    new MSafeWalletAdapter()
  ];


  return (
    <html lang="en">
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <body className={inter.className}>{children}</body>
      </AptosWalletAdapterProvider>
    </html>
  )
}
