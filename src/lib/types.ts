export interface Location {
    postalCode: string,
    city: string,
    adress: string,
}

export interface Post {
    owner: string;
    title: string;
    description: string;
    price: number;
    startLocation: Location;
    endLocation: Location;
    post_id: number;
    interestedUsers: null | Array<string>;
    state: string;
}

export interface Conversation {
    conversation_id: number;
    user_a: string;
    user_b: string;
    messages: Array<Message> | null;
    post_id: number;
}

export interface Message {
    text: string,
    sender: string,
    read: boolean,
}

export type Session = {
    userId: string,
    session_token: string,
}

export interface User {
    id: string;
    name: string;
    email: string;
    //emailVerified: boolean | null,
    image: string | null;
    location: Location | null;
}
