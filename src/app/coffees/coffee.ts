
export class Coffee {
    
    constructor(
                public $key:string,
                public url:string, 
                public name:string, 
                public category:number,
                public type:string, 
                public price:number
                ) {

    } 

    static fromJsonList(array): Coffee[] {
        return array.map(Coffee.fromJson);
    }

    static fromJson({$key, url, name, category, type, price}):Coffee {
       return new Coffee(
           $key,
           url,
           name,
           category,
           type,
           price
       );
    }
    
}
