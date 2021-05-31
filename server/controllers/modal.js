import { playlistsModel } from "../models/playlists";
import { usersModel } from "../models/users";
import { tracksModel } from "../models/tracks";
import randomItem from "random-item";
import { spotifyApi } from "./appAuth";
import { generateRecommendations } from "./recommendations";
const empty = require("is-empty");

export const modal = async (req, res) => {
  const playlist = await playlistsModel
    .find({ playlistName: req.body.playlist })
    .exec();
  const listOfTracks = playlist[0].listOfTracks;
  const query = await usersModel.findOne({ username: req.params.username });
  const explicit = query.explicit;
  var track = randomItem(listOfTracks);
  var saved = false;
  const savedTracks = query.savedTracks;
  if (!(savedTracks.indexOf(track) === -1)) saved = true;
  if (explicit) {
    while (track.explicit && count != 20) {
      track = randomItem(listOfTracks);
      count++;
    }
    if (track.explicit) {
      res.status(200).send({
        message: "Could not find track that satisfies your parameters.",
      });
    }
  }
  res.status(200).send({
    embed_url: "https://open.spotify.com/embed/track/" + track,
    saved: saved,
    message: "Success",
  });
};

export const getTrackStatus = async (req, res) => {
  const query = await usersModel
    .findOne({
      username: req.params.username,
    })
    .exec();
  const savedTracks = query.savedTracks;
  if (savedTracks.indexOf(req.body.trackId) === -1) {
    res.status(200).send({
      saved: false,
    });
  } else {
    res.status(200).send({
      saved: true,
    });
  }
};

export const recommendTrack = async (req, res) => {
  if (empty(spotifyApi.getAccessToken())) {
    await spotifyApi
      .clientCredentialsGrant()
      .then((data) => {
        spotifyApi.setAccessToken(data.body["access_token"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const track = req.body.trackId;
  const query = await usersModel
    .findOne({
      username: req.params.username,
    })
    .exec();
  await spotifyApi
    .getAudioFeaturesForTrack(track)
    .then((data) => {
      const response = data.body;
      const acousticness = response.acousticness;
      const danceability = response.danceability;
      const energy = response.energy;
      const instrumentalness = response.instrumentalness;
      const key = response.key;
      const liveness = response.liveness;
      const loudness = response.loudness;
      const mode = response.mode;
      const speechiness = response.speechiness;
      const tempo = response.tempo;
      const valence = response.valence;
      spotifyApi
        .getRecommendations({
          min_acousticness: acousticness - 0.25,
          max_acousticness: acousticness + 0.25,
          target_acousticness: acousticness,
          min_danceability: danceability - 0.25,
          max_danceability: danceability + 0.25,
          target_danceability: danceability,
          min_energy: energy - 0.25,
          max_energy: energy + 0.25,
          target_energy: energy,
          min_instrumentalness: instrumentalness - 0.25,
          max_instrumentalness: instrumentalness + 0.25,
          target_instrumentalness: instrumentalness,
          key: key,
          min_liveness: liveness - 0.25,
          max_liveness: liveness + 0.25,
          target_liveness: liveness,
          target_loudness: loudness,
          target_mode: mode,
          min_popularity: 50,
          max_popularity: 100,
          target_popularity: 75,
          min_speechiness: speechiness - 0.25,
          max_speechiness: speechiness + 0.25,
          target_speechiness: speechiness,
          target_tempo: tempo,
          target_valence: valence,
          seed_tracks: [track],
          limit: 5,
        })
        .then((data) => {
          var count = 0;
          var track = randomItem(data.body.tracks);
          while (
            query.explicit ||
            (!query.explicit && track.explicit === false && count != 5)
          ) {
            track = randomItem(data.body.tracks);
            count++;
          }
          if (query.savedTracks.indexOf(track) === -1) {
            var recommendedTrack = {
              name: track.name,
              artist: track.artists[0].name,
              trackId: track.id,
              album: track.album.images[0].url,
              message: "Success",
              saved: false,
            };
          } else {
            var recommendedTrack = {
              name: track.name,
              artist: track.artists[0].name,
              trackId: track.id,
              album: track.album.images[0].url,
              message: "Success",
              saved: true,
            };
          }
          res.status(200).send(recommendedTrack);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveTrack = async (req, res) => {
  if (empty(spotifyApi.getAccessToken())) {
    await spotifyApi
      .clientCredentialsGrant()
      .then((data) => {
        spotifyApi.setAccessToken(data.body["access_token"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  await usersModel
    .findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        $push: {
          savedTracks: req.body.trackId,
        },
      }
    )
    .exec();
  const query = await tracksModel
    .findOne({
      trackId: req.body.trackId,
    })
    .exec();
  if (query) {
    await tracksModel
      .findOneAndUpdate(
        {
          trackId: req.body.trackId,
        },
        {
          savedBy: query.savedBy + 1,
        }
      )
      .exec();
  } else {
    await spotifyApi
      .getTrack(req.body.trackId)
      .then(async (data) => {
        var result = data.body;
        await tracksModel.create({
          name: result.name,
          artist: result.artists[0].name,
          albumCover: result.album.images[1].url,
          trackId: result.id,
          explicit: result.explicit,
          savedBy: 1,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  generateRecommendations(req.params.username);
};

export const removeSavedTrack = async (req, res) => {
  const query = await usersModel.findOne({
    username: req.params.username,
  });
  var tracks = query.savedTracks;
  const index = tracks.indexOf(req.body.trackId);
  tracks.splice(index, 1);
  await usersModel
    .findOneAndUpdate(
      {
        username: req.params.username,
      },
      {
        savedTracks: tracks,
      }
    )
    .exec();
  const trackQuery = await tracksModel
    .findOne({
      trackId: req.body.trackId,
    })
    .exec();
  var query2 = await tracksModel
    .findOneAndUpdate(
      {
        trackId: req.body.trackId,
      },
      {
        savedBy: trackQuery.savedBy - 1,
      }
    )
    .exec();
  if (query2.recommendedTo === 0 && query2.savedBy === 0) {
    await tracksModel
      .findOneAndDelete({
        trackId: query2.trackId,
      })
      .exec();
  }
};
