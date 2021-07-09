 
import { Request, Response} from 'express';
import CreateAppService from '../services/createAppService';
import DeleteAppService from '../services/deleteService';
import getByid from '../services/geById';
// import UpdateAppService from '../services/UpdateAppService';

export default class AppController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params ;

        const showAppService = new getByid();

        try {
            const app = await showAppService.execute({id: id as string});
            return response.json(app);
        } catch (err) {
            return response.status(err.statusCode).json({ message: err.message});
        }
    }

    public async create( request:Request, response: Response): Promise<Response>{
        const body = request.body;

        const createAppService = new CreateAppService();
        try{
            await createAppService.execute(body);
            return response.json ( { message: 'sucesso ao realizar cadastro'})
        }catch(err)
        {
            return response.status(err.statusCode).json({message: err.message})
        }
        

    }

    // public async create(request: Request, response: Response): Promise<Response> {
    //     const body = request.body;

    //     const createAppService = new CreateAppService();

    //     try {
    //         await createAppService.execute(body);
    //         return response.json({ message: 'Sucesso ao realizar cadastro'});
    //     } catch (err) {
    //         return response.status(err.statusCode).json({ message: err.message});
    //     }
    // }

    // public async update(request: Request, response: Response): Promise<Response> {
    //     const body = request.body;

    //     const updateAppService = new UpdateAppService();

    //     try {
    //         await updateAppService.execute(body);
    //         return response.json({ message: 'Sucesso ao atualizar App'});
    //     } catch (err) {
    //         return response.status(err.statusCode).json({ message: err.message});
    //     }
    // }
    public async delete (request: Request, response:Response): Promise<Response>
    {
        const {id} = request.params;

        const deleteAppService = new  DeleteAppService();

        try{
            await deleteAppService.execute({id: id as string });
            return response.json({message: 'Exclusão com sucesso'});
        }
        catch (err){
            return response.status(err.statusCode).json({message:err.message})
        }
    }

    // public async delete(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params ;

    //     const deleteAppService = new DeleteAppService();

    //     try {
    //         await deleteAppService.execute({id: id as string});
    //         return response.json({ message: 'Sucesso ao excluir App'});
    //     } catch (err) {
    //         return response.status(err.statusCode).json({ message: err.message});
    //     }
    // }
}