import multer from 'multer';
import { join } from 'path';

export default {
  storage: multer.diskStorage({
    destination: join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      cb(null, fileName) // O primeiro parâmetro é um erro, se colocar null indica que não teve erro
    },
  })
}