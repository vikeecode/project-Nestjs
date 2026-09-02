import { Injectable } from '@nestjs/common';
import {v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import 'multer';

@Injectable()
export class CloudnaryService {

    //under less than 20mb clodunary service uploaded 
     uploadBufferFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
       return new Promise((resolve, reject) => {
        try {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }

              if (!result) {
                reject(new Error('Cloudinary upload failed: no result returned'));
                return;
              }

              resolve(result);
            }
          );

          if (file?.buffer) {
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
          } else {
            reject(new Error('No file buffer available for upload'));
          }
        } catch (error) {
          console.log('Error uploading file to Cloudinary:', error);
          reject(error as UploadApiErrorResponse);
        }
       });
    }

}
