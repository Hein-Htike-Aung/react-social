import { Request, Response } from 'express';
import express from 'express';
import config from 'config';
import connect from './db/connect';
import log from './log';
import { authRoute, userRoute } from './user/user.routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { postRoute } from './post/post.routes';
const cors = require('cors');
import multer from 'multer';

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

/* Middleware */
app.use(express());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(bodyParser.json());
app.use(cors());

/* File Upload */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage });
app.post(
	'/api/upload',
	upload.single('file'),
	(req: Request, res: Response) => {
		try {
			return res.status(200).json('File uploaded successfully');
		} catch (error) {
			console.log(error);
		}
	},
);

app.get('/images/:filename', (req, res) => {
	const fileName = req.params['filename'];
	return res.sendFile(fileName, { root: 'public/images' });
});

app.get('/images/person/:filename', (req, res) => {
	const fileName = req.params['filename'];
	return res.sendFile(fileName, { root: 'public/images/person' });
});

app.get('/images/post/:filename', (req, res) => {
	const fileName = req.params['filename'];
	return res.sendFile(fileName, { root: 'public/images/post' });
});

app.listen(port, host, () => {
	log.info(`server listening at http://${host}:${port}`);

	connect();

	authRoute(app);
	userRoute(app);
	postRoute(app);
});
