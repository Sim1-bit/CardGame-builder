class Card{

    color;
    Id;
    Name;
    Description;
    effects;
    Type;
    Grade;

    constructor(Name, Description, Type, Grade, color){
        this.Name = Name;
        this.Description = Description;
        this.effects = [];
        this.Type = Type;
        this.Grade = Grade;
        this.color = new Color(color)
        this.Id = name.toLowerCase().replace(/\s+/g, "_");
    }

    addEffect(effect){
        this.effects.push(effect);
    }
}

window.Card = Card;