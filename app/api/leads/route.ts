import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, phone, email, source } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required' },
        { status: 400 }
      );
    }

    const lead = new Lead({
      name,
      phone,
      email,
      source: source || 'website',
    });

    await lead.save();

    return NextResponse.json(
      { message: 'Lead submitted successfully!', lead },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
