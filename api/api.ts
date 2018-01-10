import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as path from 'path';
import errorHandler = require('errorhandler');
import methodOverride = require('method-override');
import {IndexRoute} from '../routes';

export class Server {

    public app: express.Application;

    public static bootstrap(filePath: string): Server {
        return new Server(filePath);
    }

    constructor(filePath: string) {
        // create expressjs application
        this.app = express();

        // configure application
        this.config();

        // add routes
        this.routes(filePath);
    }

    public config() {
        // add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));

        // configure pug
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');

        // use logger middlware
        this.app.use(logger('dev'));

        // use json form parser middlware
        this.app.use(bodyParser.json());

        // use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // use cookie parser middleware
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        // use override middlware
        this.app.use(methodOverride());

        // catch 404 and forward to error handler
        this.app.use(function (err: { status: number },
                               req: express.Request,
                               res: express.Response,
                               next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    public routes(filePath: string) {
        const router: express.Router = express.Router();

        // IndexRoute
        IndexRoute.create(router, filePath);

        // use router middleware
        this.app.use(router);
    }
}