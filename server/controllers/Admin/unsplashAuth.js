import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
require('dotenv').config();

export const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
	fetch: nodeFetch,
});
