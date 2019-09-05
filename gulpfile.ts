import childProcess, { ChildProcess } from 'child_process';
import { task, series, watch } from 'gulp';

const command = 'node';
let resume: ChildProcess | undefined;

const spawn = () =>
  childProcess.spawn(command, ['./node_modules/.bin/resume', 'serve'], {
    shell: true,
    stdio: 'inherit'
  });

task('reload', async () => {
  if (resume) {
    resume.kill();
  }
  resume = spawn();
});
task('watch', () =>
  watch(['./pug/*.pug', './index.js', './resume.json'], task('reload'))
);
task(
  'default',
  series(async () => {
    resume = spawn();
  }, 'watch')
);
