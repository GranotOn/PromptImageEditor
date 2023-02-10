import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  imageURL: string;
};

type Error = {
  error: string;
};

const sleep = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  // upload image and get pooling request URL
  const file = req.body.file;
  const prompt = req.body.prompt;

  const replicateUploadResponse = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
      body: JSON.stringify({
        version:
          "30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
        input: { image: file, prompt: prompt },
      }),
    }
  );

  const JsonReplicateUploadResponse = await replicateUploadResponse.json();
  if (
    JsonReplicateUploadResponse.error ||
    JsonReplicateUploadResponse.status === "failed"
  )
    return res.status(400).send({ error: "Error while uploading image" });

  // pool request URl
  const statusPoolURL = JsonReplicateUploadResponse.urls.get;
  let digestedImageURL: string | null = null;
  while (!digestedImageURL) {
    const replicateStatusResponse = await fetch(statusPoolURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
    });

    const jsonReplicateStatusResponse = await replicateStatusResponse.json();

    if (jsonReplicateStatusResponse.status === "failed") {
      console.log(jsonReplicateStatusResponse);
      return res.status(400).json({ error: "Error while fetching status" });
    } else if (jsonReplicateStatusResponse.status === "succeeded") {
      digestedImageURL = jsonReplicateStatusResponse.output;
    } else {
      await sleep(1000);
    }
  }

  res.status(200).json({ imageURL: digestedImageURL });
}
