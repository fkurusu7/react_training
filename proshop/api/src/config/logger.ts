import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express-serve-static-core';
import morgan from 'morgan';

// Extend Response interface to include custom __body property
declare module 'express-serve-static-core' {
  interface Response {
    __body?: any;
  }
}

// MORGAN Tokens
morgan.token('body', (req: Request) => {
  const body = req.body;
  // Mask sensitive data
  if (body?.password) body.password = '********';
  if (body?.token) body.token = '***********';
  return JSON.stringify(req.body, null, 2);
});

morgan.token('resBody', (req: Request, res: Response) => {
  try {
    return JSON.stringify(JSON.parse(res.__body), null, 2);
  } catch {
    return res.__body;
  }
});

morgan.token('timestamp', () => new Date().toISOString());

morgan.token('pid', () => {
  return process.pid.toString(); // Convert to string
});

export const logger = {
  success: (msg: string) =>
    console.log(chalk.green('✅'), chalk.bold.cyan(msg)),
  info: (msg: string) => console.info(chalk.blue('💭'), chalk.bold.blue(msg)),
  warn: (msg: string) =>
    console.warn(chalk.yellow('⚠️'), chalk.bold.yellow(msg)),
  error: (msg: string, err?: Error) => {
    console.log(chalk.red('❌'), chalk.bold.red(msg));
    if (err?.stack) {
      console.log(chalk.red(err.stack));
    } else if (err) {
      console.log(chalk.red(err));
    }
  },
  server: (port: number) => {
    const divider = chalk.gray('----------------------------------------');
    console.log('\n' + divider);
    console.log(chalk.bold.yellow('🚀 Server Status:'));
    console.log(chalk.cyan(`   ↪ Port ${chalk.bold.white(port)}`));
    console.log(
      chalk.cyan(
        `   ↪ Environment: ${chalk.bold.white(
          process.env.NODE_ENV || 'development'
        )}`
      )
    );
    console.log(chalk.cyan(` ↪ Process ID: ${chalk.bold.white(process.pid)}`));
    console.log(
      chalk.cyan(` ↪ Time: ${chalk.bold.white(new Date().toLocaleString())}`)
    );
    console.log(divider + '\n');
  },
  // Request/Response logger middleware
  requestLogger: morgan((tokens, req: Request, res: Response) => {
    if (req.originalUrl === '/favicon.ico') {
      return '';
    }

    const status = tokens.status(req, res);
    const statusNum = parseInt(status || '0', 10);

    const statusColor =
      statusNum >= 500
        ? chalk.red
        : statusNum >= 400
        ? chalk.yellow
        : statusNum >= 300
        ? chalk.cyan
        : chalk.green; // success

    const requestId = (req as any).id || '-';
    const responseTime = parseFloat(tokens['response-time'](req, res) || '0');
    const responseTimeColor =
      responseTime > 1000
        ? chalk.red
        : responseTime > 500
        ? chalk.yellow
        : chalk.green;

    return [
      chalk.gray(`[${tokens.timestamp(req, res)}]`),
      chalk.gray(`[${tokens.pid(req, res)}]`),
      chalk.gray(`[${requestId}]`),
      chalk.bold('\n🔸 Request:'),
      chalk.blue.bold(tokens.method(req, res)),
      chalk.blue(tokens.url(req, res)),
      req.body && Object.keys(req.body).length
        ? [chalk.yellow('\nRequest Body:'), tokens.body(req, res)].join(' ')
        : '',
      chalk.bold('\n🔹 Response:'),
      statusColor(`Status: ${tokens.status(req, res)}`),
      res.__body
        ? [chalk.yellow('\n↩️ Response Body:'), tokens.resBody(req, res)].join(
            ' '
          )
        : '',
      chalk.gray('\nMetrics:'),
      responseTimeColor(`${responseTime}ms`),
      '\n',
    ]
      .filter(Boolean)
      .join(' ');
  }),

  // Capture response body middleware
  responseCapture: (req: Request, res: Response, next: NextFunction) => {
    // Store the original res.send method
    const originalSend = res.send;
    // Override res.send with our custom version
    res.send = function (body: any) {
      // Store the response body in a custom property
      res.__body = body;
      // Call the original send method with the same context and body
      return originalSend.call(this, body);
    };
    next();
  },
};

export default logger;

/** responseCapture????
  This is doing something called "method wrapping" or "monkey patching" and here's why it's needed:

  Morgan (and our logger) needs to access the response body to log it
  By default, Express doesn't store the response body where middleware can access it
  This middleware intercepts the res.send method before it happens by:

  Saving the original res.send method
  Creating a new version that stores the body in res.__body
  Still calling the original method so everything works normally



  So when your route does res.send(someData), this middleware ensures that someData is available at res.__body for the logger to access it later.
  It's like having someone write down a copy of a letter before it's sent in the mail - the letter still gets sent, but now we have a record of what was in it.
 */
