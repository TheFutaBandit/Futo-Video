'use client'

import { getWorkspaceVideos } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import { cn } from '@/lib/utils'
import { VideosProps } from '@/types/index.types'
import { VideoIcon } from 'lucide-react'
import React from 'react'
import VideoCard from './video-card'

type Props = {
    folderId: string,
    videosKey: string,
    workspaceId: string
}

const Videos = ({folderId, videosKey, workspaceId}: Props) => {
  const {data: videoData} = useQueryData(
    [videosKey], 
    () => getWorkspaceVideos(folderId)
  )

  // Mock data for development/testing
  const mockVideos = [
    {
      id: "video-123",
      createdAt: new Date("2024-01-15T10:30:00Z"),
      User: {
        firstname: "John",
        lastname: "Doe",
        image: "https://example.com/avatar.jpg"
      },
      processing: false,
      Folder: {
        id: "folder-456",
        name: "Marketing Videos"
      },
      title: "Product Demo 2024",
      source: "https://example.com/video.mp4"
    },
    {
      id: "video-124",
      createdAt: new Date("2024-01-14T14:20:00Z"),
      User: {
        firstname: "Jane",
        lastname: "Smith",
        image: "https://example.com/avatar2.jpg"
      },
      processing: true,
      Folder: {
        id: "folder-456",
        name: "Marketing Videos"
      },
      title: "Customer Testimonial",
      source: "https://example.com/video2.mp4"
    },
    {
      id: "video-125",
      createdAt: new Date("2024-01-13T09:15:00Z"),
      User: null,
      processing: false,
      Folder: null,
      title: null,
      source: "https://example.com/video3.mp4"
    }
  ];

  const {status: videosStatus, data: videos} = videoData as VideosProps;
  // Use mock data if API data is not available
  const displayVideos = videos || mockVideos;
  return (
    <div className = "flex flex-col gap-4 mt-4"> 
      <div className = "flex items-center justify-between">
        <div className = "flex items-center gap-4">
          <VideoIcon />
          <h2 className = "text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section className = {cn(
        videosStatus !== 200 
        ? 'p-5' 
        : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}>
          { videosStatus === 200 
            ? (displayVideos.map((video) => <VideoCard workspaceId={workspaceId} {...video}/>)) 
            : (
            <p className = "text-[#BDBDBD]">No videos in workspace</p>
          )}
        </section>
    </div>
  )
}

export default Videos 