// app/users/page.tsx
import AllWisdom from "./components/wisdom/AllWisdom";
import CategoryTree from "./components/CategoryTree";

export default async function UsersPage() {

  return (
    <div>
      <CategoryTree/>		 
      <AllWisdom />
    </div>
  );
}