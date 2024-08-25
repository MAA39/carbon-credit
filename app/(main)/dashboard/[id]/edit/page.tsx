import { EditRecipeForm } from "@/components/recipe-form";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const initialData = {}; // ここでデータを取得する

  return <EditRecipeForm initialData={initialData} recipeId={parseInt(id)} />;
}
