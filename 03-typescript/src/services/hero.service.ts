import { Hero, dataHero } from "../data/hero.data";

/**
 * Obtener un heroe a traves a partir de una id
 * @param id Hero['id']
 * @returns Hero | undefined
 */
export const getHeroById  = (id:number) : Hero | undefined => dataHero.find(hr => hr.id === id);