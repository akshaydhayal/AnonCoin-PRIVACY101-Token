import { NextRequest, NextResponse } from 'next/server';
import { AnoncoinAPI } from '@/lib/anoncoin';

export async function POST(req: NextRequest) {
  try {
    const { walletAddress, tickerName, tickerSymbol, description } = await req.json();

    if (!walletAddress) {
      return NextResponse.json({ status: 'failed', message: 'Wallet address is required' }, { status: 400 });
    }

    const apiKey = process.env.ANONCOIN_API_KEY || 'anoncoin:xxxx';
    const client = new AnoncoinAPI(apiKey, true); // Dev mode by default

    // In a real scenario, we'd have a file/image for the token
    // For this demo, we can use a placeholder blob or a default logo
    const placeholderBlob = new Blob(['placeholder'], { type: 'image/png' });

    const result = await client.createToken({
      files: placeholderBlob,
      tickerName: tickerName || "Privacy Badge",
      tickerSymbol: tickerSymbol || "PRIV",
      description: description || "Educational Privacy Airdrop Token",
      validateOnly: true, // Use validation for demo purposes unless real key is provided
    });

    return NextResponse.json({
      status: 'success',
      message: 'Airdrop transaction generated!',
      data: result
    });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({
      status: 'failed',
      message: error.message || 'Failed to trigger airdrop'
    }, { status: 500 });
  }
}
