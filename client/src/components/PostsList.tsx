import React from 'react';

interface Post {
  id: number;
  title: string;
  html_content: string;
  users?: {
    first_name: string;
    last_name: string;
  };
}

interface PostsListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostsListProps) {
  return (
    <div className="posts-list">
      {posts.map(post => (
        <article key={post.id} className="post-card">
          <h2>{post.title}</h2>
          {post.users && (
            <p className="author">
              By {post.users.first_name} {post.users.last_name}
            </p>
          )}
          <div dangerouslySetInnerHTML={{ __html: post.html_content }} />
        </article>
      ))}
    </div>
  );
} 