/*----------------------------------------------------------------------*
  * Author       : Henry Li <henry.li03@sap.com>
  *----------------------------------------------------------------------*/

import Animal from "./Animal";
import sounds from "./sounds";

export default class Cat extends Animal
{
    static staticVariable = 123;

    init()
    {
        super.init();
        this.setType("Cat");
    }

    callMe()
    {
        super.callMe();
        const myAlert = (sender, message) => {
            console.log(`${sender}: ${message}`);
        };
        myAlert(this.getNickName(), sounds.cat);
    }

    static createCat(nickName)
    {
        const cat = new example.obj.Cat({
            nickName
        });
        return cat;
    }
}
