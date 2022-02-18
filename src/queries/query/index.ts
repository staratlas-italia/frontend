import { BigQuery } from "@google-cloud/bigquery";

const bigQueryClient = new BigQuery({
  projectId: "fleetsnapshots",
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY!.split("\\n").join("\n"),
  },
});

export const query = async <R extends unknown>(
  statement: string
): Promise<R> => {
  const [job] = await bigQueryClient.createQueryJob({ query: statement });

  const [rows] = await job.getQueryResults();

  return rows as R;
};
