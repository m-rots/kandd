import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Result = {
  movie_results: {
    poster_path: string
  }[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  
  if (req.headers["if-none-match"]) {
    res.statusCode = 304;
    res.end();
    return
  }

  const { data } = await axios.get<Result>(`https://api.themoviedb.org/3/find/${id}`, {
    params: {
      api_key: process.env.TMDB,
      external_source: 'imdb_id',
      language: 'en-US',
    },
  });

  if (data.movie_results.length == 0) {
    res.statusCode = 404;
    res.end();
    return
  }

  const poster = data.movie_results[0].poster_path;
  const image = await axios.get(`https://image.tmdb.org/t/p/w342${poster}`, {
    responseType: "stream",
  });

  res.statusCode = 200;
  res.setHeader("Content-Type", image.headers["content-type"]);
  res.setHeader("ETag", image.headers["etag"]);
  res.setHeader("Cache-Control", "max-age=31449600, immutable");
  image.data.pipe(res);
}
