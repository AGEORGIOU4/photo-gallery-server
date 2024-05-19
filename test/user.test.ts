import request from "supertest";
import app from "../app";
import User from "../src/_User/model/user";

describe("Test create route", () => {
	const user = {
		first_name: "Create user",
	};

	test("Should have key record and msg when created", async () => {
		const mockCreateUser = jest.fn((): any => user);
		jest
			.spyOn(User, "create")
			.mockImplementation(() => mockCreateUser());

		const res = await request(app).post("/api/v1/create").send(user);

		expect(mockCreateUser).toHaveBeenCalledTimes(1);
		expect(res.body).toHaveProperty("msg");
		expect(res.body).toHaveProperty("record");
	});

	test("Should handle exception", async () => {
		const mockCreateUser = jest.fn((): any => {
			throw "error";
		});
		jest
			.spyOn(User, "create")
			.mockImplementation(() => mockCreateUser());

		const res = await request(app).post("/api/v1/create").send(user);

		expect(mockCreateUser).toHaveBeenCalledTimes(1);
		expect(res.body).toEqual({
			msg: "fail to create",
			status: 500,
			route: "/create",
		});
	});

	test("Should handle request param", async () => {
		const res = await request(app).post("/api/v1/create").send({});

		expect(res.body).toEqual({
			msg: "The title value should not be empty",
			param: "title",
			location: "body",
		});
	});
});

describe("test read pagination  route", () => {
	const user = {
		title: "Create user",
	};

	test("Should return array of user", async () => {
		const mockReadAllUser = jest.fn((): any => [user]);
		jest
			.spyOn(User, "findAll")
			.mockImplementation(() => mockReadAllUser());

		const res = await request(app).get("/api/v1/read?limit=5");

		expect(mockReadAllUser).toHaveBeenCalledTimes(1);
		expect(res.body).toEqual([user]);
	});

	test("Should handle exception", async () => {
		const mockCreateUser = jest.fn((): any => {
			throw "error";
		});
		jest
			.spyOn(User, "findAll")
			.mockImplementation(() => mockCreateUser());

		const res = await request(app).get("/api/v1/read?limit=5");
		expect(mockCreateUser).toHaveBeenCalledTimes(1);
		expect(res.body).toEqual({
			msg: "fail to read",
			status: 500,
			route: "/read",
		});
	});

	test("Should handle request query", async () => {
		const res = await request(app).get("/api/v1/read?limit=0");
		expect(res.body).toEqual({
			value: "0",
			msg: "The limit value should be number and between 1-10",
			param: "limit",
			location: "query",
		});
	});
});
