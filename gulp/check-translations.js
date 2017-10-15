'use strict';

require('urbanjs-tools').setupInMemoryTranspile();

const gulp = require('gulp');
const gutils = require('gulp-util');
const renderJSONToString = require('prettyjson').render;
const through2 = require('through2');
const existingTranslationsByLocale = require('../src/i18n').translations;

const TASK_NAME = 'check-translations';

function traverse(value, cb) {
  Object.keys(value).forEach((key) => {
    const val = value[key];

    if (value && Object.getPrototypeOf(val) === Object.prototype) {
      traverse(val, cb);
      return;
    }

    cb(val);
  });
}

gulp.task(TASK_NAME, () => {
  const missingTranslationsByLocale = {};
  const unusedTranslationsByLocale = Object.keys(existingTranslationsByLocale).reduce(
    (acc, locale) => ({ ...acc, [locale]: { ...existingTranslationsByLocale[locale] } }),
    {}
  );

  return gulp.src('src/view/**/i18n.ts', { read: false })
    .pipe(through2.obj((file, enc, cb) => {
      traverse(require(file.path).default, key => {
        Object.keys(existingTranslationsByLocale).forEach((locale) => {
          if (!existingTranslationsByLocale[locale].hasOwnProperty(key)) {
            missingTranslationsByLocale[locale] = missingTranslationsByLocale[locale] || {};
            missingTranslationsByLocale[locale][key] = true;
          }

          delete unusedTranslationsByLocale[locale][key];
          if (!Object.keys(unusedTranslationsByLocale[locale]).length) {
            delete unusedTranslationsByLocale[locale];
          }
        });
      });

      cb(null, file);
    }))
    .on('end', function () {
      if (Object.keys(missingTranslationsByLocale).length) {
        this.emit('error', new gutils.PluginError({
          plugin: TASK_NAME,
          message: 'Missing translations'
        }));

        Object.keys(missingTranslationsByLocale).map(locale => {
          missingTranslationsByLocale[locale] = Object.keys(missingTranslationsByLocale[locale]);
        });

        gutils.log(`\n${renderJSONToString(missingTranslationsByLocale)}`);
      }

      if (Object.keys(unusedTranslationsByLocale).length) {
        gutils.log(`Unused translations\n${renderJSONToString(unusedTranslationsByLocale)}`);
      }
    });
});
