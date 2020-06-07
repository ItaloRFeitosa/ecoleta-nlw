import { Request, Response, response } from 'express';

import db from '../database/connection';

export default class PointsController {

  public index = async (req: Request, res: Response) => {
    const { city, uf, items} = req.query;

    const parsedItems = String((items))
      .split(',')
      .map(item => Number(item.trim()));


    const points = await db('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    console.log(city, uf, parsedItems);

    return res.json(points)

  }

  public create = async (req: Request, res: Response) => {

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body;
    try{
    const trx = await db.transaction();

    const [point,] = await trx('points').insert({
      name,
      email,
      image: 'https://images.unsplash.com/photo-1542739674-b449a8938b59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }, ['id']);

    const pointItems = items.map((item_id: number) => ({
      item_id,
      point_id: point.id
    }));

    await trx('point_items').insert(pointItems);

    await trx.commit();

    return res.json({message: 'success'});

    } catch(error) {
      return res.status(400).json(error)
    }
  }

  public show = async (req: Request, res: Response) => {
    const { id } = req.params;

    const point = await db('points').where('id', id).first();

    if (!point) return res.status(400).json({message: 'Point not Found.'});

    const items = await db('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('title');

    return res.json({point, items});
  }

  public all = async (req: Request, res: Response) => {
    const points = await db('points').select('*');


    if(!points) return res.status(400).json({message: 'Points not Found.'});

    const pointWithItems = await Promise.all(points.map(async (point) => {
      const items = await db('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', point.id)
      .select('title');
      return {point, items};
    }));

    return res.json(pointWithItems);
  }
}
