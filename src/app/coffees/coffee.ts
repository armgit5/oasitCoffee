
export class Coffee {
    
    constructor(
                public $key:string,
                public url:string, 
                public name:string, 
                public category:string,
                public type:string, 
                public price:number,
                public comment:string
                ) {

    } 

    static fromJsonList(array): Coffee[] {
        return array.map(Coffee.fromJson);
    }

    static fromJson({$key, url, name, category, type, price, comment}):Coffee {
       return new Coffee(
           $key,
           url,
           name,
           category,
           type,
           price,
           comment
       );
    }
    
}
