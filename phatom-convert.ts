import bs58 from 'bs58';
import * as promptSync from 'prompt-sync';
import * as fs from 'fs';


// const prompt = promptSync();
const prompt = require('prompt-sync')();

// Option 1: Convert wallet array to base58 (for Phantom)
function walletToBase58() {
    // Replace with your actual private key array
    const walletArray = [235,42,86,43,84,186,30,217,195,239,204,193,75,166,42,20,167,247,224,206,149,109,10,194,249,210,105,5,136,135,253,214,91,223,174,116,253,195,109,134,211,142,173,12,69,83,76,26,61,255,107,63,243,236,17,15,128,203,27,176,240,111,250,13];
    const base58 = bs58.encode(Uint8Array.from(walletArray));
    console.log('Phantom import string:', base58);
}

// Option 2: Convert base58 (from Phantom) to wallet array
function base58ToWallet() {
    const base58 = prompt('Enter your Phantom private key (base58): ');
    const wallet = bs58.decode(base58);
    console.log('Solana wallet array:', Array.from(wallet));
}

// CLI menu
console.log('Choose an option:');
console.log('1. Convert wallet array to Phantom base58');
console.log('2. Convert Phantom base58 to wallet array');
const choice = prompt('Enter 1 or 2: ');

if (choice === '1') {
    walletToBase58();
} else if (choice === '2') {
    base58ToWallet();
} else {
    console.log('Invalid choice.');
}