
// ------------------------------------------------------
// Importa o arquivo de conexão com o banco de dados
// ------------------------------------------------------
import banco from '../config/banco';
import pg from 'pg';
import { IApp } from '../@types/IApp';
import { ICreateAppDTO, IUpdateAppDTO } from './DTO';
import { AppError } from '../errors';

export interface IAppRepository {
    // findById: (id: string) => Promise<IApp>;
    delete: (id: string) => Promise<void>;
    create: (body: ICreateAppDTO) => Promise<void>;
    buscaById: (id: string) => Promise<IApp>
    // update: (body: IUpdateAppDTO) => Promise<void>;
}

class AppRepository implements IAppRepository {
    private postgres: pg.Client | undefined;

    constructor() {
    }

    public async create({ id, valor, }: ICreateAppDTO): Promise<void> {
        this.postgres = new pg.Client(banco.connection);
        this.postgres.connect();

        let query = {
            name: 'create-app',
            text: `INSERT INTO apps (id, valor) VALUES ('${id}', '${valor}')`,
            values: []
        }

        try {
            await this.postgres.query(query);
        } catch (err) {
            console.log(err);
            throw err;
        } finally {
            this.postgres.end();
        }
    }
    //busca por uma conta de energia por ID 
    public async buscaById(id: string): Promise<IApp> {
        this.postgres = new pg.Client(banco.connection);
        this.postgres.connect();

        let query = {
            name: 'busca-by-id',
            text: `SELECT * FROM Energia WHERE id= ${id}`,
            values: []
        }
        try {
            const app = await this.postgres.query(query)
            return app.rows[0];
        } catch (err) {
            console.log(err);
            throw new AppError('Erro ao fazer consulta ', 500)
        }
        finally{
            //fechar conexão com o banco
            this.postgres.end();

        }
    }


    // public async findById(id: string): Promise<IApp> {
    //     this.postgres = new pg.Client(banco.connection);
    //     this.postgres.connect();

    //     let query = {
    //         name: 'busca-app-por-id',
    //         text: `SELECT * FROM apps WHERE id = ${id}`,
    //         values: []
    //     }

    //     try {
    //         const app = await this.postgres.query(query);

    //         return app.rows[0];
    //     } catch(err) {
    //         console.log(err);
    //         throw new AppError('Erro ao fazer consulta', 500)
    //     } finally {
    //         this.postgres.end();
    //     }
    // }

    public async delete (id:string):Promise<void>{
         this.postgres = new pg.Client(banco.connection);
         this.postgres.connect();
         let query ={
             name:'delete-by-id',
             text:`DELETE FROM Energia WHERE id = ${id}`
         }
         try{
             await this.postgres.query(query);

         }catch(err){
             throw err;
         } finally{
             this.postgres.end();
         }
    }


    // public async delete(id: string): Promise<void> {
    //     this.postgres = new pg.Client(banco.connection);
    //     this.postgres.connect();

    //     let query = {
    //         name: 'deleta-app-por-id',
    //         text: `DELeTE FROM apps WHERE id = ${id}`,
    //         values: []
    //     }

    //     try {
    //         await this.postgres.query(query);
    //     } catch(err) {
    //         throw err;
    //     } finally {
    //         this.postgres.end();
    //     }
    // }

    // public async update({ id, valor }: IUpdateAppDTO): Promise<void> {
    //     this.postgres = new pg.Client(banco.connection);
    //     this.postgres.connect();

    //     let query = {
    //         name: 'create-app',
    //         text: `UPDATE apps SET valor = '${valor}', WHERE id = ${id}`,
    //         values: []
    //     }

    //     try {
    //         await this.postgres.query(query);
    //     } catch(err) {
    //         console.log(err);
    //         throw new AppError('Erro ao deletar App', 500)
    //     } finally {
    //         this.postgres.end();
    //     }
    // }


}

export default AppRepository;