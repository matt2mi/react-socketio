import { Request, Response, Router } from 'express';
import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {
    
    public static create(router: Router, filePath: string) {
        // log
        console.warn('[IndexRoute::create] Creating index route.');

        // add home page route
        router.get('/', (req: Request, res: Response) => {
            new IndexRoute().index(req, res, filePath);
        });
    }

    constructor() {
        super();
    }

    /**
     * The home page route.
     */
    public index(req: Request, res: Response, filePath: string) {
        // set custom title
        this.title = 'Home | Tour of Heros';

        // set options
        let options: Object = {
            'message': 'Welcome !'
        };

        // render template
        this.render(req, res, filePath, options);
    }
}