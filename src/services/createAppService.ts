import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { AppError } from '../errors';

interface Request {
       valor: string;

}


class CreateAppService  {

    private appRepository: IAppRepository;

    constructor(){
        this.appRepository = new AppRepository();
    }

    public async execute ({ valor}: Request ): Promise <void>{
        // if(!id) {
        //     throw new AppError('id não informado')
        // }

        if(!valor) {
            throw new AppError('valor não informado')
        }

        try {
            await this.appRepository.create({valor})
        }
        catch(err){
            throw new AppError('Erro ao realizar cadastro ', 500)
        }

    }

}

export default CreateAppService;