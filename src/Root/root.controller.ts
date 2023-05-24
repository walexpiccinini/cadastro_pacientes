import express, { Request, Response } from 'express';

class RootController {
    public path = '/';
    public router = express.Router();

    constructor(){
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.get(this.path, this.getStatus)
    }

    private getStatus(request: Request, response: Response){
        response.status(200).send("Api rodando")
    }
}

export default RootController;