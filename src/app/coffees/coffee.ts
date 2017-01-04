
export class Coffee {
    
    constructor(public id:number, 
                public url:string, 
                public name:string, 
                public category:number,
                public type:string, 
                public price:number
                ) {

    } 

    static fromJson({id, url, name, category, type, price}):Coffee {
       return new Coffee(
           id,
           url,
           name,
           category,
           type,
           price
       );
    }
    
}
