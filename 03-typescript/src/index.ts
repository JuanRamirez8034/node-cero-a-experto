import { getHeroById } from "./services/hero.service";


const myhero = getHeroById(2);

console.log(myhero?.name);