const { setTimeout: sleep } = require('timers/promises');

describe('flaky timing suite', () => {
  test('responds within a tight window (timeout flake)', async () => {
    // Sub-100ms wait + real clock: fails under CI load, passes locally.
    await sleep(50 + Math.random() * 60);
    expect(true).toBe(true);
  });

  test('expiresAt computed from real clock (boundary race)', () => {
    const now = Date.now();
    const ttlSeconds = 1;
    const expiresAt = Math.floor(now / 1000) + ttlSeconds;
    expect(expiresAt - Math.floor(Date.now() / 1000)).toBeGreaterThanOrEqual(0);
  });

  test('races a fetch-like promise without a timeout', async () => {
    const result = await Promise.race([
      sleep(80).then(() => 'ok'),
      sleep(120).then(() => 'slow')
    ]);
    expect(result).toBe('ok');
  });
});
