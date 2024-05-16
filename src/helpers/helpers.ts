import { Response } from "express";
import db from "../../config/database.config";

export async function checkDatabaseConnection() {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

export function handleSuccess(res: Response, route: string, response?: any) {
  let debug = { route: route, status: 'ok' };

  switch (true) {
    // case (Array.isArray(response)):
    //   return res.status(200).json({ data: response, debug })
    default:
      return res.status(200).json({ _data: response, debug })
  }

}

export function handleErrors(res: Response, status: number, route: string, msg: string) {
  let debug = { route: route, status: status };
  switch (status) {
    case 400:
      return res.status(status).json({ error: 'Bad Request', msg: msg, debug })
    case 401:
      return res.status(status).json({ error: 'Unauthorized', msg: msg, debug })
    case 403:
      return res.status(status).json({ error: 'Forbidden', msg: msg, debug })
    case 404:
      return res.status(status).json({ error: 'Not Found', msg: msg, debug })
    case 405:
      return res.status(status).json({ error: 'Method Not Allowed', msg: msg, debug })
    case 408:
      return res.status(status).json({ error: 'Request Timeout', msg: msg, debug })
    case 409:
      return res.status(status).json({ error: 'Already Exists', msg: msg, debug })
    default:
      return res.status(500).json({ error: 'Something went wrong', msg: msg, debug })
  }
}