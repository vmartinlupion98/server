import express, { Application } from "express";
import routesSuperheroes from '../routes/superhero.routes';
import connection from "../db/connection";
import cors from "cors";

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.connectDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('App running in port ', this.port);
        })
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes(){
        this.app.use('/api/superheroes', routesSuperheroes);
    }

    connectDB(){
        connection.connect((error) => {
            if(error) throw error;
            console.log('DB connection was sucessfully');
        });
    }
}

export default Server;
