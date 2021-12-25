function add(num1, num2) {
  return num1 + num2;
}

// 测试套件 test suite
describe("kaikeba", () => {
  // 测试用例 test code
  it("测试add函数", () => {
    // 断言 assert
    expect(add(1, 3)).toBe(4);
    expect(add(2, 3)).toBe(5);
    expect(add(1, 2)).toBe(3);
  });
});
