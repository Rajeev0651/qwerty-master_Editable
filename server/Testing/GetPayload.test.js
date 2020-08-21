const { payload } = require("../TokenManagement/GetPayload");

test("Payload should output object", async () => {
  const obj = {
    header: {
      alg: "HS256",
      typ: "JWT",
    },
    payload: {
      exp: 1597762045,
      iat: 1597758445,
      id: "singhrajiv0651@gmail.com",
      name: "RAJEEV",
    },
    signature: "CMt4ZJjWItDUYIkXdKGHv35qUq7iQmHS28Gjadsvv-c",
  };
  let result = await payload(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNpbmdocmFqaXYwNjUxQGdtYWlsLmNvbSIsIm5hbWUiOiJSQUpFRVYiLCJpYXQiOjE1OTc3NTg0NDUsImV4cCI6MTU5Nzc2MjA0NX0.CMt4ZJjWItDUYIkXdKGHv35qUq7iQmHS28Gjadsvv-c"
  );
  expect(result).toMatchObject(obj)
});
