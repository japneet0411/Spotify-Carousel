import { usersModel } from './../models/users';

export const explicitStatus = async (req, res) => {
	await usersModel
		.findOneAndUpdate(
			{
				username: req.params.username,
			},
			{
				explicit: req.body.explicit,
			}
		)
		.exec();
};

export const explicitCheck = async (req, res) => {
	const query = await usersModel
		.findOne({
			username: req.params.username,
		})
		.exec();
	if (query.explicit) {
		res.status(200).send({
			checked: false,
		});
	} else {
		res.status(200).send({
			checked: true,
		});
	}
};
