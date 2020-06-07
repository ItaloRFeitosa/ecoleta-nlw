import { Request, Response } from 'express';

import db from '../database/connection';

export default class ItemsController {

  public index = async (req: Request, res: Response) => {

    const items = await db('items').select('*');

    const itemsWithUrl = items.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`
    }));

    return res.json(itemsWithUrl)
  }


}
