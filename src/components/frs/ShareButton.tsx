import { Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
      <div className="relative group">
        <Button
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant="outline"
          className="gap-2 border-primary/40 bg-primary/8 hover:bg-primary/15 text-foreground transition-all duration-300 relative overflow-hidden"
          title="Share your Future Ready Score securely with colleges, institutions, and mentors"
          aria-label="Share FRS modal"
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

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-secondary border border-border rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-40">
          <p className="text-xs font-medium text-foreground">
            {isPublicVisible ? 'Share securely' : 'Sharing disabled'}
          </p>
        </div>
      </div>

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
