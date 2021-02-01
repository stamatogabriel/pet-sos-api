import * as multerS3 from 'multer-s3';
import { S3 } from 'aws-sdk';

import FileName from './file.config';

const storageTypes = {
  s3: multerS3({
    s3: new S3({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }),
    bucket: 'pet-sos/images/users',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: FileName,
  }),
};

export default storageTypes