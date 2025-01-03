import {Request} from 'express';
import * as multer from 'multer';
import * as path from 'path';
import {FileFilterCallback} from 'multer';
import * as fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const MIME_TYPES: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
};

// Path to the images folder in your backend
const imageDirectory = path.join(process.cwd(), 'backend', 'images');


// Ensure the directory exists
if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, {recursive: true});
}

// Multer storage configuration.
export const fileStorage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: DestinationCallback): void => { // Tells Multer where to save files.
        // Check if the request is for a hotel or user and set the corresponding folder
        const folder = req.body.type === 'hotel' ? 'hotel' : 'user';
        const destinationPath = path.join(imageDirectory, folder);

        // Ensure the destination directory exists
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        // Provide the destination path to Multer
        callback(null, destinationPath);
    },
    filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => { // Sets the name of the downloaded file
        const name = file.originalname.split(' ').join('_').split('.')[0]; // Remove the existing extension
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}_${Date.now()}.${extension}`); // Set the filename with a timestamp when downloaded
    },
});

// File filter to allow only image files (jpg, jpeg, png)
export const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true); // Accept the file
    } else {
        callback(null, false); // Reject the file and send an error message
    }
};

// Final Multer configuration. Create a ready-to-use Multer instance.
export const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
});
