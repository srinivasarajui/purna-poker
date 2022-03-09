import { GameCache } from "./game-cache";

let cache:GameCache;
beforeEach(()=>{
  cache = new GameCache();
})
test('cahche is not null', () => {
  expect(cache).not.toBeUndefined();
  expect(cache).not.toBeNull();
});