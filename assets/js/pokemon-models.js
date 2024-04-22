class Pokemon{
    number;
    name;
    type;
    types = [];
    photo;
}


class PokemonDetail extends Pokemon {
    constructor() {
        super(); // Chama o construtor da classe pai
        this.hp = 0;
        this.statAttack = 0;
        this.statDefense = 0;
        this.statSpeed = 0;
        this.themerColor;
    }
}
