// app/users/page.tsx
import { Aladin } from "next/font/google";
import Categories from "./components/Categories";
import WisdomTableRow from "./components/wisdom/WisdomRow";
import AllWisdom from "./components/wisdom/AllWisdom";

interface User {
  id: number;
  name: string;
  email: string;
}

export default async function UsersPage() {

  return (
    <div>

		  <Categories />
		  <AllWisdom />
    </div>
  );
}