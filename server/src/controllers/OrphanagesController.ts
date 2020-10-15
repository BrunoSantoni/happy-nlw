import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import * as Yup from 'yup';

import orphanagesView from '../views/orphanagesView';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'] // Isso traz as imagens junto na requisição
    });

    return res.json(orphanagesView.renderMany(orphanages));
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(orphanagesView.render(orphanage));
  },

  async create(req: Request, res: Response): Promise<Response> {  
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;
    
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const orphanagesRepository = getRepository(Orphanage);

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      latitude: Yup.number().required('Latitude obrigatória'),
      longitude: Yup.number().required('Longitude obrigatória'),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
}
