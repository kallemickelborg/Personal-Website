declare module 'graphql-request' {
  export function gql(source: string): any;

  export class GraphQLClient {
    constructor(url: string, options?: GraphQLClientOptions);
    request<T>(query: string, variables?: any): Promise<T>;
  }

  export interface GraphQLClientOptions {
    headers?: Record<string, string>;
    // Add other options as needed
  }

  // Type definitions for your specific queries
  export interface Post {
    id: string;
    title: string;
    slug: string;
  }

  export interface PostData {
    id: string;
    title: string;
    date: string;
    author: {
      name: string;
    };
    content: {
      html: string;
    };
  }

  export interface BlogProps {
    posts: Post[];
  }

  export interface PostProps {
    post: PostData;
  }

  export interface PostSlugsData {
    posts: Post[];
  }
}