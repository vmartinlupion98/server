"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const superhero_routes_1 = __importDefault(require("../routes/superhero.routes"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App running in port ', this.port);
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/superheroes', superhero_routes_1.default);
    }
    connectDB() {
        connection_1.default.connect((error) => {
            if (error)
                throw error;
            console.log('DB connection was sucessfully');
        });
    }
}
exports.default = Server;
