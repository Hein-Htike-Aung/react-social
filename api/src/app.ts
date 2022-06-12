import express from 'express';
import config from 'config';
import connect from './db/connect';
import log from './log';
import { authRoute, userRoute } from './user/user.routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { postRoute } from './post/post.routes';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

/* Middleware */
app.use(express());
app.use(helmet());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));

app.listen(port, host, () => {
	log.info(`server listening at http://${host}:${port}`);

	connect();

	authRoute(app);
	userRoute(app);
	postRoute(app);
});
