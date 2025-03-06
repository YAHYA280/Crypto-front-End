import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10, // Number of cryptocurrencies
        page: 1,
        sparkline: false,
      },
    });

    // Transform response
    const cryptoData = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      price: coin.current_price,
      image: coin.image,
      change_24h: coin.price_change_percentage_24h,
    }));

    return NextResponse.json(cryptoData);
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.json({ error: 'Failed to fetch cryptocurrency data' }, { status: 500 });
  }
}
