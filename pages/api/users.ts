import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, headers } = await axios.get<Api.Users.Data[]>(
      "https://gorest.co.in/public/v2/users",
      {
        params: req.query,
      }
    );
    return res.status(200).json({
      data,
      maxPageSize:
        Number(headers["x-pagination-pages"]) === 0
          ? 1
          : Number(headers["x-pagination-pages"]),
    });
  } catch (error) {
    return res.status(404);
  }
}
