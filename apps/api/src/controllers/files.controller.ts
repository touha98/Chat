import { Request, Response } from 'express';
import { aggregateFileData, newFileData } from '../providers/files.provider';

type S3File = Express.Multer.File & { location: string; key: string };

export const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No file provided' });
  }
  if (!req.body.client) {
    return res
      .status(400)
      .json({ status: 'error', message: 'No client provided' });
  }

  const { location, mimetype, key, originalname, size } = req.file as S3File;

  const file = await newFileData({
    data: {
      name: originalname,
      mimeType: mimetype,
      key,
      size,
      location,
      clientId: req.body.client,
    },
  });

  return res.status(201).send({
    status: 'success',
    result: file,
  });
};

export const countSize = async (req: Request, res: Response) => {
  const { client } = req.query;
  const data = await aggregateFileData({
    where: { clientId: client as string },
    _sum: { size: true },
  });

  return res.status(200).send({
    status: 'success',
    result: data._sum.size ?? 0,
  });
};
