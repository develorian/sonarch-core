import { AdapterWeb3 } from '/src/infra/web3/adapterWeb3.js';

export const iniciarEnjambreUseCase = async () => {
    try {
        console.log(">> [UseCase] Iniciando protocolo de enjambre...");
        const billetera = await AdapterWeb3.conectarBilletera();
        const nodos = await AdapterWeb3.obtenerNodosActivos();
        return { success: true, billetera, nodos };
    } catch (error) {
        console.error(">> [UseCase] Fallo de conexión soberana", error);
        return { success: false, error };
    }
};