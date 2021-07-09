import { IApp } from './../@types/IApp';
import AppRepository, { IAppRepository } from '../repositories/AppRepository';
import { AppError } from '../errors';

interface Request {
    id: string,
}

class GetAllService {
    private appRepository: IAppRepository;

    constructor()
    {
        this.appRepository = new AppRepository();
    }



    public async execute  (): Promise<IApp[]>
    {
        try {
            const app = await this.appRepository.buscaAll();

            // if(!app)
            // {
            //     throw new AppError('Não existe resultado com esse ID', 404)
            // }
            return app; 
        } catch ( err)
        {
            throw new AppError(err.message,err.statusCode)
        }
    }


}

export default GetAllService;