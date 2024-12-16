import React from 'react';

interface FollowerListProps {
  uuid: string;
}
export default function FollowerList({ uuid }: FollowerListProps) {
  return <div>{uuid}</div>;
}
