/*----------------------------------------------------------------------*
  * Author       : Henry Li <henry.li03@sap.com>
  *----------------------------------------------------------------------*/

import ManagedObject from "sap/ui/base/ManagedObject";

export default class Animal extends ManagedObject
{
    metadata = {
        properties: {
            type: { type: "string" },
            nickName: { type: "string" }
        }
    };

    constructor(...args)
    {
        super(...args);
        // TODO: Add your own construction code here.
    }

    init()
    {
        // TODO: Add your own initialization code here.
    }

    callMe()
    {
        console.log(`I'm a ${this.getType()}.
        Call me ${this.getNickName()}.`);
    }
}
