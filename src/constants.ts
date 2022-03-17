import { BorshAccountsCoder, BorshInstructionCoder, Idl } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import nIdl from './idl/namaph_multisig.json';
import mIdl from './idl/serum_multisig.json';

export const projectName = 'cityscience-v0.1.0';
export const url = 'https://solana-api.projectserum.com'

export const namaphProgram: PublicKey = new PublicKey(nIdl.metadata.address);
export const multisigProgram: PublicKey = new PublicKey(mIdl.metadata.address);
export const connection: Connection = new Connection(url);

export const namaphACoder: BorshAccountsCoder = new BorshAccountsCoder(nIdl as Idl);
export const multisigACoder: BorshAccountsCoder = new BorshAccountsCoder(mIdl as Idl);

export const namaphICoder: BorshInstructionCoder = new BorshInstructionCoder(nIdl as Idl);
export const multisigICoder: BorshInstructionCoder = new BorshInstructionCoder(mIdl as Idl);

export const discordInviteLink: string = 'https://discord.gg/eFNzXbEr5j';
export const githubOrgLink: string = 'https://github.com/namaph';
