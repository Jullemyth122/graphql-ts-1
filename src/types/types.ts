export interface Account {
  id: string;
  username: string;
  email: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export interface Comments {
  comments: Comment[];
}
