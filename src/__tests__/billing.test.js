describe('deterministic failure', () => {
  test('billing totals match (always fails)', () => {
    const total = 2 + 2;
    expect(total).toBe(5);
  });

  test('invoice id is defined (always fails)', () => {
    const invoice = {};
    expect(invoice.id).toBeDefined();
  });
});
