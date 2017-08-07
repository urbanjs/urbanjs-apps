import { track as trackSync } from 'urbanjs-tools-core/dist/decorators';

export type Decorator = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;

export type TrackDecorators = {
  track(): Decorator;
};

let trackDecorators: TrackDecorators = {
  track: trackSync
};

export const reinitializeTrackDecorators = (decorators: TrackDecorators) => {
  trackDecorators = decorators;
};

export const track = (): Decorator => {
  if (!trackDecorators.track) {
    throw new Error('@track can only be used if decorators are initialized');
  }

  return trackDecorators.track();
};
