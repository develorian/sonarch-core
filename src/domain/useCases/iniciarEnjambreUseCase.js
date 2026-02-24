import { AdapterWeb3 } from '../../infraestructure/web3/adapterWeb3.js';

export class IniciarEnjambreUseCase {
    constructor() { this.web3 = new AdapterWeb3(); }
    async execute(username) {
        try {
            const success = await this.web3.connectSwarm(`node_${username}`);
            return { success, message: "Conectado al enjambre con seguridad PQ." };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}