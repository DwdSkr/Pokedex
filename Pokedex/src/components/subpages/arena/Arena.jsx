import { useContext, useState } from 'react';
import { ArenaContext } from '../../../context/ArenaContext';
import { DataContext } from '../../../context/DataContext';
import PokemonTemplate from '../../shared/template/PokemonTemplate';
import { Box, Typography, Button, Card } from '@mui/material';
import List from '../../shared/ListHolder';
import FightModal from './FightModal';
import useConditionalSendData from '../../../hooks/useConditionalSendData';
import { SyncDataContext } from '../../../context/SyncDataContext';

const Arena = () => {
	const { currentArenaPokemon, isFight, setIsFight, pokemonStats } =
		useContext(ArenaContext);
	const { sendData } = useConditionalSendData();
	const { syncList } = useContext(SyncDataContext);
	const { pokemonList } = useContext(DataContext);

	const [winner, setWinner] = useState({});
	const [isDraw, setIsDraw] = useState(false);

	function fight() {
		setIsFight(true);

		const firstPokemon = pokemonList.filter(
			(el) => el.id === currentArenaPokemon[0].id
		)[0];
		const secondPokemon = pokemonList.filter(
			(el) => el.id === currentArenaPokemon[1].id
		)[0];

		const battleMath =
			Number(firstPokemon.base_experience) * Number(firstPokemon.weight) -
			Number(secondPokemon.base_experience) * Number(secondPokemon.weight);
		const sendWinnerStats = (pokemon) => {
			if (pokemonStats.some((el) => el.id === pokemon.id)) {
				const filter = pokemonStats.filter((el) => el.id === pokemon.id)[0];
				return {
					...filter,
					stats: {
						win: (Number(filter.stats.win) + 1).toString(),
						lose: filter.stats.lose,
					},
				};
			} else {
				return {
					id: pokemon.id,
					name: pokemon.name,
					stats: { win: '1', lose: '0' },
				};
			}
		};

		const sendLoserStats = (pokemon) => {
			if (pokemonStats.some((el) => el.id === pokemon.id)) {
				const filter = pokemonStats.filter((el) => el.id === pokemon.id)[0];
				return {
					...filter,
					stats: {
						win: filter.stats.win,
						lose: (Number(filter.stats.lose) + 1).toString(),
					},
				};
			} else {
				return {
					id: pokemon.id,
					name: pokemon.name,
					stats: { win: '0', lose: '1' },
				};
			}
		};

		if (battleMath > 0) {
			setWinner(firstPokemon);

			const sendWinner = async () => {
				await sendData(syncList, 'pokemon-list', {
					...firstPokemon,
					base_experience: (
						Number(firstPokemon.base_experience) + 10
					).toString(),
				});
				await sendData(pokemonStats, 'ranking', sendWinnerStats(firstPokemon));
			};
			const sendLoser = async () => {
				await sendData(syncList, 'pokemon-list', {
					...secondPokemon,
				});
				await sendData(pokemonStats, 'ranking', sendLoserStats(secondPokemon));
			};
			sendWinner();
			sendLoser();
		} else if (battleMath < 0) {
			setWinner(secondPokemon);
			const sendWinner = async () => {
				await sendData(syncList, 'pokemon-list', {
					...secondPokemon,
					base_experience: (
						Number(secondPokemon.base_experience) + 10
					).toString(),
				});
				await sendData(pokemonStats, 'ranking', sendWinnerStats(secondPokemon));
			};
			const sendLoser = async () => {
				await sendData(syncList, 'pokemon-list', {
					...firstPokemon,
				});
				await sendData(pokemonStats, 'ranking', sendLoserStats(firstPokemon));
			};
			sendWinner();
			sendLoser();
		} else if (battleMath === 0) {
			setIsDraw(true);
			const postDrawStats = async () => {
				await Promise.all(
					currentArenaPokemon.map((obj) => {
						const data = pokemonStats.filter((stat) => stat.id === obj.id);
						if (data.length !== 1) {
							sendData(pokemonStats, 'ranking', {
								id: obj.id,
								name: obj.name,
								stats: { win: '0', lose: '0' },
							});
						}
					})
				);
			};
			postDrawStats();
		}
	}

	return (
		<Box>
			{isFight && <FightModal winner={winner} draw={isDraw} />}

			<Box
				sx={{
					display: 'flex',
					width: '100%',
					flexDirection: { md: 'row', xs: 'column' },
					justifyContent: 'space-evenly',
					alignItems: 'center',
					height: 'auto',
					gap: '20px',
				}}
			>
				<Box sx={{ width: '300px' }}>
					{currentArenaPokemon[0] ? (
						<PokemonTemplate
							pokemonDetails={
								pokemonList.filter(
									(el) => el.id === currentArenaPokemon[0].id
								)[0]
							}
						/>
					) : (
						<Card sx={{ width: '300px', height: '422px' }} />
					)}
				</Box>
				<Box sx={{ alignItems: 'baseline', maxWidth: '100px', width: '100%' }}>
					<Button
						disabled={currentArenaPokemon.length === 2 ? false : true}
						onClick={fight}
						sx={{ width: '100%' }}
					>
						Walcz
					</Button>
				</Box>

				<Box sx={{ width: '300px' }}>
					{currentArenaPokemon[1] ? (
						<PokemonTemplate
							pokemonDetails={
								pokemonList.filter(
									(el) => el.id === currentArenaPokemon[1].id
								)[0]
							}
						/>
					) : (
						<Card sx={{ width: '300px', height: '422px' }} />
					)}
				</Box>
			</Box>
			<Typography sx={{ marginTop: '20px' }} variant='h5'>
				Przeglądaj na bieżąco
			</Typography>
			<List list={pokemonList} />
		</Box>
	);
};
export default Arena;
