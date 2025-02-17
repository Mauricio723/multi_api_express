import "dotenv/config";

import cloudinary from "cloudinary";


cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
	api_key: process.env.CLOUDINARY_API_KEY, 
	api_secret: process.env.CLOUDINARY_API_SECRET
});


//cloudinary.config("cloudinary://927639898794524:xXwVvMXrodA5U_hPKwb9tU2sSOw@dirq37l58");

/*
	ruta consola cloudinary: https://console.cloudinary.com/pm/c-f9d742fab527017607da3bb9961837/getting-started
*/
// url imagen cloudinary: https://res.cloudinary.com/dirq37l58/image/upload/v1735617226/filesVilma25/t6vylniokqrdtasd2rgd.jpg

const carpetaTienda01 = "TiendaVilma01";

//const carpetaVarios = "filesVilma25";

const createUrl = ({ name, version, format } = {}) => {
	const baseUrl = "https://res.cloudinary.com/dirq37l58/image/upload/";
	
	const versionFormat = version ? `v${version}/` : "";
	const fileName = `${name}.${format}`;
	return `${baseUrl}${versionFormat}${fileName}`;
};

const uploadStream = (buffer) => {
	return new Promise((resolve, reject) => {
		const config = { folder: carpetaTienda01 };
		const cloudinaryDone = (err, result) => {
			return err ? reject(err) : resolve(result);
		};
		cloudinary.v2.uploader.upload_stream(config, cloudinaryDone).end(buffer);
	});
};

export const uploadImage = async (file) => {
	try {
		const {
			public_id: name, 
			version, 
			format
		} = await uploadStream(file.buffer);

		return createUrl({ name, version, format });
		//return [data, null];
	} catch (error) {
		console.error({ error });
		return [null, error];
	}
};

