import { Coffee } from "../../coffees/coffee";

export class Order {

      constructor(
                  public $key,
                  public coffees: Coffee[],
                  public customerName: string,
                  public dateTime: number,
                  public employeeEmail: string,
                  public total: number
                  ) {

      }
}
