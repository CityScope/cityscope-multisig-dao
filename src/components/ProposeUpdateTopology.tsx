import { FC, useState, useEffect, ChangeEvent } from 'react';
import { IMultisigTransaction, ITopology, IUpdateTopologyData } from '../model';
import { PublicKey } from '@solana/web3.js';
import { updateTopology } from '../rpc';
import { fetchTopology } from '../fetch';
import { projectName } from '../constants';
import { getCityIoValues, getCityIoNodeLabels } from '../cityio';

type IProposeProps = {
	signer: PublicKey,
	mTx: IMultisigTransaction,
}

const ProposeUpdateTopology: FC<IProposeProps> = ({ signer, mTx }) => {

	const [nodeLabels, setNodeLabels] = useState<string[]>([]);
	const [nodeValues, setNodeValues] = useState<number[]>([]);
	const [updateInfo, setUpdateInfo] = useState<IUpdateTopologyData>(
		{ id: -1, value: -1 }
	);
	const [topologyAccount, setTopologyAccount] = useState<undefined | { publicKey: PublicKey, data: ITopology }>(undefined);
	const [disabled, setDisabled] = useState<boolean>(true);

	useEffect(() => {
		if (nodeValues.length === 0 || nodeLabels.length === 0) {
			const getData = async () => {
				setNodeLabels(await getCityIoNodeLabels());
				setNodeValues(await getCityIoValues());
				const account = await fetchTopology(projectName);
				setTopologyAccount(account);
			}
			getData();
		}
	}, [nodeValues, nodeLabels])

	const labelSelect = () => {
		if (nodeLabels.length !== 0) {
			const options = nodeLabels.slice(0,-4).map((v, i) => {
				const value = i + 4;
				return (<option value={value} key={`${i}-${v}`}>{v}</option>)
			})
			return (
				<select className="p-3 px-5 rounded-full bg-white font-semibold text-xl" name="label" onChange={labelChange}>
					{options}
				</select>
			)
		}
	}

	const labelChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setUpdateInfo({ ...updateInfo, id: parseInt(e.target.value) });
		if (updateInfo.value === -1) setDisabled(true);
		else if (nodeValues[parseInt(e.target.value)] === updateInfo.value) setDisabled(true);
		else setDisabled(false);
	}

	const valueSelect = () => {
		if (nodeLabels.length !== 0) {
			const options = ['none', 'agriculture', 'heavy industry', 'office'].map((v, i) => {
				return (<option key={`value-${v}`} value={i}>{v}</option>)
			})
			return (
				<select className="p-3 px-5 rounded-full bg-white font-semibold text-xl" name="value" onChange={valueChange}>
					{options}
				</select>
			)
		}
	}

	const valueChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setUpdateInfo({ ...updateInfo, value: parseInt(e.target.value) });
		if (updateInfo.id === -1) setDisabled(true);
		else if (nodeValues[updateInfo.id] === parseInt(e.target.value)) setDisabled(true);
		else setDisabled(false);
	}

	const handleSubmit = async () => {
		if (topologyAccount) {
			await updateTopology(
				topologyAccount.publicKey,
				updateInfo,
				signer,
				mTx
			);
		}
		setDisabled(true);
	}

	return (<>
		<div className="flex flex-col mb-10 space-y-5">
			<div>
				<div className="font-semibold">Update Node Value:</div>
				<p className="max-w-lg">changes the value of the selected node. The cooresponding node and its connections are shown below. The values indicate the following.</p>
				<img className="w-full" src={`${process.env.PUBLIC_URL}city.png`} alt="topology" />
			</div>
			<div className="max-w-lg">
				<div className="flex flex-row justify-between pr-3 text-xl mb-5 items-center">
					<div>
						change zone {labelSelect()}
					</div>
					<div className="align-middle">
						to
					</div>
					<div>
						{valueSelect()}
					</div>
				</div>
				<button onClick={handleSubmit} disabled={disabled} className="p-3 bg-white border border-4 border-gray-800 font-semibold hover:bg-gray-500 hover:text-gray-100 hover:border-gray-500 active:bg-gray-800 active:border-gray-800 active:text-gray-100 disabled:border-gray-200 disabled:bg-gray-200 disabled:text-gray-400 rounded-full"> submit </button>
			</div>
		</div>
	</>
	)
}


export default ProposeUpdateTopology;
