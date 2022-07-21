import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, headers } = await axios.get<Api.Comments.Data[]>(
      "https://gorest.co.in/public/v2/comments",
      {
        params: {
          page: req.query.page,
        },
      }
    );
    return res
      .status(200)
      .json({ data, maxPageSize: Number(headers["x-pagination-pages"]) });
  } catch (error) {
    return res.status(404);
  }
}
