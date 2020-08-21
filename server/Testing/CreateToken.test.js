const {
  AccessAndRefreshToken,
  RefreshToken,
  AccessToken,
  ChatToken,
} = require("../TokenManagement/CreateToken");

test("Access token should output random long string", async () => {
  let result = await AccessToken(".", ".");
  expect(result).toEqual(expect.stringMatching(/^/));
});

test("Refresh token should output random long string", async () => {
  let result = await RefreshToken(".", ".");
  expect(result).toEqual(expect.stringMatching(/^/));
});

test("Chat token should output random long string", async () => {
  let result = await ChatToken(".", ".");
  expect(result).toEqual(expect.stringMatching(/^/));
});

test("AccessAndRefreshToken should output object", async () => {
  const obj = {
    AccessToken: expect.stringMatching(/^/),
    RefreshToken: expect.stringMatching(/^/),
    ChatToken: expect.stringMatching(/^/),
  };
  let result = await AccessAndRefreshToken(".", ".");
  expect(result).toMatchObject(obj);
});
