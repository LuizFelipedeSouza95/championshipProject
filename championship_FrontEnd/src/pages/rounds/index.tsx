import { useState, FormEvent } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { InputRounds } from "../../components/ui/input";
import { ButtonSaveRound } from "../../components/ui/Button";
import { toast, Zoom } from 'react-toastify';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { log } from 'console';

type RoundsProps = {
    id: string;
    roundNumber: number;
    homePlayer_id: string;
    homePlayer: string;
    scoreHome: number;
    scoreVisiting: number;
    visitingPlayers_id: string;
    visitingPlayers: string;
    disabledInputs: boolean;
}

interface HomeProps {
    rounds: RoundsProps[];
}

export default function Classification({ rounds }: HomeProps) {
    const [roundsList, setRoundsList] = useState(rounds || []);

    // Agrupa os itens por número da rodada
    const roundsMap = new Map<number, Array<any>>();
    roundsList.forEach((item) => {
        const roundNumber = item.roundNumber;
        const roundItems = roundsMap.get(roundNumber) || [];
        roundItems.push(item);
        roundsMap.set(roundNumber, roundItems);
    });

    // Converte o mapa de rodadas em uma lista de componentes
    const roundsListComponents = Array.from(roundsMap.entries()).map(
        ([roundNumber, roundItems]) => {
            const roundTitle = `Rodada ${roundNumber}`;
            const roundItemsComponents = roundItems.map((item) => {
                return (

                    <div key={item.id} className={style.game}>

                        <div className={style.dadosRounds}>
                            <div className={style.roundGame}>
                                <label>{item.homePlayer}</label>
                                <InputRounds
                                    type="text"
                                    value={item.scoreHome}
                                />
                            </div>
                            <div className={style.roundGame}>
                                <label>{item.visitingPlayers}</label>
                                <InputRounds
                                    type="text"
                                    value={item.scoreVisiting}
                                />
                            </div>
                            <div className={style.buttonMain}>
                                <ButtonSaveRound
                                    //className={style.buttonSaveRound}
                                    type="submit"
                                >
                                    Salvar
                                </ButtonSaveRound>
                            </div>
                        </div>

                    </div>

                );
            });
            return (
                <section key={roundNumber} className={style.section}>
                    <h2>{roundTitle}</h2>
                    <div className={style.grid}>{roundItemsComponents}</div>
                </section>
            );
        }
    );

    return (
        <>
            <Head>
                <title>Campeonato - Rodadas</title>
            </Head>

            <Header />

            <main className={style.containerMain}>
                <h1>Rodadas</h1>
                <section className={style.grid}>{roundsListComponents}</section>
            </main>
        </>
    );
}




export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)

    const response = await apliClient.get('/all-round');

    return {
        props: {
            rounds: response.data
        }
    }
})