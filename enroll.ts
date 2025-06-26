
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3Prereq";
import wallet from "./turbin.json";

const MPL_CORE_PROGRAM_ID = new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d");
const mintCollection = new PublicKey("5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2");
const SYSTEM_PROGRAM_ID = SystemProgram.programId;

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
const provider = new AnchorProvider(connection, new Wallet(keypair), { commitment: "confirmed" });
const program = new Program<Turbin3Prereq>(IDL, new PublicKey("TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM"), provider);


const account_seeds = [
    Buffer.from("prereqs"),
    keypair.publicKey.toBuffer(),
];
const [account_key, _account_bump] = PublicKey.findProgramAddressSync(account_seeds, program.programId);


const mintTs = Keypair.generate();


const GITHUB_USERNAME = "https://github.com/022-Agamsingh";


(async () => {
    try {
        const txhash = await program.methods
            .initialize(GITHUB_USERNAME)
            .accounts({
                user: keypair.publicKey,
                account: account_key,
                systemProgram: SYSTEM_PROGRAM_ID,
            })
            .signers([keypair])
            .rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();


(async () => {
    try {

        const [authority, _bump] = PublicKey.findProgramAddressSync(
            [Buffer.from("collection"), mintCollection.toBuffer()],
            program.programId
        );

        const txhash = await program.methods
            .submitTs()
            .accounts({
                user: keypair.publicKey,
                account: account_key,
                mint: mintTs.publicKey,
                collection: mintCollection,
                authority: authority,
                mplCoreProgram: MPL_CORE_PROGRAM_ID,
                systemProgram: SYSTEM_PROGRAM_ID,
            })
            .signers([keypair, mintTs])
            .rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();