import Axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const poster = await axios.get(`https://img.omdbapi.com/?i=${id}&h=300&apikey=${process.env.OMDB}`, {
    responseType: "arraybuffer",
     validateStatus: status => status == 200 || status == 404,
  });

  if (poster.status == 404) {
    res.statusCode = 404;
    res.send("Not Found")
    return
  }

  res.statusCode = 200;
  res.setHeader("content-type", poster.headers["content-type"]);
  res.setHeader("cache-control", "public, max-age=86400");
  res.send(poster.data);
}
