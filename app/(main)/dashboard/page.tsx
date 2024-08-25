"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data for prompt recipes
const mockRecipes = [
  {
    id: 1,
    title: "森林吸収量認証",
    descriptions: [
      "算定方法: 森林吸収量(CO2-t)=森林面積×幹の成長量× 拡大係数×容積密度×炭素含有量×(44/12)",
      "計算例: ヒノキ林1ha(25年生)を間伐した場合の森林吸収量=9.6m3×1.56×0.407×0.5×(44/12)=11.17CO2-t",
    ],
    prompt: `こんにちは！森林の二酸化炭素吸収量を計算するお手伝いをさせていただきます。以下の情報を順番に教えてください。\n\n1. 森林の種類（例：ヒノキ、スギ、マツなど）：\n2. 森林の面積（ヘクタール単位）：\n3. 森林の樹齢（年）：\n4. 間伐を行ったかどうか（はい/いいえ）：\n\n上記の情報をいただいたら、以下の計算を行います：\n\n- 幹の成長量（m3/ha）を樹種と樹齢から推定\n- 拡大係数、容積密度、炭素含有量を樹種に応じて設定\n- 森林吸収量(CO2-t) = 森林面積 × 幹の成長量 × 拡大係数 × 容積密度 × 炭素含有量 × (44/12)\n\n計算結果と共に、二酸化炭素吸収量が地球温暖化対策にどのように貢献するかについての簡単な説明も提供いたします。`,
  },
  {
    id: 2,
    title: "ブルーカーボンによるCO2削減",
    descriptions: [
      "海の公園のアマモのCO2吸着量を認証 (12.3t)",
      "八景島シーパラダイスの空調",
      "港湾内のタグボートの燃料をLNG化",
    ],
  },
  {
    id: 3,
    title: "電動キックボードによる試作",
    descriptions: [
      "タクシーから電動キックボードに乗り換えることで月間50tのCO2削減",
      "三井住友銀行とバイウェルによるJクレジットの売買",
    ],
  },
  {
    id: 4,
    title: "エネルギーパーク",
    descriptions: [
      "エコタウンにおけるリサイクル",
      "木質ペレット製造",
      "富山太陽光発電所",
    ],
  },
  {
    id: 5,
    title: "ブルーカーボンファンド",
    descriptions: [
      "ブルーカーボンファンドの設立",
      "ブルーカーボンファンドの運用",
    ],
  },
];

export default function Component() {
  const [recipes, setRecipes] = useState(mockRecipes);
  const router = useRouter();

  const handleNewRecipe = () => {
    // Implement new recipe creation logic here
    console.log("Creating new recipe");
    router.push("/dashboard/new");
  };

  const handleCardClick = (id: number) => {
    // Navigate to the dashboard page for this recipe
    router.push(`/dashboard/${id}`);
  };

  const handleEditRecipe = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent the card click event from firing
    // Navigate to the edit page
    router.push(`/dashboard/${id}/edit`);
  };

  const handleDeleteRecipe = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // Prevent the card click event from firing
    // Implement delete recipe logic here
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">プロンプトレシピ一覧</h1>
        <Button
          onClick={handleNewRecipe}
          className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" /> 新規作成
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(recipe.id)}>
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {recipe.descriptions.map((desc, index) => (
                <p key={index}>・{desc}</p>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end mt-auto">
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={(e) => handleEditRecipe(e, recipe.id)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => handleDeleteRecipe(e, recipe.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
