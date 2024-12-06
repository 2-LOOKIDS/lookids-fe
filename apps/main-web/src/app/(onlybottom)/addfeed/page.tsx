'use client';

import { useState } from 'react';
import AddFeedHeader from '../../../components/common/feedcard/AddFeedHeader';
import ImageUpload from '../../../components/common/feedcard/ImageUpload';
import AddFeedForm from '../../../components/forms/AddFeedForm';
import ProfileCircle from '../../../components/ui/ProfileCircle';
import { ImageProvider } from '../../../context/ImageContext';

export default function Page() {
  const [selectedPetCode, setSelectedPetCode] = useState<string[] | null>(null);

  return (
    <ImageProvider>
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white">
        {/* Header */}
        <AddFeedHeader />
        <hr />
        {/* Image Upload */}
        <ImageUpload />
        {/* ProfileCircle with onPetSelect */}
        <ProfileCircle onPetSelect={setSelectedPetCode} />
        {/* AddFeedForm with selectedPetCode */}
        <AddFeedForm selectedPetCode={selectedPetCode} />
      </div>
    </ImageProvider>
  );
}
