/*----------------------------------------------------------------------*
  * Author       : Henry Li <henry.li03@sap.com>
  *----------------------------------------------------------------------*/

import Animal from "./Animal";

export default class Cat extends Animal
{
    init()
    {
        super.init();
        this.setType("Cat");
    }

    callMe()
    {
        super.callMe();
        const myAlert = (sender, message) => {
            alert(`${sender}: ${message}`);
        };
        console.log("cat", "Miao~");
    }

    /*static*/ createCat(nickName)
    {
        const cat = new example.obj.Cat({
            nickName
        });
        return cat;
    }
}
