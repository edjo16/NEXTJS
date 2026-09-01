import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    revalidatePath('/insights', 'page');
    revalidatePath('/contacts', 'page');
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ 
      revalidated: true,
      paths: ['/insights', '/contacts'],
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
