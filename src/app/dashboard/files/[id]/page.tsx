import React from 'react';
import { auth } from '@clerk/nextjs/server';
import { adminDb } from '../../../../../firebaseAdmin';
import PdfView from '@/components/PdfView';
import Chat from '@/components/Chat';

type Params = Promise<{ id: string }>

async function ChatToFilePage(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;

  await auth.protect();
  const { userId } = await auth();

  const ref = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .get();

  const url = ref.data()?.downloadUrl;

  return (
    <div className='grid lg:grid-cols-5 h-full overflow-hidden'>
      <div className='col-span-5 lg:col-span-2 overflow-y-auto'>
        <Chat id={id} />
      </div>

      <div className='col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-indigo-600 lg:-order-1 overflow-auto'>
        <PdfView url={url} />
      </div>
    </div>
  );
}

export default ChatToFilePage;
