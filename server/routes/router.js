const express = require('express');

export const router = express.Router();

import { appAuth } from './../controllers/appAuth';
import { fetchData } from './../controllers/Admin/scraper';
import { setImages } from './../controllers/Admin/setImages';
import { getRecommendations } from './../controllers/Admin/getRecommendations';
import { carousel } from './../controllers/Carousel/carousel';
import { modal } from './../controllers/Modal/modal';
import { createUser } from './../controllers/User-Auth/createNewUser';
import { saveTrack } from './../controllers/Modal/saveTrack';
import { wallOfMusic } from './../controllers/Wall-Of-Music/wallOfMusic';
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
router
    .route('/create-user')
    .post(createUser);
router
    .route('/:username/saveTrack')
    .post(saveTrack);
router
    .route('/:username/wallOfMusic')
    .get(wallOfMusic);