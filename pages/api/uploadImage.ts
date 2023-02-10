import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  imageRoute: string;
};

type Error = {
  error: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    base64: string;
  };
}

export const config = {
  runtime: "edge",
};

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method !== "POST") {
    res.end(405).send({ error: "Only POST requests allowed" });
  }
  const imageUrl = req.body.base64;
  console.log(imageUrl);
  try {
    const call = await fetch("https://thumbsnap.com/api/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "00002ea2e104a6edad87e0750e911171",
        media: req.body.base64,
      }),
    });
    const URI = await call.json();
    console.log(URI);
    res.end(200).json({ imageRoute: "blabla" });
    return;
  } catch (e) {
    throw e;
  }
}
