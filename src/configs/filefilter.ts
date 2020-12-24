import { HttpStatus, HttpException } from '@nestjs/common';

export default function fileFilter(req, file, cb) {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new HttpException('Invalid file type.', HttpStatus.FORBIDDEN), false);
  }
}
