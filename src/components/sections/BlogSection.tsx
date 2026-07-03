"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag, Clock, ArrowRight } from "lucide-react";

const categories = ["All", "Technical", "Tutorial", "Career", "Learning"];

const blogPosts = [
  {
    id: 1,
    title: "Building a 3D Portfolio with Three.js and React",
    excerpt: "A deep dive into creating immersive web experiences using Three.js, React Three Fiber, and Framer Motion for stunning 3D animations.",
    category: "Tutorial",
    date: "Jan 15, 2025",
    readTime: "12 min",
    tags: ["Three.js", "React", "WebGL"],
    color: "#3b82f6",
  },
  {
    id: 2,
    title: "Zero-Trust Security in Modern Web Apps",
    excerpt: "Implementing zero-trust architecture in web applications, from authentication to data encryption. Lessons from building SecureVault.",
    category: "Technical",
    date: "Jan 8, 2025",
    readTime: "10 min",
    tags: ["Security", "Architecture", "Encryption"],
    color: "#ef4444",
  },
  {
    id: 3,
    title: "My Journey into Cybersecurity",
    excerpt: "How a computer engineering student transitioned into cybersecurity. Tips, resources, and lessons learned along the way.",
    category: "Career",
    date: "Dec 28, 2024",
    readTime: "8 min",
    tags: ["Career", "Cybersecurity", "Learning"],
    color: "#10b981",
  },
  {
    id: 4,
    title: "Optimizing React Performance: A Practical Guide",
    excerpt: "Strategies for building performant React applications, including memo, useMemo, useCallback, and code splitting patterns.",
    category: "Technical",
    date: "Dec 15, 2024",
    readTime: "15 min",
    tags: ["React", "Performance", "JavaScript"],
    color: "#8b5cf6",
  },
  {
    id: 5,
    title: "AWS Certification Path for Developers",
    excerpt: "A roadmap for developers preparing for AWS certifications. Study resources, practice tips, and exam strategies.",
    category: "Learning",
    date: "Dec 5, 2024",
    readTime: "7 min",
    tags: ["AWS", "Cloud", "Certification"],
    color: "#f59e0b",
  },
  {
    id: 6,
    title: "The Future of Web Development: AI and Beyond",
    excerpt: "Exploring how AI is reshaping web development workflows, from code assistance to automated testing and deployment.",
    category: "Technical",
    date: "Nov 28, 2024",
    readTime: "9 min",
    tags: ["AI", "Web Dev", "Future"],
    color: "#06b6d4",
  },
];

export function BlogSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  useEffect(() => {
    let results = blogPosts;
    
    if (activeCategory !== "All") {
      results = results.filter((post) => post.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredPosts(results);
  }, [searchQuery, activeCategory]);

  return (
    <section id="blog" className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-950/50" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-mono text-blue-400 mb-4 tracking-widest uppercase">
            08. Blog
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white">
            Thoughts &{" "}
            <span className="text-gradient">Articles</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-xl mx-auto">
            Technical tutorials, career insights, and learning resources I share along the way.
          </p>
        </motion.div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative glass border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ y: -4 }}
              >
                {/* Top accent */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${post.color}, ${post.color}60)` }} />
                
                <div className="p-6">
                  {/* Category & date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ background: `${post.color}15`, color: post.color }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more */}
                  <button className="flex items-center gap-1.5 text-sm font-medium text-blue-500 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 40px ${post.color}10` }}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-zinc-500">No articles found matching your search.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
