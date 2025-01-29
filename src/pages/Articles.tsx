import { useState } from "react";
import { motion } from "framer-motion";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

const mockArticles = [
  {
    id: 1,
    title: "Essential Nutrients for Growing Children",
    excerpt: "Learn about the key nutrients that your child needs for healthy growth and development...",
    author: "Dr. Sarah Johnson",
    date: "2024-01-28",
    category: "Nutrition",
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    title: "Vaccination Schedule: What Parents Need to Know",
    excerpt: "A comprehensive guide to childhood vaccinations and their importance...",
    author: "Dr. Michael Chen",
    date: "2024-01-25",
    category: "Vaccination",
    likes: 32,
    comments: 8,
  },
];

const Articles = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleLike = (articleId: number) => {
    setArticles(
      articles.map((article) =>
        article.id === articleId
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    );
    toast.success("Article liked!");
  };

  const filteredArticles = articles.filter(
    (article) =>
      (categoryFilter === "all" || article.category === categoryFilter) &&
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Medical Articles</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Write Article
          </Button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Nutrition">Nutrition</SelectItem>
              <SelectItem value="Vaccination">Vaccination</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Health Tips">Health Tips</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.date}
              category={article.category}
              likes={article.likes}
              comments={article.comments}
              onLike={() => handleLike(article.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Articles;