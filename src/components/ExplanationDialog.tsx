"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Youtube, Maximize2, Minimize2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExplanationDialogProps {
  isOpen: boolean
  onClose: () => void
  content: {
    text?: string
    readMoreUrls?: Array<{
      title: string;
      url: string;
    }>;
    videoUrls?: Array<{
      title: string;
      url: string;
    }>;
  }
}

export function ExplanationDialog({ isOpen, onClose, content }: ExplanationDialogProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]{10,12})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&origin=${window.location.origin}` : null
  }

  const hasMultipleVideos = content.videoUrls && content.videoUrls.length > 1

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "duration-300 transition-all",
        isFullscreen ? "max-w-[95vw] h-[95vh]" : "max-w-3xl h-[80vh]",
        "flex flex-col"
      )}>
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-2">
          <DialogTitle>Detailed Explanation</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-8 w-8 hover:bg-slate-100"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-slate-100"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-auto space-y-6 p-2">
          {content.text && (
            <div className="prose prose-sm max-w-none">
              <p>{content.text}</p>
            </div>
          )}
          
          {content.readMoreUrls && content.readMoreUrls.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Additional Resources:</p>
              {content.readMoreUrls.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    {link.title}
                  </a>
                </div>
              ))}
            </div>
          )}

          {content.videoUrls && content.videoUrls.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <span className="text-sm font-medium">Video Explanation{hasMultipleVideos ? 's' : ''}</span>
              </div>
              
              {hasMultipleVideos && (
                <div className="flex gap-2 mb-4">
                  {content.videoUrls.map((_, index) => (
                    <Button
                      key={index}
                      variant={activeVideoIndex === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveVideoIndex(index)}
                    >
                      Video {index + 1}
                    </Button>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium">{content.videoUrls[activeVideoIndex].title}</p>
                <div className="relative aspect-video w-full">
                  <iframe
                    src={getYoutubeEmbedUrl(content.videoUrls[activeVideoIndex].url)}
                    className="absolute inset-0 w-full h-full rounded-lg"
                    title={content.videoUrls[activeVideoIndex].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}