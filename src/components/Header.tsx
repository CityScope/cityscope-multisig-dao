import { projectName } from "../constants"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Navigation from "./Navigation";
import { useContext } from "react";
import { AppStateContext } from "../workspace";
import { AppState } from "../model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Title = () => {
	// just for photo readyness...
	return (
		<h1 className="text-lg font-semibold flex-auto">Namaph <span className="italic">{projectName}</span></h1>
	)
}

const Status = () => {

	const value = useContext(AppStateContext);

	switch (value) {
		case AppState.Disconnected:
			return (
				<div className="flex flex-col text-red-500">
					<FontAwesomeIcon className="mb-1" icon={faCircleXmark} />
					<p className="text-xs"> disconnected </p>
				</div>
			)
		case AppState.WalletConnected:
			return (
				<div className="flex flex-col text-yellow-500">
					<FontAwesomeIcon className="mb-1" icon={faCircleExclamation} />
					<p className="text-xs"> not a member </p>
				</div>

			)
		case AppState.Member:
			return (
				<div className="flex flex-col text-green-500">
					<FontAwesomeIcon className="mb-1" icon={faCircleCheck} />
					<p className="text-xs"> member </p>
				</div>
			)
	}
}

const Header = () => {
	return (
		<>
			<div className="flex flex-col space-y-6">
			<div className="place-self-end">
					<WalletMultiButton />
				</div>

				<div className="flex flex-col">
				<div className="flex flex-row">
					<Title />
					<Status />
				</div>
				<div className="mt-5 mb-3 p-3 bg-white font-semibold text-center">"Namaph" is an attempt to develop a biodiversity simulation together with everyone.</div>
				</div>

				<Navigation />
			</div>
		</>
	)
}

export default Header;
