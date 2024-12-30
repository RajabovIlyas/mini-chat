import { ObjectId } from 'mongodb';

export interface Message {
  _id?: ObjectId;
  message: string;
  sender: string;
}

export interface MessageModel extends Message {
  createdAt: Date;
}

export interface MessageDocument extends MessageModel, Document {}

export type InsertMessage = Omit<Message, 'id'>