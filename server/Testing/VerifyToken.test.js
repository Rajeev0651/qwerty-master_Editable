const {
  AccessAndRefreshToken,
  AccessToken,
  RefreshToken,
} = require("../TokenManagement/VerifyToken");

test("should output true of false", async () => {
  let result = await AccessAndRefreshToken(".", ".");
  expect(result).toBe(false);
});

test("should output object", async () => {
  const obj = { status: "invalid" };
  let result = await AccessToken(".");
  expect(result).toMatchObject(obj);
});

test("should output object", async () => {
  const obj = { status: "ok" };
  let result = await RefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNpbmdocmFqaXYwNjUxQGdtYWlsLmNvbSIsIm5hbWUiOiJSQUpFRVYiLCJpYXQiOjE1OTc3NzUyODYsImV4cCI6MTU5Nzc3ODg4Nn0.LUw41QpwJZvRxmxa0oM9lHxzbTBr99Ny2SFAUQ6GXeI");
  expect(result).toMatchObject(obj);
});
