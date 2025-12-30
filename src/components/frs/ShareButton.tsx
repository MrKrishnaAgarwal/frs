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

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="gap-2 border-primary/30 bg-primary/5 hover:bg-primary/10 text-foreground transition-all duration-200"
        title="Share your Future Ready Score securely"
      >
        <Share2 className="w-4 h-4" />
        <span className="hidden sm:inline">Share FRS</span>
      </Button>

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
