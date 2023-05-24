import express from 'express';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port){
        this.app = express();
        this.port = port;

        this.initializeMiddleware()
        this.initializeControllers(controllers)
    }

    private initializeMiddleware(){
        this.app.use(express.json())
    }

    private initializeControllers(controllers: any[]){
        controllers.forEach(controller => {
            this.app.use('/',controller.router);
        });
    }

    public listen(){
        this.app.listen(this.port, ()=>{
            console.log(`App listening on the port ${this.port}`)
        });
    }
}

export default App;