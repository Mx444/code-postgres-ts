import express, { Request, Response } from "express";

export const handleError = (res: Response, statusCode: number, error: any) => {
  console.error(error);
  res.status(statusCode).json({ error: error.message || "Bad Request" });
};
