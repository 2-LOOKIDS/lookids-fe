'use client';

import AddFeedHeader from '../../../components/common/feedcard/AddFeedHeader';
import ImageUpload from '../../../components/common/feedcard/ImageUpload';
import AddFeedForm from '../../../components/forms/AddFeedForm';
import ProfileCircle from '../../../components/ui/ProfileCircle';
import { ImageProvider } from '../../../context/ImageContext';

export default function page() {
  return (
    <ImageProvider>
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white">
        {/* Header */}
        <AddFeedHeader />

        <ProfileCircle />
        <hr />
        {/* Image Upload */}
        <ImageUpload />

        {/* Form */}
        <AddFeedForm />
      </div>
    </ImageProvider>
  );
}
