import express, { Response, Request, Router } from "express";
import { handleError } from "../utils/handleError";
import { pool } from "../config/database";

export const routerPosts = express.Router();
const table = `posts`;

routerPosts.get("/", async (req: Request, res: Response) => {
  try {
    const connect = await pool.connect();
    const query = `SELECT * FROM ${table}`;
    const { rows } = await connect.query(query);
    connect.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json({ posts: rows });
  } catch (error) {
    handleError(res, 400, error);
  }
});

routerPosts.get("/:id", async (req: Request, res: Response) => {
  try {
    const connect = await pool.connect();
    const query = `SELECT * FROM ${table} WHERE id = $1`;
    const condition = [req.params.id];
    const { rows } = await connect.query(query, condition);
    connect.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json({ post: rows });
  } catch (error) {
    handleError(res, 400, error);
  }
});

routerPosts.post("/", async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const connect = await pool.connect();

    const query = `INSERT INTO ${table} (title, description) VALUES ($1, $2)`;
    const values = [title, description];
    await connect.query(query, values);
    connect.release();

    return res.status(201).json({ message: "Post created" });
  } catch (error) {
    handleError(res, 400, error);
  }
});

routerPosts.patch("/:id", async (req: Request, res: Response) => {
  const { type, newValue } = req.body;
  const id_post = Number(req.params.id);

  if (!type || newValue === undefined) {
    return res.status(400).json({ message: "Type and newValue are required" });
  }

  try {
    const connect = await pool.connect();

    const checkQuery = `SELECT * FROM ${table} WHERE id = $1`;
    const checkResult = await connect.query(checkQuery, [id_post]);

    if (checkResult.rows.length === 0) {
      connect.release();
      return res.status(404).json({ message: "Post not found" });
    }

    const query = `UPDATE ${table} SET ${type} = $1 WHERE id = $2`;
    const values = [newValue, id_post];
    await connect.query(query, values);
    connect.release();

    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    handleError(res, 400, error);
  }
});

routerPosts.delete("/:id", async (req: Request, res: Response) => {
  const id_post = Number(req.params.id);

  try {
    const connect = await pool.connect();

    const checkQuery = `SELECT * FROM ${table} WHERE id = $1`;
    const checkResult = await connect.query(checkQuery, [id_post]);

    if (checkResult.rows.length === 0) {
      connect.release();
      return res.status(404).json({ message: "Post not found" });
    }

    const query = `DELETE FROM ${table} WHERE id = $1`;
    const condition = [id_post];
    const result = await connect.query(query, condition);
    connect.release();

    res.status(200).json({ message: "Post deleted successfully", deletedPost: result.rows[0] });
  } catch (error) {
    handleError(res, 400, error);
  }
});
