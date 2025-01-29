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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
import { toast } from "sonner";

const mockArticles = [
  {
    id: 1,
    title: "Essential Nutrients for Growing Children",
    excerpt: "Learn about the key nutrients that your child needs for healthy growth and development. This comprehensive guide covers everything from vitamins to minerals and how to incorporate them into your child's diet.",
    author: "Dr. Sarah Johnson",
    date: "2024-01-28",
    category: "Nutrition",
    likes: 24,
    comments: 5,
    readingTime: "5 min read"
  },
  {
    id: 2,
    title: "Vaccination Schedule: What Parents Need to Know",
    excerpt: "A comprehensive guide to childhood vaccinations and their importance. Understanding when and why each vaccine is necessary for your child's health and development.",
    author: "Dr. Michael Chen",
    date: "2024-01-25",
    category: "Vaccination",
    likes: 32,
    comments: 8,
    readingTime: "7 min read"
  },
  {
    id: 3,
    title: "Sleep Patterns in Toddlers: A Parent's Guide",
    excerpt: "Understanding sleep cycles and establishing healthy sleep routines for toddlers. Tips and strategies for better sleep habits and common sleep problems.",
    author: "Dr. Emily White",
    date: "2024-01-22",
    category: "Development",
    likes: 45,
    comments: 12,
    readingTime: "6 min read"
  },
  {
    id: 4,
    title: "Managing Childhood Allergies",
    excerpt: "Learn about common childhood allergies, their symptoms, and effective management strategies. Includes prevention tips and when to seek medical attention.",
    author: "Dr. David Brown",
    date: "2024-01-20",
    category: "Health Tips",
    likes: 28,
    comments: 6,
    readingTime: "8 min read"
  }
];

const ITEMS_PER_PAGE = 6;

const Articles = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

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
  ).sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
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

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-4">
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
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {paginatedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              author={article.author}
              date={article.date}
              category={article.category}
              likes={article.likes}
              comments={article.comments}
              readingTime={article.readingTime}
              onLike={() => handleLike(article.id)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </motion.div>
  );
};

export default Articles;