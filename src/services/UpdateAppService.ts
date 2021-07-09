import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { IApp } from '../@types/IApp';
import { AppError } from '../errors';

interface Request {
    id: string;
    valor: string;
}

class UpdateAppService {
    private appRepository: IAppRepository;

    constructor(){
        this.appRepository = new AppRepository();
    }

    public async execute({id, valor}: Request): Promise<void> {

        if(!id) {
            throw new AppError('ID não informado')
        }

        if(!valor) {
            throw new AppError('valor não informado')
        }

       
        try {
            await this.appRepository.update({ id, valor});
        } catch (err) {
            throw new AppError('Erro ao atualizar App', 500)
        }

    }
}

export default UpdateAppService;