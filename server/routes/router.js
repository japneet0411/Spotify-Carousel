const express = require('express');

export const router = express.Router();

import { appAuth } from './../controllers/appAuth';
import { fetchData } from './../controllers/Admin/scraper';
import { setImages } from './../controllers/Admin/setImages';
import { getRecommendations } from './../controllers/Admin/getRecommendations';
import { carousel } from './../controllers/Carousel/carousel';
import { modal } from './../controllers/Modal/modal';

router
    .route('/admin')
    .get(appAuth);
router  
    .route('/scraper')
    .post(fetchData)
router
    .route('/setImages')
    .get(setImages);
router
    .route('/admin/getRecommendations')
    .get(getRecommendations);
router
    .route('/carousel')
    .get(carousel);
router
    .route('/modal/:playlist')
    .get(modal);