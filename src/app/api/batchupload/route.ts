import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const ubuntuServerUrl = process.env.UBUNTU_SERVER_URL || 'http://localhost:3001/batchupload';

  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Forward the files to Ubuntu server
    const ubuntuFormData = new FormData();
    files.forEach((file) => {
      ubuntuFormData.append('files', file);
    });

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
    console.error('Batch upload error:', error);
    return NextResponse.json({ error: 'Batch file upload failed' }, { status: 500 });
  }
}
