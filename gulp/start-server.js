'use strict';

const gulp = require('gulp');
const debounce = require('lodash.debounce');
const childProcess = require('child_process');

gulp.task('start-server:watch', () => {
  let currentProcess;

  const startServer = () => {
    killServer();

    currentProcess = childProcess.spawn('yarn', ['start-server'], {
      stdio: 'inherit',
      detached: true
    });
  };

  const killServer = () => {
    if (currentProcess) {
      try {
        process.kill(-currentProcess.pid, 'SIGKILL');
      } catch (e) {
        // ignore
      } finally {
        currentProcess = null;
      }
    }
  };

  process.on('exit', killServer);
  process.on('SIGINT', () => {
    killServer();
    process.exit(-1);
  });
  process.on('uncaughtException', () => {
    killServer();
    process.exit(-1);
  });

  startServer();
  gulp.watch(
    [
      'src/**',
      '!src/i18n/**',
      '!src/view/**',
      '!src/state/**',
      '!src/apps/client/**'
    ],
    debounce(startServer, 300)
  );
});
