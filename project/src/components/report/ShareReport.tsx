import React, { useState } from 'react';
import { Share2, Copy, Mail, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ShareReportProps {
  reportId: string;
  reportTitle: string;
}

export const ShareReport: React.FC<ShareReportProps> = ({ reportId, reportTitle }) => {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const shareUrl = `${window.location.origin}/reports/shared/${reportId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Link Copied",
        description: "Share link has been copied to clipboard"
      });
    } catch (err) {
      toast({
        title: "Failed to Copy",
        description: "Please try copying the link manually",
        variant: "destructive"
      });
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Audit Report: ${reportTitle}`);
    const body = encodeURIComponent(`View the audit report here: ${shareUrl}\n\nThis link will expire in 7 days.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Report</DialogTitle>
            <DialogDescription>
              Share this report with your team. The link will expire in 7 days.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="w-full"
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleCopy}
                    className="flex-shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {copied ? 'Copied!' : 'Copy link'}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={handleEmailShare}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Share via Email
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Security note:</p>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Link expires in 7 days</li>
                <li>View-only access</li>
                <li>No login required for viewers</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};