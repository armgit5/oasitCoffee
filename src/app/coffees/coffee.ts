
export class Coffee {

    constructor(
                public $key: string,
                public url: string,
                public name: string,
                public category: string,
                public type: string,
                public price: number,
                public comment: string
                ) {

    }

    // tslint:disable-next-line:member-ordering
    static fromJsonList(array): Coffee[] {
        return array.map(Coffee.fromJson);
    }

    // tslint:disable-next-line:member-ordering
    static fromJsonListV2(array): Coffee[] {
        // console.log(array);
        return array.map(Coffee.fromJsonV2);
    }

    // tslint:disable-next-line:member-ordering
    static fromJson({$key, url, name, category, type, price, comment}): Coffee {
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

    static fromJsonV2({company, id, imageUrl, name, price}): Coffee {
       return new Coffee(
           id,
           imageUrl,
           name,
           '',
           '',
           price,
           ''
       );
    }




}
