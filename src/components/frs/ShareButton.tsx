import { Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import ShareModal from "./ShareModal";

interface ShareButtonProps {
  frsId: string;
  score: number;
  isPublicVisible?: boolean;
}

export default function ShareButton({
  frsId,
  score,
  isPublicVisible = true
}: ShareButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variant="outline"
            className="gap-2 border-primary/40 bg-primary/8 hover:bg-primary/15 text-foreground transition-all duration-300 relative overflow-hidden"
            aria-label="Share FRS - Send your verified score to colleges and institutions"
          >
            <Share2 className="w-4 h-4 transition-transform duration-300" style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }} />
            <span className="hidden sm:inline font-medium">Share FRS</span>

            {/* Subtle glow effect on hover */}
            {isHovered && (
              <div className="absolute inset-0 bg-primary/5 rounded-md animate-pulse pointer-events-none" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p className="font-medium">
            {isPublicVisible
              ? 'Share securely with colleges, mentors & institutions'
              : 'Sharing disabled in privacy settings'}
          </p>
        </TooltipContent>
      </Tooltip>

      <ShareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        frsId={frsId}
        score={score}
        isPublicVisible={isPublicVisible}
      />
    </>
  );
}
