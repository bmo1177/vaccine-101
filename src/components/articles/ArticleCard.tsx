import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart, MessageCircle, Share2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
  readingTime: string;
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
  readingTime,
  onLike,
}: ArticleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold hover:text-primary transition-colors cursor-pointer">
              {title}
            </CardTitle>
            <Badge variant="secondary" className="hover:bg-primary hover:text-white transition-colors">
              {category}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {readingTime}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
          <div className="flex items-center gap-2 mt-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">By {author}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onLike}
              className="hover:text-primary hover:bg-primary/10"
            >
              <Heart className="mr-2 h-4 w-4" />
              {likes}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:text-primary hover:bg-primary/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {comments}
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="hover:text-primary hover:bg-primary/10"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};