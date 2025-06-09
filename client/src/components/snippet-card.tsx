import { useState } from "react";
import { Heart, Copy, Share, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Snippet } from "@shared/schema";
import { getLanguageConfig, formatTimeAgo } from "@/lib/syntax-highlighting";

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const favoriteMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/snippets/${snippet.id}/favorite`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/snippets"] });
      toast({
        title: "Success",
        description: "Snippet favorited!",
      });
    },
  });

  const languageConfig = getLanguageConfig(snippet.language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy code",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: snippet.title,
          text: snippet.description || "",
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Snippet link copied to clipboard",
      });
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
              {snippet.title}
            </h3>
            {snippet.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {snippet.description}
              </p>
            )}
          </div>
          <Badge className={languageConfig.color}>
            <i className={`${languageConfig.icon} mr-1`} />
            {languageConfig.display}
          </Badge>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 mb-4 text-sm overflow-x-auto">
          <pre className="text-gray-300 whitespace-pre-wrap">
            <code>{snippet.code}</code>
          </pre>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={() => favoriteMutation.mutate()}
              className="flex items-center space-x-1 hover:text-red-500 transition-colors"
              disabled={favoriteMutation.isPending}
            >
              <Heart className="w-4 h-4" />
              <span>{snippet.favorites || 0}</span>
            </button>
            <span>{formatTimeAgo(new Date(snippet.createdAt!))}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-8 w-8"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
