import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const ubuntuServerUrl = process.env.UBUNTU_SERVER_URL || 'http://localhost:3001/uploads';

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Forward the file to Ubuntu server
    const ubuntuFormData = new FormData();
    ubuntuFormData.append('file', file);

    const response = await fetch(ubuntuServerUrl, {
      method: 'POST',
      body: ubuntuFormData,
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: result.error }, { status: response.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
