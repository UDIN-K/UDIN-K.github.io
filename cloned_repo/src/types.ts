
export enum ProjectCategory {
    AI = 'AI / Machine Learning',
    WEB = 'Web Development',
    DESIGN = 'UI/UX Design',
    GAME = 'Game Development'
}

export interface Project {
    id: string;
    title: string;
    description: string;
    category: ProjectCategory;
    imageUrl: string;
    link?: string;
    techStack: string[];
}

export enum AIMode {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE'
}

export interface AIChatMessage {
    id: string;
    role: 'user' | 'model';
    content: string; // Text content or Image URL
    type: 'text' | 'image';
    timestamp: number;
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    imageUrl: string;
    verifyLink?: string;
    description?: string;
}
