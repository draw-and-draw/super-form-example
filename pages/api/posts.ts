import { getPosts } from '../../utils';

export default function handler(req: any, res: any) {
  const { page } = req.query;

  const posts = getPosts(page);

  res.status(200).json(posts);
}
