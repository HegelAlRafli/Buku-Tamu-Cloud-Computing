import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching attendance:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guest_name, event_name } = body;

    if (!guest_name || !event_name) {
      return NextResponse.json(
        { error: 'guest_name and event_name are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('attendance')
      .insert([
        { guest_name, event_name }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting attendance:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error, count } = await supabase
      .from('attendance')
      .delete({ count: 'exact' })
      .eq('id', id);

    if (error) {
      console.error('Error deleting attendance:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (count === 0) {
      return NextResponse.json({ error: "Gagal menghapus: RLS (Row Level Security) Supabase aktif atau data tidak ada." }, { status: 403 });
    }

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
