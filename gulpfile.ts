import childProcess, { ChildProcess } from 'child_process';
import { parallel, task, watch } from 'gulp';

let resume: ChildProcess | undefined;

const spawn = (command: string, options: string[] = []) =>
  childProcess.spawn(`./node_modules/.bin/${command}`, options, {
    shell: true,
    stdio: 'inherit',
  });

task('reload', async () => {
  if (resume) {
    resume.kill();
  }
  resume = spawn('resume', ['serve']);
});
task('watch', () =>
  watch(['./pug/*.pug', './index.js', './resume.json'], task('reload'))
);
task('webpack', () => spawn('webpack', ['--watch']));
task('default', parallel('watch', 'webpack'));
