import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, MessageCircle, Share2 } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  onLike?: () => void;
}

export const ArticleCard = ({
  title,
  excerpt,
  author,
  date,
  category,
  likes,
  comments,
  onLike,
}: ArticleCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge variant="secondary">{category}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {date}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{excerpt}</p>
        <p className="mt-4 text-sm font-medium">By {author}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" onClick={onLike}>
            <Heart className="mr-2 h-4 w-4" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            {comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};