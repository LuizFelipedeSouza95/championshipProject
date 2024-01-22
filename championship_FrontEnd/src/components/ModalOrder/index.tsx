import Modal from 'react-modal';
import style from './style.module.scss';
import { FiX } from 'react-icons/fi';
import { ChampionshipsProps } from '../../pages/championships'

interface ModalChampionshipsProps {
    isOpen: boolean;
    onRequestClose: () => void;
    championships: ChampionshipsProps[];
    //handleFinishOrder: (id: string) => void
}

export function ModalOrder({ isOpen, onRequestClose, championships, /* handleFinishOrder */ }: ModalChampionshipsProps) {

    const customStyle = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%',
            backgroundColor: '#1d1d2e',
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyle}
        >
            <button
                type='button'
                onClick={onRequestClose}
                className='react-modal-close'
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color='#f34748' />
            </button>

            <div className={style.container}>
                <h2>Detalhes do Campeonato</h2>

                <span className={style.table}>
                    Nome: <strong>{championships[0].name}</strong>
                </span>
                <br />
                <span className={style.table}>
                    Maximo de Jogadores: <strong>{championships[0].maxPlayers}</strong>
                </span>
                <br />
                <span className={style.table}>
                    Jogadores participando: <strong>{championships[0].players.length}</strong>
                </span>

                {/*                 {championships.map(item => (
                    <section key={item.id} className={style.containerItem}>
                        <span className={style.title}>{item.players}</span>
                    </section>
                ))} */}

                {/*                 <button className={style.buttonOrder} onClick={() => handleFinishOrder(championships[0].id)}>
                    Concluir pedido
                </button> */}

            </div>
        </Modal>
    )
}