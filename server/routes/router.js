const express = require("express");
const passport = require("passport");

export const router = express.Router();

import { fetchData } from "./../controllers/Admin/scraper";
import { refreshSeedTracks } from "./../controllers/Admin/refreshSeedTracks";

router.route("/initialize").post(fetchData);
router.route("/refreshPlaylists").get(refreshSeedTracks);

import { carousel } from "./../controllers/carousel";
import { playlistSaveStatus } from "./../controllers/carousel";
import { setPlaylistSaveStatus } from "./../controllers/carousel";
import { removeFromSavedPlaylists } from "./../controllers/carousel";

router.route("/:username/carousel").get(carousel);
router.route("/:username/playlistStatus").post(playlistSaveStatus);
router.route("/:username/setPlaylistStatus").post(setPlaylistSaveStatus);
router.route("/:username/removeSavedPlaylist").post(removeFromSavedPlaylists);

import { explicitStatus } from "./../controllers/explicit";
import { explicitCheck } from "./../controllers/explicit";

router.route("/:username/explicit").post(explicitStatus);
router.route("/:username/explicitStatus").get(explicitCheck);

import { login } from "./../controllers/login";
import { auth } from "./../controllers/login";
import { unauthorized } from "./../controllers/login";

router.route("/login").post(login);
router
  .route("/auth")
  .post(
    passport.authenticate("local", { failureRedirect: "/unauthorized" }),
    auth
  );
router.route("/unauthorized").get(unauthorized);

import { modal } from "./../controllers/modal";
import { getTrackStatus } from "./../controllers/modal";
import { recommendTrack } from "./../controllers/modal";
import { saveTrack } from "./../controllers/modal";
import { removeSavedTrack } from "./../controllers/modal";

router.route("/:username/modal").post(modal);
router.route("/:username/trackStatus").post(getTrackStatus);
router.route("/:username/getSimilarTrack").post(recommendTrack);
router.route("/:username/saveTrack").post(saveTrack);
router.route("/:username/removeTrack").post(removeSavedTrack);

import { displayRecommendedTracks } from "./../controllers/recommendations";

router.route("/:username/recommendations").get(displayRecommendedTracks);

import { savedPlaylists } from "./../controllers/savedPlaylists";

router.route("/:username/savedPlaylists").get(savedPlaylists);

import { signUp } from "./../controllers/signUp";

router.route("/signUp").post(signUp);

import { userSpotifyAuth } from "./../controllers/userSpotifyAuth";
import { spotifyAuthUser } from "./../controllers/userSpotifyAuth";
import { isAuthenticatedWithSpotify } from "./../controllers/userSpotifyAuth";
import { addTrackToPlaylist } from "./../controllers/userSpotifyAuth";
import { addToLibrary } from "./../controllers/userSpotifyAuth";

router.route("/:username/authenticateWithSpotify").get(userSpotifyAuth);
router.route("/callback").get(spotifyAuthUser);
router.route("/:username/authenticated").get(isAuthenticatedWithSpotify);
router.route("/:username/addToPlaylist").post(addTrackToPlaylist);
router.route("/:username/addToLibrary").get(addToLibrary);

import { wallOfMusic } from "./../controllers/wallOfMusic";

router.route("/:username/wallOfMusic").get(wallOfMusic);
