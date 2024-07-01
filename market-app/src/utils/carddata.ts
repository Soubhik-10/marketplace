// src/types.ts
export interface CardData {
  title: string
  logo: any
  text: string
}
import shop from "./shop.svg"
import buy from "./buy.svg"
import sell from "./sell.svg"
import register from "./register.svg"
import account from "./account.svg"
import order from "./order.svg"
export interface CardDataList {
  cards: CardData[]
}

// src/utils/carddata.ts

const carddata: CardDataList = {
  cards: [
    {
      title: "Shop",
      logo: shop,
      text: "Browse and purchase a wide variety of products.",
    },
    {
      title: "Sell",
      logo: sell,
      text: "Sell your products and reach a global audience.",
    },
    {
      title: "Register",
      logo: register,
      text: "Register your wallet to start using BlockMarket.",
    },
    {
      title: "Orders",
      logo: order,
      text: "Manage your orders easily.",
    },
    {
      title: "Accounts",
      logo: account,
      text: "View and manage your account details.",
    },
  ],
}

export default carddata
