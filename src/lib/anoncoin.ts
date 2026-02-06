import axios from 'axios';

const DEV_HOST = 'https://dev-api.dubdub.tv';
const PROD_HOST = 'https://api.dubdub.tv';

interface CreateTokenParams {
  files: File | Blob;
  tickerName: string;
  tickerSymbol: string;
  description: string;
  twitterLink?: string;
  telegramLink?: string;
  royaltyUser?: string;
  validateOnly?: boolean;
}

export class AnoncoinAPI {
  private apiKey: string;
  private host: string;

  constructor(apiKey: string, isDev: boolean = true) {
    this.apiKey = apiKey;
    this.host = isDev ? DEV_HOST : PROD_HOST;
  }

  async createToken(params: CreateTokenParams) {
    const formData = new FormData();
    formData.append('files', params.files);
    formData.append('tickerName', params.tickerName);
    formData.append('tickerSymbol', params.tickerSymbol);
    formData.append('description', params.description);
    
    if (params.twitterLink) formData.append('twitterLink', params.twitterLink);
    if (params.telegramLink) formData.append('telegramLink', params.telegramLink);
    if (params.royaltyUser) formData.append('royaltyUser', params.royaltyUser);
    if (params.validateOnly !== undefined) {
      formData.append('validateOnly', String(params.validateOnly));
    }

    try {
      const response = await axios.post(`${this.host}/thirdParty/v1/createToken`, formData, {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('Anoncoin API Error:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  }
}

export const anoncoinClient = new AnoncoinAPI(process.env.NEXT_PUBLIC_ANONCOIN_API_KEY || 'anoncoin:xxxx');
