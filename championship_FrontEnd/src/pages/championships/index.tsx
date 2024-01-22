import { useState } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header'
import style from './style.module.scss';
import { setupAPIClient } from '@/src/services/api';
import { canSSRAuth } from '@/src/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Modal from 'react-modal';
import { ModalOrder } from '../../components/ModalOrder';

export type ChampionshipsProps = {
    id: string;
    name: string | null
    maxPlayers: number;
    players: string[];
}

interface HomeProps {
    championships: ChampionshipsProps[];
}

export default function Classification({ championships }: HomeProps) {

    const [championshipsList, setchampionshipsList] = useState(championships || [])
    const [modalItem, setModalItem] = useState<ChampionshipsProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    function handleClosedModal() {
        setModalVisible(false)
    }

    async function handleOpenModalView(id: string) {
        const apliClient = setupAPIClient();
        const response = await apliClient.get('/one-championship', {
            params: {
                id: id
            }
        })
        setModalItem(response.data)
        setModalVisible(true)
    }

    /*     async function handleFinishItem(id: string) {
            const apiClient = setupAPIClient();
            await apiClient.put('/order/finish', {
                order_id: id,
            })
            const response = await apiClient.get('/all-championship');
            championshipsOrderList(response.data);
            setModalVisible(false);
        } */

    async function handleRefreshOrders() {
        const apiClient = setupAPIClient();
        const response = await apiClient.get('/all-championship')
        setchampionshipsList(response.data);
    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Campeonato - Home</title>
            </Head>

            <Header />

            <main className={style.containerMain}>

                <section className={style.container}>

                    <div className={style.containerHeader}>
                        {/* <h1>Últimos pedidos</h1> */}
                        <button onClick={handleRefreshOrders}>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>

                    <article className={style.listChampionships}>

                        {championshipsList.length === 0 && (
                            <span className={style.emptyList}>
                                Nenhum campeonato foi encontrado...
                            </span>
                        )}

                        {championshipsList.map(item => (
                            <section key={item.id} className={style.championshipsItem}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={style.tag}></div>
                                    <span>{item.name}</span>
                                </button>
                            </section>
                        ))}

                    </article>

                </section>

            </main>

            {modalVisible && modalItem.length > 0 && (
                <ModalOrder
                    isOpen={modalVisible}
                    onRequestClose={handleClosedModal}
                    championships={modalItem}
                //handleFinishOrder={handleFinishItem}
                />
            )}

        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apliClient = setupAPIClient(ctx)
    const response = await apliClient.get('/all-championship');
    return {
        props: {
            championships: response.data
        }
    }
})