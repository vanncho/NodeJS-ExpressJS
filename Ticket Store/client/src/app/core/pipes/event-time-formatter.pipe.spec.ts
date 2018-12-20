import { EventTimeFormatterPipe } from './event-time-formatter.pipe';

describe('EventTimeFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new EventTimeFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
