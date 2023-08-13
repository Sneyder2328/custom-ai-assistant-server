import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Conversation from './Conversation.js';

enum MessageAuthor {
  User = 'user',
  Assistant = 'assistant',
  System = 'system'
}

@Table({ tableName: 'message' })
export default class Message extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => Conversation)
  @Column(DataType.STRING)
  conversationId!: string;

  @Column(DataType.ENUM(...Object.values(MessageAuthor)))
  author!: MessageAuthor;

  @Column(DataType.STRING)
  content!: string;

  @BelongsTo(() => Conversation)
  conversation!: Conversation;
}
