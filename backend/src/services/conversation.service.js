import pool from '../config/db.js';
import { generateAnswer } from './ai.service.js';

const format = row => ({
  id: row.id,
  role: row.role,
  content: row.content,
  tokenCount: row.token_count,
  createdAt: row.created_at,
});

export async function getConversations() {
  const [rows] = await pool.query(
    `SELECT id, role, content, token_count, created_at
     FROM conversations ORDER BY id DESC LIMIT 100`,
  );
  return rows.reverse().map(format);
}

async function getById(id) {
  const [rows] = await pool.query(
    `SELECT id, role, content, token_count, created_at
     FROM conversations WHERE id = ?`,
    [id],
  );
  return format(rows[0]);
}

export async function createConversation(question) {
  // 1. previous context (loaded BEFORE inserting the new question)
  const [recent] = await pool.query(
    `SELECT role, content FROM conversations ORDER BY id DESC LIMIT 5`,
  );
  const history = recent.reverse();

  // 2. save user message
  const [userInsert] = await pool.query(
    `INSERT INTO conversations (role, content) VALUES ('user', ?)`,
    [question],
  );

  // 3. ask the AI
  const { answer, tokenCount } = await generateAnswer(history, question);

  // 4. save assistant message
  const [assistantInsert] = await pool.query(
    `INSERT INTO conversations (role, content, token_count) VALUES ('assistant', ?, ?)`,
    [answer, tokenCount],
  );

  // 5. return both saved rows
  const [userConversation, assistantConversation] = await Promise.all([
    getById(userInsert.insertId),
    getById(assistantInsert.insertId),
  ]);
  return { userConversation, assistantConversation };
}
