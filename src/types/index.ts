export interface Project {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    link: string;
}

export interface Achievement {
    id: number;
    title: string;
    date: string;
    description: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}