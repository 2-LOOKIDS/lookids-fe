'use client';

import { ImageProvider } from '../../../context/ImageContext';
import AddFeedForm from '../../forms/AddFeedForm';
import ProfileCircle from '../../ui/ProfileCircle';
import AddFeedHeader from './AddFeedHeader';
import ImageUpload from './ImageUpload';

export default function AddFeed() {
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
