import { Command, command } from 'commander';
import { serve } from '@jsnote-sid/local-api';
import path from 'path';
const isProduction = process.env.NODE_ENV === 'production';
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', args: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(args.port), path.basename(filename), dir, !isProduction);
      console.log(`opened ${filename}. Navigate to http://localhost:${args.port} to edit the cells`);
    } catch (e) {
      if (e.code === 'EADDRINUSE') {
        console.error('port is already in use, try using another port');
      } else {
        console.log(e.message);
      }
      process.exit(1);
    }
  });
