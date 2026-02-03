    jest.mock("../src/data.json", () => [
        {
            "id": 1,
            "name": "ShadowStrike",
            "wins": 15,
            "losses": 5,
            "totalScore": 28500
        },
        {
            "id": 2,
            "name": "NoobMaster",
            "wins": 3,
            "losses": 12,
            "totalScore": 4200
        },
        {
            "id": 3,
            "name": "ProGamer99",
            "wins": 0,
            "losses": 0,
            "totalScore": 0
        },
        {
            "id": 4,
            "name": "Jack",
            "wins": 2,
            "losses": 0,
            "totalScore": 1000
        },
        {
            "id": 5,
            "name": "Tom",
            "wins": 4,
            "losses": 2,
            "totalScore": 5000
        }
    ]);

import { ratingPlayer } from "../src/services/playerService";

describe("App Functions", () => {

    test("Normal case with wins and losses", () => {
        const result = ratingPlayer(2); 
        expect(result).toStrictEqual({"id":2,"name":"NoobMaster","wins":3,"losses":12,"totalScore":4200,"rating":"300.00"});
    });

    test("Edge case: player with 0 games (should return 0)", () => {
        const result = ratingPlayer(3)?.rating; 
        expect(result).toStrictEqual("0.00");
    });

    test("Edge case: player with only wins", () => {       
        const result = ratingPlayer(4);
        expect(result).toStrictEqual({"id":4,"name":"Jack","wins":2,"losses":0,"totalScore":1000,"rating":"600.00"})
    });

    test("Verify rounding to 2 decimal places", () =>{
        const result = ratingPlayer(5)?.rating;
        expect(result).toStrictEqual("900.00");
    });

    test("Finding a player that exists", () => {
        const result = ratingPlayer(1);
        expect (result).toStrictEqual({"id":1,"name":"ShadowStrike","wins":15,"losses":5,"totalScore":28500,"rating":"1500.00"});
    });

    test("Finding a player that exists", () => {
        const result = ratingPlayer(6);
        expect (result).toStrictEqual(undefined);
    });
});
