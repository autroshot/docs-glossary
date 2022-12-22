import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | string>
) {
  try {
    switch (req.method) {
      case 'GET':
        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

        await doc.useServiceAccountAuth({
          client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
          private_key: (process.env.GOOGLE_PRIVATE_KEY as string).replace(
            /\\n/gm,
            '\n'
          ),
        });
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        const terms = rows.map((row) => {
          return {
            english: row.english ?? '',
            korean: row.korean ?? '',
            type: row.type ?? '',
            field: row.field ?? '',
            description: row.description ?? '',
          } as Term;
        });

        res.status(200).json(terms);
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (err) {
    console.error(getErrorMessage(err));
    res.status(500).json(getErrorMessage(err));
  }

  function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
  }
}

export interface Term {
  english: string;
  korean: string;
  type: string;
  field: string;
  description: string;
}
export type GetResponseData = Term[];
