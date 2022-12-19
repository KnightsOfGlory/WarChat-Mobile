import {UserFlags} from "./UserFlags"
import {References} from "@knightsofglory/warlibrary/lib/References";

export namespace ProductIcons {

  const chat = require("../../assets/products/chat.png")
  const serv = require("../../assets/products/serv.png")
  const d2dv = require("../../assets/products/d2dv.png")
  const d2xp = require("../../assets/products/d2xp.png")
  const drtl = require("../../assets/products/drtl.png")
  const jstr = require("../../assets/products/jstr.png")
  const sexp = require("../../assets/products/sexp.png")
  const star = require("../../assets/products/star.png")
  const w2bn = require("../../assets/products/w2bn.png")
  const w3xp = require("../../assets/products/w3xp.png")
  const war3 = require("../../assets/products/war3.png")
  const wcht = require("../../assets/products/wcht.png")
  const oper = require("../../assets/products/oper.png")
  const bliz = require("../../assets/products/bliz.png")

  // (blizzard) 1001 USER gh0st 0011 [CHAT]
  // (ops)      1001 USER ~TG|{~xir|4 0012 [CHAT]

  let icons = new Map([
    ["[CHAT]", chat],
    ["[SERV]", serv],
    ["[D2DV]", d2dv],
    ["[D2XP]", d2xp],
    ["[DRTL]", drtl],
    ["[DSHR]", drtl],
    ["[JSTR]", jstr],
    ["[SEXP]", sexp],
    ["[STAR]", star],
    ["[SSHR]", star],
    ["[W2BN]", w2bn],
    ["[W3XP]", w3xp],
    ["[WAR3]", war3],
    ["[WCHT]", wcht],
  ])

  export const getByClient = (client: string, flags: string) => {
    if (flags == "") flags = References.profileManager.getProfile().init6 ? "0" : "0000"

    if (UserFlags.isAdministrator(flags)) return bliz
    if (UserFlags.isOperator(flags)) return oper

    if (References.profileManager.getProfile().init6 && UserFlags.Init6.isAdministrator(flags)) return bliz
    if (References.profileManager.getProfile().init6 && UserFlags.Init6.isOperator(flags)) return oper

    return icons.get(client)
  }
}