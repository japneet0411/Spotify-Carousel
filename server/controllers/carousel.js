import { playlistsModel } from '../models/playlists';
import { usersModel } from '../models/users';
import randomItem from 'random-item';

export const carousel = async (req, res) => {
	const playlists = await playlistsModel.find({}).exec();
	var listOfPlaylists = [];
	var i = 0;
	while (i != 10) {
		var item = randomItem(playlists);
		if (listOfPlaylists.indexOf(item) === -1) {
			listOfPlaylists.push(item);
			i++;
		}
	}
	const query = await usersModel.findOne({
		username: req.params.username,
	});
	const savedPlaylists = query.savedPlaylists;
	var carouselDetails = [];
	for (var i = 0; i < listOfPlaylists.length; i++) {
		if (savedPlaylists.indexOf(listOfPlaylists[i].playlistName) === -1)
			carouselDetails.push({
				name: listOfPlaylists[i].playlistName,
				description: listOfPlaylists[i].playlistDescription,
				carouselImage: listOfPlaylists[i].carouselImage,
				saved: false,
			});
		else
			carouselDetails.push({
				name: listOfPlaylists[i].playlistName,
				description: listOfPlaylists[i].playlistDescription,
				carouselImage: listOfPlaylists[i].carouselImage,
				saved: true,
			});
	}
	res.status(200).send(carouselDetails);
};

export const playlistSaveStatus = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	const savedPlaylists = query.savedPlaylists;
	if (savedPlaylists.indexOf(req.body.playlistName) === -1) {
		res.status(200).send({
			saved: false,
		});
	} else {
		res.status(200).send({
			message: 'Removed saved playlist',
			saved: true,
		});
	}
};

export const setPlaylistSaveStatus = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	const savedPlaylists = query.savedPlaylists;
	if (savedPlaylists.indexOf(req.body.playlistName) === -1) {
		await usersModel
			.findOneAndUpdate(
				{
					username: req.params.username,
				},
				{
					$push: {
						savedPlaylists: req.body.playlistName,
					},
				}
			)
			.exec();
		res.status(200).send({
			message: 'Saved Playlist',
			saved: true,
		});
	} else {
		const query = await usersModel
			.findOne({
				username: req.params.username,
			})
			.exec();
		var playlists = query.savedPlaylists;
		playlists = playlists.splice(
			playlists.indexOf(req.body.playlistName) - 1,
			1
		);
		await usersModel
			.findOneAndUpdate(
				{
					username: req.params.username,
				},
				{
					savedPlaylists: playlists,
				}
			)
			.exec();
		res.status(200).send({
			message: 'Removed saved playlist',
			saved: false,
		});
	}
};

export const removeFromSavedPlaylists = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	var playlists = query.savedPlaylists;
	const index = playlists.indexOf(req.body.playlist);
	playlists.splice(index, 1);
	await usersModel
		.findOneAndUpdate(
			{
				username: req.params.username,
			},
			{
				savedPlaylists: playlists,
			}
		)
		.exec();
};
